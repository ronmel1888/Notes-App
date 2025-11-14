import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import OpenAI from "openai";
import { GPTAction } from "@/types";

if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY missing");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = (await req.json()) as { noteId?: string; action?: GPTAction };

    if (!body.noteId || !body.action) {
      return NextResponse.json(
        { error: "Missing noteId or action" },
        { status: 400 }
      );
    }

    const { noteId, action } = body;

    const note = await Note.findById(noteId);
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Check cache
    if (note.analysis?.[action]) {
      return NextResponse.json({ cached: true, result: note.analysis[action] });
    }

    // Prepare prompt
    const prompts: Record<GPTAction, string> = {
      improve: `Improve this text:\n${note.text}`,
      summarize: `Summarize this text:\n${note.text}`,
      translate: `Translate this text to English:\n${note.text}`,
    };

    let result = "";
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompts[action] },
        ],
      });

      result = completion.choices[0].message?.content ?? "";
    } catch (openAIError: any) {
      // Handle OpenAI-specific errors (quota, network, etc.)
      if (openAIError.status === 429) {
        return NextResponse.json(
          { error: "OpenAI quota exceeded" },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: openAIError.message || "OpenAI request failed" },
        { status: 500 }
      );
    }

    // Save result to DB
    note.analysis = note.analysis || {};
    note.analysis[action] = result;
    await note.save();

    return NextResponse.json({ cached: false, result });
  } catch (err: any) {
    console.error("Analyze API error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
