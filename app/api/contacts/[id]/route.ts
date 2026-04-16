import { NextRequest, NextResponse } from "next/server";
import contacts from "@/lib/mock-data/contacts.json";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json(contact);
}
