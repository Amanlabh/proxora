import Link from "next/link";

export default function DeveloperPage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Developer</p>
        <h1>Build with Proxora AI</h1>
        <p className="lead">
          Integrate AI rental sessions into your applications. Use our CLI for
          terminal-based AI interactions, or integrate via REST API into your
          own projects.
        </p>
      </section>

      <section className="docs-section">
        <h2>## Proxora CLI</h2>
        <p className="docs-lead">
          Terminal-based AI interactions just like ollama or opencode. Install
          the CLI and start chatting with AI models directly from your terminal.
        </p>

        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">Terminal</span>
          </div>
          <pre>{`# Install CLI globally
$ npm install -g proxora

# Verify installation
$ proxora --version
0.1.0`}</pre>
        </div>

        <h3>### Authentication</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">Terminal</span>
          </div>
          <pre>{`# Login to your Proxora account
$ proxora login
🔐 Proxora Login

Email: you@example.com
Password: ********
✓ Successfully authenticated!`}</pre>
        </div>

        <h3>### Interactive Chat</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">Terminal</span>
          </div>
          <pre>{`# Start interactive chat session
$ proxora chat
🤖 Proxora Chat
  Model: gpt-4o
  Type 'exit' to quit

You: Hello, how can you help me today?
AI: I'm here to help you with any tasks you need...

You: exit
👋 Chat session ended.`}</pre>
        </div>

        <h3>### Quick Prompt</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">Terminal</span>
          </div>
          <pre>{`# Run a single prompt and exit
$ proxora run "What is the capital of France?"

# With specific model
$ proxora run -m gpt-4.1 "Explain quantum computing"`}</pre>
        </div>

        <h3>Session Management</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">Terminal</span>
          </div>
          <pre>{`# List all sessions
$ proxora sessions list

# Show current active session
$ proxora sessions active

# End current session
$ proxora sessions end`}</pre>
        </div>

        <h3>Available Models</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">Terminal</span>
          </div>
          <pre>{`# List available AI models
$ proxora models

📦 Available Models

  gpt-4o          GPT-4 Optimized
  gpt-4.1         GPT-4.1
  claude-3.5      Claude 3.5 Sonnet
  gemini-2.0      Gemini 2.0 Flash`}</pre>
        </div>

        <h3>Wallet</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">Terminal</span>
          </div>
          <pre>{`# Check wallet balance
$ proxora wallet balance

💰 Wallet Balance

  Balance: $0.00 USD
  Add funds at https://proxora.ai/wallet`}</pre>
        </div>
      </section>

      <section className="docs-section">
        <h2>## REST API</h2>
        <p className="docs-lead">
          Integrate Proxora AI into your applications using our REST API. All
          endpoints require authentication via session tokens.
        </p>

        <h3>Authentication</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">bash</span>
          </div>
          <pre>{`# Get session token
curl -X POST https://api.proxora.ai/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "your-password"}'

# Response
{"token": "pxy_xxx...", "expiresAt": "2026-03-15T12:00:00Z"}`}</pre>
        </div>

        <h3>Sessions</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">bash</span>
          </div>
          <pre>{`# Create a new session
curl -X POST https://api.proxora.ai/v1/sessions \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "gpt-4o"}'

# Response
{
  "sessionId": "pxy_session_xxx",
  "model": "gpt-4o",
  "status": "active",
  "expiresAt": "2026-03-15T13:00:00Z"
}`}</pre>
        </div>

        <h3>Chat</h3>
        <div className="bash-block">
          <div className="bash-header">
            <span className="bash-dot red" />
            <span className="bash-dot yellow" />
            <span className="bash-dot green" />
            <span className="bash-title">bash</span>
          </div>
          <pre>{`# Send a chat message
curl -X POST https://api.proxora.ai/v1/chat \\
  -H "Authorization: Bearer SESSION_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello!",
    "systemPrompt": "You are a helpful assistant."
  }'

# Response
{
  "reply": "Hello! How can I help you today?",
  "usage": {
    "inputTokens": 10,
    "outputTokens": 20
  }
}`}</pre>
        </div>

        <h3>Endpoints Reference</h3>
        <div className="endpoints-table">
          <div className="endpoint-row">
            <code className="method get">GET</code>
            <code>/v1/models</code>
            <span>List available AI models</span>
          </div>
          <div className="endpoint-row">
            <code className="method post">POST</code>
            <code>/v1/sessions</code>
            <span>Create a new session</span>
          </div>
          <div className="endpoint-row">
            <code className="method get">GET</code>
            <code>/v1/sessions/:id</code>
            <span>Get session details</span>
          </div>
          <div className="endpoint-row">
            <code className="method post">POST</code>
            <code>/v1/chat</code>
            <span>Send chat message</span>
          </div>
          <div className="endpoint-row">
            <code className="method delete">DEL</code>
            <code>/v1/sessions/:id</code>
            <span>End a session</span>
          </div>
          <div className="endpoint-row">
            <code className="method get">GET</code>
            <code>/v1/wallet</code>
            <span>Get wallet balance</span>
          </div>
        </div>
      </section>

      <section className="docs-section">
        <h2>## SDKs & Tools</h2>

        <div className="sdks-grid">
          <div className="sdk-card">
            <h3>JavaScript / TypeScript</h3>
            <div className="bash-block small">
              <pre>npm install @proxora/sdk</pre>
            </div>
          </div>
          <div className="sdk-card">
            <h3>Python</h3>
            <div className="bash-block small">
              <pre>pip install proxora-sdk</pre>
            </div>
          </div>
          <div className="sdk-card">
            <h3>Go</h3>
            <div className="bash-block small">
              <pre>go get github.com/proxora/sdk-go</pre>
            </div>
          </div>
          <div className="sdk-card">
            <h3>VS Code Extension</h3>
            <p>Install from VS Code Marketplace</p>
          </div>
        </div>
      </section>
    </main>
  );
}
