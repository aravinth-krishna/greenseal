import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { postId, content, parentId } = await req.json();
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
    };
    const userId = decoded.id;

    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId,
        parentId,
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

export async function DELETE(req: Request) {
  const { commentId } = await req.json();
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
    };
    const userId = decoded.id;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.userId !== userId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this comment" },
        { status: 403 }
      );
    }

    await prisma.comment.delete({ where: { id: commentId } });

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting comment" },
      { status: 500 }
    );
  }
}
