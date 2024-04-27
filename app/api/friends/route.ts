import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection";
import User from "@/models/userModel";
import { auth } from "../auth/auth";
import Friend from "@/models/friendsModal";

export async function POST(req: Request) {
  try {
    const searchURL = new URL(req?.url);
    const session = await auth();

    const fromUserID = session?.user?.id;
    const toUserID = searchURL.searchParams.get("to");

    if (fromUserID && toUserID) {
      console.log(req, "reqXX", fromUserID, toUserID);

      await connectDB();
      // const exclude = {
      //   password: 0,
      //   createdAt: 0,
      //   updatedAt: 0,
      //   __v: 0,
      //       };
      // const fromUser = await User.findById(fromUserID, exclude);
      // const toUser = await User.findById(toUserID, exclude);

      // const res = await Friend.create({
      //   from_user: fromUser,
      //   to_user: toUser,
      //   status: "Pending",
      // });

      const res = await User.findByIdAndUpdate(
        toUserID,
        {
          $push: { pending_friend_req: fromUserID },
        },
        { new: true }
      );

      console.log(res, "resFriends");

      if (res) {
        return NextResponse.json(
          { message: "Friend Request Sent Successfully" },
          { status: 200 }
        );
      }
    }

    // const session = await auth();

    // const url = new URL();
    // const searchParam = new URLSearchParams();
    // const { id } = await req.json();

    // await connectDB();
    // const friendReqSendTo = await User.find({ id }, "-password");

    // console.log(friendReqSendTo, "friendReqSendTo");
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
