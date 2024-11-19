import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: Request) {
  const { userId, postId, voteType } = await req.json();

  try {
    const vote = await prisma.vote.create({
      data: {
        userId,
        postId,
        voteType,
      },
    });

    return NextResponse.json(vote);
  } catch (error) {
    return NextResponse.json({ error: "Error casting vote" }, { status: 500 });
  }
}
