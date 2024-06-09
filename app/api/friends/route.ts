import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection";
import User from "@/models/userModel";
import { auth } from "../auth/auth";

export async function POST(req: Request) {
  try {
    const searchURL = new URL(req?.url);
    const session = await auth();
    const fromUserID: any = session?.user?.id;
    const toUserID: any = searchURL.searchParams.get("to");

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

export async function GET() {
  const session = await auth();
  const userID: any = session?.user?.id;

  try {
    await connectDB();
    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json({ message: "User not Found!" }, { status: 400 });
    }

    return NextResponse.json({ friends: user?.friends }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
