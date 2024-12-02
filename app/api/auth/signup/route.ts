import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  if (!email || !username || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash: hashedPassword,
    },
  });

  return NextResponse.json(
    { message: "User created successfully", user: newUser },
    { status: 201 }
  );
}
