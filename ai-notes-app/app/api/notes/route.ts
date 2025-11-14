import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";

export async function GET() {
  await connectDB();
  const notes = await Note.find().lean();
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { text } = await req.json();
  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Invalid text" }, { status: 400 });
  }
  const note = await Note.create({ text });
  return NextResponse.json(note);
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const noteId = searchParams.get("id");

  if (!noteId) return NextResponse.json({ error: "Missing noteId" }, { status: 400 });

  const deleted = await Note.findByIdAndDelete(noteId);

  if (!deleted) return NextResponse.json({ error: "Note not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
