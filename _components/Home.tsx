"use client";
import React, { useEffect } from "react";
import PostCard from "./PostCard";
import CreatePost from "./create-post/CreatePost";
import io from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchPosts } from "@/lib/redux/features/posts/PostsSlice";
import FriendRequests from "./friend-request/FriendRequests";
import { usePathname } from "next/navigation";

const Home = () => {
  const posts = useAppSelector((state) => state?.post);
  const dispatch = useAppDispatch();
  const pathname = usePathname();


  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // useEffect(() => {
  //   const socket = io();

  //   socket.on("connect", () => {
  //     console.log("Connected to socket server");
  //   });

  //   socket.on("notification", (message: string) => {
  //     console.log("Received notification:", message);
  //     // Handle notification, e.g., display in UI
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [pathname]);

  const connectSocket = async () => {
    const res = await fetch("/api/socket");
  };

  return (
    <div className="h-[93vh] flex gap-2">
      <div className=" h-full basis-[30%] p-2">
        <FriendRequests />
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

      <div className="bg-gray-800 h-full basis-[30%] p-2">ds</div>
    </div>
  );
};

export default Home;
