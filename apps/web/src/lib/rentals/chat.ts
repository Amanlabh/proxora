import { Prisma, ChatMessageRole } from "@/generated/prisma";
import { db } from "@/lib/server/db";
import { issueRentalSessionToken } from "@/lib/payments/service";
import { proxyChatCompletion } from "@/lib/proxy/service";

type PersistedChatMessage = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  model: string | null;
  createdAt: string;
};

function normalizeRole(role: ChatMessageRole): PersistedChatMessage["role"] {
  if (role === ChatMessageRole.USER) {
    return "user";
  }

  if (role === ChatMessageRole.ASSISTANT) {
    return "assistant";
  }

  return "system";
}

function extractAssistantText(payload: Record<string, unknown>) {
  const choices = Array.isArray(payload.choices) ? payload.choices : [];
  const firstChoice =
    choices.length > 0 &&
    choices[0] &&
    typeof choices[0] === "object" &&
    !Array.isArray(choices[0])
      ? (choices[0] as Record<string, unknown>)
      : null;
  const message =
    firstChoice &&
    firstChoice.message &&
    typeof firstChoice.message === "object" &&
    !Array.isArray(firstChoice.message)
      ? (firstChoice.message as Record<string, unknown>)
      : null;

  return typeof message?.content === "string"
    ? message.content
    : "The provider responded, but the output could not be rendered as plain text.";
}

export async function sendRentalChatMessage(input: {
  renterUserId: string;
  rentalId: string;
  model: string;
  prompt: string;
  requesterIp: string | null;
  userAgent: string | null;
}) {
  const rental = await db.rental.findFirst({
    where: {
      id: input.rentalId,
      renterUserId: input.renterUserId,
      status: "ACTIVE",
    },
    include: {
      chatMessages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!rental) {
    throw new Error("Active rental not found.");
  }

  const session = await issueRentalSessionToken(
    input.renterUserId,
    input.rentalId,
  );
  const history = rental.chatMessages.map((message) => ({
    role: normalizeRole(message.role),
    content: message.content,
  }));
  const result = await proxyChatCompletion(
    session.sessionToken,
    {
      model: input.model,
      messages: [
        ...history,
        {
          role: "user",
          content: input.prompt,
        },
      ],
    },
    {
      requesterIp: input.requesterIp,
      userAgent: input.userAgent,
    },
  );
  const assistantContent = extractAssistantText(
    result.body as Record<string, unknown>,
  );
  const requestId =
    typeof (result.body as Record<string, unknown>).id === "string"
      ? ((result.body as Record<string, unknown>).id as string)
      : null;

  const [userMessage, assistantMessage] = await db.$transaction([
    db.rentalChatMessage.create({
      data: {
        rentalId: input.rentalId,
        rentalSessionId: session.rentalSessionId,
        role: ChatMessageRole.USER,
        model: input.model,
        content: input.prompt,
        requestId: requestId ?? undefined,
      },
    }),
    db.rentalChatMessage.create({
      data: {
        rentalId: input.rentalId,
        rentalSessionId: session.rentalSessionId,
        role: ChatMessageRole.ASSISTANT,
        model: input.model,
        content: assistantContent,
        requestId: requestId ?? undefined,
        metadata: result.body as Prisma.InputJsonValue,
      },
    }),
  ]);

  return {
    userMessage: {
      id: userMessage.id,
      role: "user" as const,
      content: userMessage.content,
      model: userMessage.model,
      createdAt: userMessage.createdAt.toISOString(),
    },
    assistantMessage: {
      id: assistantMessage.id,
      role: "assistant" as const,
      content: assistantMessage.content,
      model: assistantMessage.model,
      createdAt: assistantMessage.createdAt.toISOString(),
    },
  };
}
