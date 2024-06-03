"use client";
import React, { useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./create-post/CreatePost";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchPosts } from "@/lib/redux/features/posts/postsSlice";
import FriendRequests from "./friend-request/FriendRequests";
import Chat from "./chat/Chat";
import { useSession } from "next-auth/react";
import { socket } from "@/utils/socket";

const Home = () => {
  const posts = useAppSelector((state) => state?.post);
  const [toggleChat, setToggleChat] = useState<boolean>(false);
  const [messages, setMessages]: any = useState([]);
  const session: any = useSession()?.data;
  const dispatch = useAppDispatch();

  socket.emit("join_room", session?.user?.id);

  useEffect(() => {
    dispatch(fetchPosts());

    socket.on(
      "private_message",
      ({ recipientDetail, senderID, message }: any) => {
        console.log(senderID, message, "MSGX", recipientDetail);
        setMessages((prev: any) => [
          ...prev,
          { ...recipientDetail, from: "other", message },
        ]);
      }
    );

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  console.log(messages, "messagesX");

  return (
    <div className="h-[93vh] flex gap-2">
      <div className=" h-full basis-[30%] p-2">
        <FriendRequests type="friend_req" />
      </div>

      <div className="h-full basis-2/5 p-2 overflow-y-auto border-x-2">
        <CreatePost />

        <div className="flex flex-col-reverse">
          {posts?.posts?.map((post) => (
            <div key={post?._id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 h-full basis-[30%] p-2 relative">
        <FriendRequests type="friends" setToggleChat={setToggleChat} />
        <Chat toggleChat={toggleChat} setToggleChat={setToggleChat} />
      </div>
    </div>
  );
};

export default Home;
