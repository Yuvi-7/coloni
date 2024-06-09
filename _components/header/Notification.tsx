import { notifcation as serverActionNotification } from "@/server-actions/notificationServerAction";
import { Avatar } from "@mui/material";
import React from "react";
import { socket } from "@/utils/socket";
import { fetchNotifications } from "@/lib/redux/features/notifications/notificationSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useSession } from "next-auth/react";

interface NotificationProps {
  notification: {
    notificationFrom: {
      _id: string;
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

const sendNotificationToUser = (friendID: string) => {
  socket.emit("sent_friend_req", friendID, "Friend Request Accepted!");
};

const confirmReq = async (fromID: string, dispatch: any) => {
  const res = await serverActionNotification("friends", { fromID });
  if (res) {
    sendNotificationToUser(fromID);
    dispatch(fetchNotifications(fromID));
  }
};

const renderText = (n: any) => {
  const userName: any = useSession()?.data?.user;
  const names = [
    n?.notificationOF?.fullname,
    n?.notificationFrom?.fullname,
  ]?.filter((nm: any) => nm !== userName?.fullname);

  return (
    <>
      {n.type === "friends"
        ? `You and ${names}`
        : n?.notificationFrom?.fullname}
      <span className="text-gray-400">{" " + n?.text}</span>
    </>
  );
};

const Notification = ({ notification }: NotificationProps) => {
  const dispatch = useAppDispatch();

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
