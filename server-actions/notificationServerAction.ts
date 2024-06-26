"use server";
import { auth } from "@/app/api/auth/auth";
import connectDB from "../lib/dbConnection";
import Notification from "@/models/notificationModal";
import mongoose from "mongoose";

interface UserProp {
  fromID: string;
}

export async function notifcation(type: string, user: UserProp) {
  switch (type) {
    case "friends":
      const session = await auth();
      const myUserID = session?.user?.id;

      if (!myUserID || !user.fromID) {
        throw new Error("ID is missing");
      }

      await connectDB();

      const res = await Notification.findOneAndUpdate(
        {
          "notificationOF._id": myUserID,
          "notificationFrom._id": user.fromID,
        },
        { $set: { text: "are now friends", type: "friends" } },
        { new: true }
      ).exec();

      return res ? true : "Something went wrong!";

    default: {
      console.log("Something went wrong!");
    }
  }
}
