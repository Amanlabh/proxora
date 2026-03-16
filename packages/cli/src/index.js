#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import { createClient } from "@supabase/supabase-js";
import Conf from "conf";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: ['.env.local', '.env', 'apps/web/.env.local', '../../.env.local'] });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zroykkzdvykhxlspieae.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "sb_publishable_qh3Elu-kowrO01RSkSMYHg_RjpT5nRh";

const config = new Conf({ projectName: "proxora-cli" });
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const program = new Command();

program
  .name("proxora")
  .description("Proxora AI CLI - Terminal-based AI interactions connecting to multiple providers seamlessly")
  .version("0.1.0");

function requireAuth() {
  const token = config.get("supabaseToken");
  if (!token) {
    console.log(chalk.red("❌ You are not logged in. Run 'proxora login' first."));
    process.exit(1);
  }
  return token;
}

program
  .command("login")
  .description("Authenticate with your Proxora account")
  .action(async () => {
    console.log(chalk.cyan("\n🔐 Proxora Login\n"));

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "Email:",
        validate: (input) => input.includes("@") || "Please enter a valid email",
      },
      {
        type: "password",
        name: "password",
        message: "Password:",
        mask: "*",
        validate: (input) => input.length >= 8 || "Password must be at least 8 characters",
      },
    ]);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: answers.email,
      password: answers.password,
    });

    if (error) {
      console.log(chalk.red(`\n❌ Failed to authenticate: ${error.message}`));
      process.exit(1);
    }

    config.set("supabaseToken", data.session.access_token);
    config.set("userEmail", data.user.email);

    console.log(chalk.green("\n✓ Successfully authenticated!"));
    console.log(chalk.gray(`  Logged in as ${data.user.email}\n`));
  });

function getClientForModel(model) {
  let apiKey = process.env.OPENAI_API_KEY;
  let baseURL = process.env.OPENAI_BASE_URL;

  // Determine Provider Dynamically (OpenAI, Ollama, Perplexity)
  if (model.includes("llama") || model.includes("mistral") || model.includes("gemma")) {
    baseURL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434/v1";
    apiKey = "ollama";
  } else if (model.includes("sonar") || model.includes("perplexity") || model.includes("pplx")) {
    baseURL = "https://api.perplexity.ai";
    apiKey = process.env.PERPLEXITY_API_KEY;
  } else {
    baseURL = baseURL || "https://api.openai.com/v1";
    apiKey = apiKey || "sk-dummy";
  }
  
  return new OpenAI({
    apiKey,
    baseURL,
  });
}

program
  .command("chat")
  .description("Start an interactive chat session with any supported model")
  .option("-m, --model <model>", "AI model to use (e.g. gpt-4o, llama3, sonar-small-online)", "gpt-4o")
  .action(async (options) => {
    requireAuth();
    console.log(chalk.cyan("\n🤖 Proxora Chat"));
    console.log(chalk.gray(`  Model: ${options.model}`));
    console.log(chalk.gray("  Type 'exit' to quit\n"));

    const messages = [];
    const client = getClientForModel(options.model);

    while (true) {
      const { message } = await inquirer.prompt([
        {
          type: "input",
          name: "message",
          message: chalk.green("You:"),
        },
      ]);

      if (message.toLowerCase() === "exit") {
        console.log(chalk.yellow("\n👋 Chat session ended.\n"));
        break;
      }

      if (message.trim()) {
        messages.push({ role: "user", content: message });
        process.stdout.write(chalk.blue("AI: "));

        try {
          const stream = await client.chat.completions.create({
            model: options.model,
            messages,
            stream: true,
          });

          let fullContent = "";
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            fullContent += content;
            process.stdout.write(chalk.white(content));
          }
          console.log("\n");
          messages.push({ role: "assistant", content: fullContent });
        } catch (error) {
          console.log(chalk.red(`\n❌ Error communicating with LLM Provider: ${error.message}\n`));
          messages.pop(); // Remove the user message
        }
      }
    }
  });

program
  .command("run")
  .description("Run a single prompt and exit (Supports OpenAI, Perplexity, Ollama)")
  .argument("<prompt>", "The prompt to send")
  .option("-m, --model <model>", "AI model to use", "gpt-4o")
  .action(async (prompt, options) => {
    requireAuth();
    console.log(chalk.cyan("\n🤖 Proxora Run\n"));
    console.log(chalk.gray(`Model: ${options.model}`));
    console.log(chalk.gray(`Prompt: ${prompt}\n`));

    process.stdout.write(chalk.blue("AI: "));
    const client = getClientForModel(options.model);

    try {
      const completion = await client.chat.completions.create({
        model: options.model,
        messages: [{ role: "user", content: prompt }],
      });
      console.log(chalk.white(completion.choices[0].message.content) + "\n");
    } catch (error) {
      console.log(chalk.red(`\n❌ Error communicating with LLM Provider: ${error.message}\n`));
    }
  });

const walletCommand = program
  .command("wallet")
  .description("Check your wallet");

walletCommand
  .command("balance")
  .description("Check wallet balance via Proxora APIs")
  .action(async () => {
    const token = requireAuth();
    console.log(chalk.cyan("\n⏳ Fetching Wallet Balance...\n"));

    try {
      const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const res = await fetch(`${API_URL}/api/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const payload = await res.json();
      
      if (!res.ok) {
        throw new Error(payload.error || "Failed to fetch wallet");
      }

      const availableBalance = payload.data?.availableBalance ?? "0.00";
      const currencyCode = payload.data?.currencyCode ?? "USD";

      console.log(chalk.green(`💰 Wallet Balance`));
      console.log(chalk.white(`  Balance: ${availableBalance} ${currencyCode}`));
      console.log(chalk.gray(`  Add funds at ${API_URL}/wallet\n`));
    } catch (error) {
      console.log(chalk.red(`❌ Failed to retrieve balance: ${error.message}\n`));
    }
  });

const sessionsCommand = program
  .command("sessions")
  .description("Manage active rental sessions");

sessionsCommand
  .command("list")
  .description("List all sessions")
  .action(() => {
    console.log(chalk.cyan("\n📋 Active Sessions\n"));
    console.log(chalk.gray("  No active sessions"));
    console.log(chalk.gray("  Run 'proxora chat' to start a session\n"));
  });

sessionsCommand
  .command("active")
  .description("Show current active session")
  .action(() => {
    console.log(chalk.cyan("\n🔗 Current Session\n"));
    console.log(chalk.gray("  No active session"));
    console.log(chalk.gray("  Run 'proxora chat' to start a session\n"));
  });

sessionsCommand
  .command("end")
  .description("End the current session")
  .action(() => {
    console.log(chalk.yellow("\n⚠️  No active session to end\n"));
  });

program
  .command("models")
  .description("List randomly suggested models for your environment")
  .argument("[action]", "Action to perform", "list")
  .action((action) => {
    if (action === "list") {
      console.log(chalk.cyan("\n📦 Suggested Models\n"));
      console.log(chalk.white("  gpt-4o          (OpenAI)"));
      console.log(chalk.white("  llama3          (Ollama Local)"));
      console.log(chalk.white("  sonar-pro       (Perplexity)"));
      console.log(chalk.gray("\n  Use --model flag to use them!\n"));
    }
  });

program.parse();
