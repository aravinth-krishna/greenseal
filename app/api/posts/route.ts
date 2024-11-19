import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

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
        user: { select: { username: true } },
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
