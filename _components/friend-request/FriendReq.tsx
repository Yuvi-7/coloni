import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import React, { useEffect } from "react";
import { fetchNotifications } from "@/lib/redux/features/notifications/notificationSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

interface Colony {
  __v: number;
  _id: string;
  createdAt: string;
  email: string;
  fullname: string;
  updatedAt: string;
  username: string;
}
interface FriendReqProps {
  colony: Colony;
}

const FriendReq = ({ colony }: FriendReqProps) => {
  const session: any = useSession()?.data;
  const socket = io();
  const dispatch = useAppDispatch();

  // console.log(colony, "colonies", session);

  useEffect(() => {
    socket.emit("userConnected", session?.user?.id);

    socket.on("notification", (message: string) => {
      console.log("Received notification:", message);
      dispatch(fetchNotifications(session?.user?.id));
    });

    return () => {
      // NEED TOBE UNCOMMENT ----------------
      // socket.disconnect();
    };
  }, []);

  const sendNotificationToUser = (friendID: string) => {
    socket.emit("sent_friend_req", friendID);
  };

  const sendFriendReq = async (friendID: string) => {
    const res = await fetch(`/api/friends/?to=${friendID}`, { method: "POST" });
    const users = await res.json();

    if (users?.message) {
      const res = await fetch("/api/notification", {
        method: "POST",
        body: JSON.stringify({
          notificationFrom: session.user.id,
          notificationOF: friendID,
          text: "sent you a friend request.",
          type: "friend_request",
        }),
      });

      if (res?.ok) {
        sendNotificationToUser(friendID);
      }
    }
  };

  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Avatar
            alt={colony?.fullname}
            src="/broken-image.jpg"
            className="rounded-full w-8 h-8"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {colony?.fullname}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            @{colony?.username}
          </p>
        </div>
        <div className="inline-flex items-center text-xs font-semibold text-gray-900 dark:text-white">
          <button
            className="bg-blue-300 p-2 rounded-md"
            onClick={() => sendFriendReq(colony?._id)}
          >
            Add Colony
          </button>
          {/* <button
            className="bg-gray-300 p-2 rounded-md"
          >
            Revert
          </button> */}
        </div>
      </div>
    </li>
  );
};

export default FriendReq;
