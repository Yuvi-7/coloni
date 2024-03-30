"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const CreatePost = () => {
  const session = useSession()?.data;

  console.log(session?.user?.id, "seesx");

  const createPost = async () => {
    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        creator: session?.user?.id,
        text: "reandom tex",
      }),
    });
    const resData = await res.json();
    if (!res.ok) {
      return toast.error(resData?.message);
    }

    toast.success(resData?.message);
  };

  return (
    <div className="bg-white rounded shadow max-w-lg mx-auto my-3 p-4">
      <div className="flex justify-between pb-3">
        <div className="flex item-center">
          <Avatar alt="Yemy Sharp" src="/broken-image.jpg" />

          <div className="flex flex-col justify-center pl-2">
            <strong>Yuvraj Gupta</strong>
            <span className="text-xs">@yuvig7</span>
          </div>
        </div>

        {/* <IoCloseOutline
          size={25}
          className="cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-full"
        /> */}
      </div>
      <div className="py-1">
        <textarea
          name="post"
          id="create-post"
          rows={4}
          className="w-full border-b-2 outline-none resize-none"
          placeholder="What's happening today?"
        ></textarea>
      </div>
      <div className="flex justify-end ">
        <button
          className="bg-[#9163E8] text-white py-2 px-4 rounded-md text-sm"
          onClick={createPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
