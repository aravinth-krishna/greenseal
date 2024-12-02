import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { userId, title, content, companyId } = await req.json();

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
        companyId,
      },
      include: {
        user: { select: { id: true, username: true } }, // Ensure id is included
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { id: true, username: true } }, // Ensure id is included
        company: { select: { name: true } },
        votes: true,
        comments: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { postId } = await req.json();

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
      where: { id: postId },
    });

    if (!post || post.userId !== userId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this post" },
        { status: 403 }
      );
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
