import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "Access denied, no token provided" },
      { status: 403 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ message: "Access granted", user: decoded });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
