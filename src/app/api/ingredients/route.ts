import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { description?: string };
    const description = body.description?.trim();

    if (!description) {
      return NextResponse.json(
        { error: "description is required" },
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
        {
          role: "user",
          content: `List all the ingredients needed to make "${description}". Format as a simple bullet list with amounts where relevant. Be concise.`,
        },
      ],
    });

    return NextResponse.json({
      ingredients: res.choices[0]?.message?.content ?? "Could not detect ingredients.",
    });
  } catch (err) {
    console.error("Error in ingredients API:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
