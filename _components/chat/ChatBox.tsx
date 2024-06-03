"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/utils/socket";

const ChatBox = () => {
  const chatWith = useAppSelector((state) => state.chat.chatWith);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

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
        recipientID: chatWith?._id, // to sahil
        recipientDetail: chatWith,
        // recipientID: "665d4fae1c98466bf7a4875b", // to sahil
        message: inputMessage,
      });
    }

    setInputMessage("");
  };

  return (
    <div className="">
      <div
        id="messages"
        className="h-[30rem] flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line rounded-bl-none bg-gray-300 text-gray-600">
                  Can be verified on any platform using docker
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line rounded-br-none bg-blue-600 text-white">
                  Your error message says permission denied, npm global installs
                  must be given root privileges.
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line bg-gray-300 text-gray-600">
                  Command was run with root privileges. I'm sure about that.
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line bg-gray-300 text-gray-600">
                  I've update the description so it's more obviously now
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line bg-gray-300 text-gray-600">
                  FYI https://askubuntu.com/a/700266/510172
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line rounded-bl-none bg-gray-300 text-gray-600">
                  Check the line above (it ends with a # so, I'm running it as
                  root )<br />
                  Additionally, any clue on why this happens?
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line bg-blue-600 text-white">
                  Anyways I would suggest you go for it..
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block whitespace-pre-line rounded-br-none bg-blue-600 text-white">
                  The amount of errors in the compilation shouldn't be too many
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-4.586-4.586a2 2 0 00-2.828 0l-4.586 4.586a2 2 0 000 2.828l4.586 4.586a2 2 0 002.828 0l4.586-4.586a2 2 0 000-2.828z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.828 11L10 6.828m4.172 4.172L10 17"
                ></path>
              </svg>
            </button>
          </span>

          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
          </form>

          {/* <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-4.586-4.586a2 2 0 00-2.828 0l-4.586 4.586a2 2 0 000 2.828l4.586 4.586a2 2 0 002.828 0l4.586-4.586a2 2 0 000-2.828z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.828 11L10 6.828m4.172 4.172L10 17"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l-4.586 4.586a2 2 0 000 2.828l4.586 4.586a2 2 0 002.828 0l4.586-4.586a2 2 0 000-2.828l-4.586-4.586a2 2 0 00-2.828 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.828 11L10 6.828m4.172 4.172L10 17"
                ></path>
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
