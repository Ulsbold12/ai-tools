import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Message } from "@xenova/transformers";

interface message {
  role: "user" | "assistnt";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey)
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );

    const ai = new GoogleGenAI({ apiKey });

    const history = message.slice(0, -1).map((msg: Message) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = message[message.length - 1];

    const chat = ai.chats.create({
      model: "Gemini 3 Flash",
      history,
      config: { systemInstruction: "You are a helful AI assistent" },
    });

    const response = await chat.sendMessage({
      message: lastMessage.content,
    });

    const assistantMessage =
      response.text || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
