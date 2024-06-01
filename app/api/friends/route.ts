import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection";
import User from "@/models/userModel";
import { auth } from "../auth/auth";

export async function POST(req: Request) {
  try {
    const searchURL = new URL(req?.url);
    const session = await auth();

    const fromUserID = session?.user?.id;
    const toUserID = searchURL.searchParams.get("to");

    if (fromUserID && toUserID) {
      await connectDB();

      const res = await User.findByIdAndUpdate(
        toUserID,
        {
          $push: { pending_friend_req: fromUserID },
        },
        { new: true }
      );

      if (res) {
        return NextResponse.json(
          { message: "Friend Request Sent Successfully" },
          { status: 200 }
        );
      }
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const searchURL = new URL(req?.url);
    const session = await auth();

    const myUserID = session?.user?.id;
    const reqFrom = searchURL.searchParams.get("to");

    if (!reqFrom || !myUserID) {
      return NextResponse.json(
        { message: "One of the ID is missing" },
        { status: 400 }
      );
    }

    const res = await User.findByIdAndUpdate(
      toUserID,
      {
        $push: { pending_friend_req: fromUserID },
      },
      { new: true }
    );

    
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
