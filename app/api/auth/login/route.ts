import { NextRequest, NextResponse } from "next/server";
import users from "@/lib/mock-data/users.json";

export async function POST(req: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return NextResponse.json(
      { error: "No account found with that email address." },
      { status: 401 }
    );
  }

  if (user.password !== password) {
    return NextResponse.json(
      { error: "Incorrect password. Please try again." },
      { status: 401 }
    );
  }

  const { password: _, ...safeUser } = user;

  return NextResponse.json({ user: safeUser });
}
