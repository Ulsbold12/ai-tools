import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

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

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const openai = new OpenAI({ apiKey });

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        ...messages,
      ],
    });

    return NextResponse.json({
      message: res.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.",
    });
  } catch (err) {
    console.error("Error in chat API:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
