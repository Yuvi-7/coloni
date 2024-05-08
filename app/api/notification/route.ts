import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection";
import Notification from "@/models/notificationModal";
import User from "@/models/userModel";
import { auth } from "../auth/auth";

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
        { notificationOF },
        { type: "friend_request" },
      ],
    });

    // console.log(notification, "notification00");

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

    if (!notificationFromUser) {
      return NextResponse.json(
        {
          message: "Notification from user not found",
        },
        { status: 400 }
      );
    }
    const { fat, exp, jai, sub, ...filteredUser } = notificationFromUser;
    const { _id, fullname, username, email } = filteredUser?._doc;

    console.log(filteredUser?._doc, "notificationFromUser", fullname);

    const notify = await Notification.create({
      notificationFrom: { _id, fullname, username, email },
      notificationOF,
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

    if (!userID) {
      return NextResponse.json({ error: "User ID Required" }, { status: 400 });
    }

    await connectDB();
    let notify: any[] = [];

    const notification = await Notification.find({ notificationOF: userID });
    const notification2 = await Notification.find({
      "notificationFrom._id": userID,
      type: "friends",
    });
    console.log(notification2, "notification2", notification);

    if (notification?.length === 0 && notification2?.length === 0) {
      return NextResponse.json(
        { message: "No Notifications Yet" },
        { status: 400 }
      );
    }

    notify = [...notify, ...notification, ...notification2];

    return NextResponse.json({ notification: notify }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}

// export async function PATCH(req: Request) {
//   try {
//     const session = await auth();

//     const searchURL = new URL(req?.url);
//     const myUserID = session?.user?.id;
//     const reqFrom = searchURL.searchParams.get("from");

//     if (!myUserID) {
//       return NextResponse.json({ message: "User not found" }, { status: 400 });
//     }

//     const res = await Notification.findByIdAndUpdate(
//       { notificationOF: myUserID, "notificationFrom._id": reqFrom },
//       {
//         $set: { type: "friends", text: "You both are now Friends" },
//       },
//       { new: true }
//     );

//     if (res) {
//       return NextResponse.json({ message: "Notific" }, { status: 400 });
//     }
//   } catch (e) {
//     return NextResponse.json({ message: e }, { status: 400 });
//   }
// }
