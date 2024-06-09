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
import { dispatchMessages } from "@/lib/redux/features/chats/chatSlice";
import { fetchFriends } from "@/lib/redux/features/friends/friendSlice";

interface Colony {
  __v: number;
  _id: string;
  createdAt: string;
  email: string;
  fullname: string;
  updatedAt: string;
  username: string;
}

const Home = () => {
  const friends = useAppSelector((state) => state.friends.friends);
  const posts = useAppSelector((state) => state?.post);
  const [toggleChat, setToggleChat] = useState<boolean>(false);
  const [colonies, setColonies] = useState<Colony[]>([]);

  const session: any = useSession()?.data;
  const dispatch = useAppDispatch();

  socket.emit("join_room", session?.user?.id);
  socket.emit("userConnected", session?.user?.id);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchFriends());

    socket.on(
      "private_message",
      ({ recipientDetail, senderID, message }: any) => {
        dispatch(
          dispatchMessages({ ...recipientDetail, message, from: "other" })
        );
      }
    );

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    getColonies();
  }, [friends]);

  const getColonies = async () => {
    const res = await fetch("/api/users");
    const users = await res.json();

    if (friends?.length > 0) {
      const uniqueFromArray1 = users?.users?.filter(
        (item1: any) => !friends.some((item2) => item2._id === item1._id)
      );

      const uniqueFromArray2 = friends.filter(
        (item2) => !users?.users?.some((item1: any) => item1._id === item2._id)
      );

      setColonies(uniqueFromArray1.concat(uniqueFromArray2));
    } else {
      setColonies([...users?.users]);
    }
  };

  return (
    <div className="h-[93vh] flex gap-2">
      <div className=" h-full basis-[30%] p-2">
        <FriendRequests type="friend_req" colonies={colonies} />
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
        <FriendRequests
          type="friends"
          setToggleChat={setToggleChat}
          colonies={friends}
        />
        <Chat toggleChat={toggleChat} setToggleChat={setToggleChat} />
      </div>
    </div>
  );
};

export default Home;
