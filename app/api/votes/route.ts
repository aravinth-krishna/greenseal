import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { postId, voteType } = await req.json();

  // Check if the user is logged in
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { error: "Access denied, no token provided" },
      { status: 403 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
    };
    const userId = decoded.id;

    // Check if the user has already voted on this post
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // If the vote type is the same, remove the vote
        await prisma.vote.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        });
      } else {
        // If the vote type is different, update the vote
        await prisma.vote.update({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
          data: {
            voteType,
          },
        });
      }
    } else {
      // If no existing vote, create a new vote
      await prisma.vote.create({
        data: {
          userId,
          postId,
          voteType,
        },
      });
    }

    // Return the updated post with votes
    const updatedPost = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: { select: { username: true } },
        company: { select: { name: true } },
        votes: true,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
