"use server";
import { NextResponse, NextRequest } from "next/server";
import Post from "@/models/createPostModal";
import connectDB from "@/lib/dbConnection";
import User from "@/models/userModel";

export async function POST(req: Request) {
  try {
    const { creator_id, text, username, fullname, assets } = await req.json();

    if (!creator_id || !text) {
      return NextResponse.json(
        { message: "All fields are mandatory!" },
        { status: 400 }
      );
    }

    await connectDB();

    const post = await Post.create({
      creator_id,
      username,
      fullname,
      text,
      assets,
    });

    if (post) {
      const user = await User.findOne({ _id: creator_id });

      return NextResponse.json(
        {
          creator_id: post?.creator_id,
          creator_name: user?.fullname,
          creator_username: user?.username,
          text: post.text,
          assets: post.assets,
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

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().populate("creator_id").exec();
    if (!posts) {
      return NextResponse.json(
        { message: "Something Went Wrong!" },
        { status: 400 }
      );
    }

    return NextResponse.json({ posts }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
