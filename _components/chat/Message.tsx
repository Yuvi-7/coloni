import { Avatar } from "@mui/material";
import React from "react";

function Message({ msg }: any) {
  return (
    <>
      {msg?.from === "self" ? (
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line rounded-br-none bg-blue-600 text-white">
                  {msg?.inputMessage}
                </span>
              </div>
            </div>
            <Avatar
              alt={msg?.fullname}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 25, height: 25 }}
            />
          </div>
        </div>
      ) : (
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line rounded-bl-none bg-gray-300 text-gray-600">
                  {msg?.message}
                </span>
              </div>
            </div>
            <Avatar
              alt={msg?.fullname}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 25, height: 25 }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
