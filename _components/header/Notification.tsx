import { notifcation as serverActionNotification } from "@/server-actions/notificationServerAction";
import { Avatar } from "@mui/material";
import React from "react";

interface NotificationProps {
  notification: {
    notificationFrom: {
      fullname: string;
      username: string;
      email: string;
    };
    notificationOF: string;
    text: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

const confirmReq = (fromID: string) => {
  serverActionNotification("friends", { fromID });
};

const Notification = ({ notification }: NotificationProps) => {
  console.log(notification.type, "notification");
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
            {notification?.notificationFrom?.fullname}
            <span className="text-gray-400">{" " + notification?.text}</span>
          </p>
        </div>

        {notification?.type === "friend_request" && (
          <div className="inline-flex items-center text-xs font-semibold text-gray-900 dark:text-white">
            <button
              className="bg-blue-300 p-2 rounded-md mr-2"
              onClick={() => confirmReq(notification?.notificationFrom?._id)}
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
