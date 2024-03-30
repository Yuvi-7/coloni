import React from "react";
import PostCard from "./PostCard";
import CreatePost from "./create-post/CreatePost";

const Home = () => {
  return (
    <div className="h-[93vh] flex gap-2">
      <div className="bg-gray-300 h-full basis-1/4 p-2">left</div>
      <div className="h-full basis-1/2 p-2 overflow-y-auto">
        <CreatePost />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div className="bg-gray-800 h-full basis-1/4 p-2">ds</div>
    </div>
  );
};

export default Home;
