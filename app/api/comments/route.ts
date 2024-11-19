import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: Request) {
  const { userId, postId, content } = await req.json();

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding comment" },
      { status: 500 }
    );
  }
}
