import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

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

    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post || post.userId !== userId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this post" },
        { status: 403 }
      );
    }

    await prisma.comment.deleteMany({
      where: { postId: parseInt(postId) },
    });

    await prisma.vote.deleteMany({
      where: { postId: parseInt(postId) },
    });

    await prisma.post.delete({
      where: { id: parseInt(postId) },
    });

    return NextResponse.json({
      message: "Post, its comments, and votes deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the post" },
      { status: 500 }
    );
  }
}
