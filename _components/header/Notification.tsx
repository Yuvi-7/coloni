import {
  notifcation,
  notifcation as serverActionNotification,
} from "@/server-actions/notificationServerAction";
import { Avatar } from "@mui/material";
import React from "react";
import { io } from "socket.io-client";
import { fetchNotifications } from "@/lib/redux/features/notifications/notificationSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

const socket = io();

interface NotificationProps {
  notification: {
    notificationFrom: {
      fullname: string;
      username: string;
      email: string;
    };
    _id: string;
    notificationOF: string;
    text: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

const sendNotificationToUser = (friendID: string) => {
  socket.emit("sent_friend_req", friendID, "Friend Request Accepted!");
};

const confirmReq = async (fromID: string, dispatch: any) => {
  const res = await serverActionNotification("friends", { fromID });
  if (res) {
    sendNotificationToUser(fromID);
    dispatch(fetchNotifications(fromID)); // pass logged in userID
  }
  console.log(res, "resCC");
};

const renderText = (n: any) => {
  return (
    <>
      {n.type === "friends"
        ? `You and ${n?.notificationOF?.fullname}`
        : n?.notificationFrom?.fullname}
      <span className="text-gray-400">{" " + n?.text}</span>
    </>
  );
};

console.log(notifcation, "123");

const Notification = ({ notification }: NotificationProps) => {
  const dispatch = useAppDispatch();

  console.log(notification, "notification");
  return (
    <div className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Avatar
            alt={notification?.notificationFrom?.fullname}
            src="/broken-image.jpg"
            className="rounded-full w-8 h-8"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate text-wrap">
            {renderText(notification)}
          </p>
        </div>

        {notification?.type === "friend_request" && (
          <div className="inline-flex items-center text-xs font-semibold text-gray-900 dark:text-white">
            <button
              className="bg-blue-300 p-2 rounded-md mr-2"
              onClick={() =>
                confirmReq(notification?.notificationFrom?._id, dispatch)
              }
            >
              Confirm
            </button>
            <button className="bg-gray-300 p-2 rounded-md">Reject</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
