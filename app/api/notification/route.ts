import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection";
import Notification from "@/models/notificationModal";
import User from "@/models/userModel";
import { friendServerAction } from "@/server-actions/friendServerAction";

export async function POST(req: Request) {
  try {
    const { notificationFrom, notificationOF, text, type } = await req.json();

    if (!notificationFrom || !notificationOF || !text || !type) {
      return NextResponse.json(
        { message: "All fields are mandatory!" },
        { status: 400 }
      );
    }

    await connectDB();

    const notification = await Notification.find({
      $and: [
        { "notificationFrom._id": notificationFrom },
        { "notificationOF._id": notificationOF },
        { type: "friend_request" },
      ],
    });

    if (notification?.length > 0) {
      return NextResponse.json(
        {
          message: "Friend request already sent.",
        },
        { status: 400 }
      );
    }

    const notificationFromUser = await User.findById(
      notificationFrom,
      "-password"
    ).exec();

    const notificationToUser = await User.findById(
      notificationOF,
      "-password"
    ).exec();

    if (!notificationFromUser || !notificationToUser) {
      return NextResponse.json(
        {
          message: "Notification from user not found",
        },
        { status: 400 }
      );
    }

    // Destructure notificationFromUser
    const {
      fat: fromFat,
      exp: fromExp,
      jai: fromJai,
      sub: fromSub,
      ...fromFilteredUser
    } = notificationFromUser;

    const {
      _id: fromId,
      fullname: fromFullname,
      username: fromUsername,
      email: fromEmail,
    } = fromFilteredUser?._doc || {};

    // Destructure notificationToUser
    const {
      fat: toFat,
      exp: toExp,
      jai: toJai,
      sub: toSub,
      ...toFilteredUser
    } = notificationToUser;

    const {
      _id: toId,
      fullname: toFullname,
      username: toUsername,
      email: toEmail,
    } = toFilteredUser?._doc || {};

    const notify = await Notification.create({
      notificationFrom: {
        _id: fromId,
        fullname: fromFullname,
        username: fromUsername,
        email: fromEmail,
      },
      notificationOF: {
        _id: toId,
        fullname: toFullname,
        username: toUsername,
        email: toEmail,
      },
      text,
      type,
    });

    if (notify) {
      return NextResponse.json(
        { message: "Notification Sent" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Something Went Wrong",
        },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const searchURL = new URL(req?.url);
    const userID = searchURL.searchParams.get("userID");
    let friends: any = [];

    if (!userID) {
      return NextResponse.json({ error: "User ID Required" }, { status: 400 });
    }

    await connectDB();
    let notify: any[] = [];

    const notification = await Notification.find({
      "notificationOF._id": userID,
    });
    const notification2 = await Notification.find({
      "notificationFrom._id": userID,
      type: "friends",
    });

    if (notification?.length === 0 && notification2?.length === 0) {
      return NextResponse.json(
        { message: "No Notifications Yet" },
        { status: 400 }
      );
    }

    // Process friend requests in notification2
    if (notification2?.length > 0 && notification2[0]?.type === "friends") {
      for (const request of notification2) {
        try {
          await friendServerAction("friends", {
            fromID: request.notificationFrom?._id,
            toID: request.notificationOF?._id,
          });
        } catch (error) {
          console.error("Error processing friend request:", error);
        }
      }
    }

    notify = [...notify, ...notification, ...notification2];

    return NextResponse.json({ notification: notify }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
