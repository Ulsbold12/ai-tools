import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `List all the ingredients needed to make "${description}". Format as a simple bullet list with amounts where relevant. Be concise.`,
    });

    return NextResponse.json({
      ingredients: res.text ?? "Could not detect ingredients.",
    });
  } catch (err) {
    console.error("Error in ingredients API:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
