"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const CreatePost = () => {
  const session = useSession()?.data;
  const [text, setText] = useState("");

  console.log(session, "seesx");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const createPost = async () => {
    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        creator_id: session?.user?.id,
        text,
      }),
    });
    const resData = await res.json();
    if (!res.ok) {
      return toast.error(resData?.message);
    }

    toast.success(resData?.message);
    getPost();
  };

  const getPost = async () => {
    const res = await fetch("/api/post", {
      method: "GET",
    });
    // const resData = await res.json();
    console.log(res, "resD");
    // if (!res.ok) {
    //   return toast.error(resData?.message);
    // }

    // toast.success(resData?.message);
  };

  return (
    <div className="bg-white rounded shadow max-w-lg mx-auto my-3 p-4">
      <div className="flex justify-between pb-3">
        <div className="flex item-center">
          <Avatar alt="Yemy Sharp" src="/broken-image.jpg" />

          <div className="flex flex-col justify-center pl-2">
            <strong>{session?.user?.fullname}</strong>
            <span className="text-xs">@{session?.user?.username}</span>
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
          onChange={(e) => handleChange(e)}
        />
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
