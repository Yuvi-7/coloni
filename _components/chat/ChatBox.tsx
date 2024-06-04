"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { socket } from "@/utils/socket";
import { dispatchMessages } from "@/lib/redux/features/chats/chatSlice";
import Message from "./Message";
import { Avatar } from "@mui/material";

const ChatBox = () => {
  const chatWith = useAppSelector((state) => state.chat.chatWith);
  const messages = useAppSelector((state) => state.chat.messages);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const dispatch = useAppDispatch();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();

    if (socket.connected) {
      socket.emit("private_message", {
        recipientID: chatWith?._id,
        recipientDetail: chatWith,
        message: inputMessage,
      });

      dispatch(dispatchMessages({ ...chatWith, inputMessage, from: "self" }));
    }

    setInputMessage("");
  };

  console.log(messages, "messagesX", chatWith);

  return (
    <>
      <div className="h-14 p-2 border-b-2 shadow-sm border-slate-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Avatar
              alt={chatWith?.fullname}
              src="/broken-image.jpg"
              className="rounded-full w-9 h-9"
            />
          </div>
          <div className="flex-1 min-w-0 ms-3">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {chatWith?.fullname}
            </p>
            <p className="text-xs text-gray-500 truncate dark:text-gray-400">
              @{chatWith?.username}
            </p>
          </div>
          {/* <div className="inline-flex items-center text-xs font-semibold text-gray-900 dark:text-white">
            {type === "friends" ? (
              <span>
                <Image src={chat} alt="chat" width={25} />
              </span>
            ) : (
              <button
                className="bg-blue-300 p-2 rounded-md"
                onClick={() => sendFriendReq(colony?._id)}
              >
                Add Colony
              </button>
            )}
          </div> */}
        </div>
      </div>

      <div
        id="messages"
        className="h-[22rem] flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages?.map((msg: any, i: number) => (
          <div key={`Messages${msg.email + i}`}>
            <Message msg={msg} />
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t-2 border-gray-200 px-2 py-2 mb-2 sm:mb-0">
        <div className="relative flex">
          <form onSubmit={sendMessage} className="w-full">
            <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden cursor-pointer shadow-md ring-1 ring-gray-200 p-2">
              <input
                type="text"
                name="text"
                className="w-full h-full border-none outline-none text-sm text-black pl-3 focus:caret-orange"
                placeholder="Write your message!"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />

              <div className="h-6 w-px mx-3 bg-gray-300"></div>

              <button
                className="border-none bg-transparent h-full transition duration-300"
                type="submit"
              >
                <span>
                  <IoMdSend />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
