import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { messages?: ChatMsg[] };

    const messages = body.messages ?? [];
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const last = messages[messages.length - 1];

    const chat = ai.chats.create({
      model: "gemini-2.0-flash", // эсвэл SDK дээр зөв model name-ээ тавь
      history,
      config: {
        systemInstruction: "You are a helpful AI assistant.",
      },
    });

    const res = await chat.sendMessage({ message: last.content });

    return NextResponse.json({
      message: res.text ?? "Sorry, I couldn't generate a response.",
    });
  } catch (err) {
    console.error("Error in chat API:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
