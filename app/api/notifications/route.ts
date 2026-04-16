import { NextRequest, NextResponse } from "next/server";
import notifications from "@/lib/mock-data/notifications.json";

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const unreadOnly = searchParams.get("unread") === "true";

  let result = userId
    ? notifications.filter((n) => n.userId === userId)
    : notifications;

  if (unreadOnly) {
    result = result.filter((n) => !n.read);
  }

  return NextResponse.json(result);
}
