"use server";
import { auth } from "@/app/api/auth/auth";
import connectDB from "@/lib/dbConnection";
import User from "@/models/userModel";

interface UserProp {
  fromID: string;
  toID: string;
}

async function updateFriendList(userId: string, friendId: string) {
  const friend = await User.findById(friendId).select(
    "_id fullname username email"
  );

  if (!friend) {
    throw new Error(`Friend with ID ${friendId} not found`);
  }

  return User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        friends: {
          _id: friend._id,
          fullname: friend.fullname,
          username: friend.username,
          email: friend.email,
        },
      },
    },
    { new: true }
  ).select("friends");
}

export async function friendServerAction(type: string, user: UserProp) {
  const session = await auth();
  const myUserID = session?.user?.id;

  if (!myUserID) {
    return "User is not authenticated";
  }

  if (type !== "friends") {
    console.error("Invalid action type:", type);
    return "Invalid action";
  }

  const { fromID, toID } = user;
  if (!fromID || !toID) {
    throw new Error("Both fromID and toID are required");
  }

  await connectDB();

  try {
    const [updateFromUser, updateToUser] = await Promise.all([
      updateFriendList(fromID, toID),
      updateFriendList(toID, fromID),
    ]);

    if (updateFromUser?._id?.toString() === myUserID) {
      return updateFromUser.friends;
    }

    if (updateToUser?._id?.toString() === myUserID) {
      return updateToUser.friends;
    }

    return "Something went wrong!";
  } catch (error: any) {
    console.error("Error updating friend list:", error.message);
    return "Error updating friend list";
  }
}
