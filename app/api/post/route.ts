"use server";
import { NextResponse, NextRequest } from "next/server";
import Post from "@/models/createPostModal";
import connectDB from "@/lib/dbConnection";

export async function POST(req: Request) {
  try {
    const { creator, text } = await req.json();

    if (!creator || !text) {
      return NextResponse.json(
        { message: "All fields are mandatory!" },
        { status: 400 }
      );
    }

    await connectDB();

    const post = await Post.create({
      creator: creator,
      text,
    });

    if (post) {
      return NextResponse.json(
        {
          creator: post.creator,
          text: post.text,
          message: "Success! Your post has been published.",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
