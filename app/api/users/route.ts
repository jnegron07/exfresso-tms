import { NextResponse } from "next/server";
import users from "@/lib/mock-data/users.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json(users);
}
