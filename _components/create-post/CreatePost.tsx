"use client";
import { Avatar } from "@mui/material";
import addPhotosImg from "@images/gallery.png";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import CreatePostModal from "@/modalUI/CreatePostModal";
import { text } from "stream/consumers";

const CreatePost = () => {
  const session = useSession()?.data;
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="bg-white rounded shadow max-w-lg mx-auto my-3 p-4">
        <div className="flex justify-between pb-3">
          <div className="flex item-center">
            <Avatar alt={session?.user?.fullname} src="/broken-image.jpg" />

            <div className="flex flex-col justify-center pl-2">
              <strong>{session?.user?.fullname}</strong>
              <span className="text-xs">@{session?.user?.username}</span>
            </div>
          </div>
        </div>
        <div className="py-1">
          <textarea
            name="post"
            id="create-post"
            rows={2}
            readOnly
            className="w-full border-b-2 outline-none resize-none cursor-pointer"
            placeholder="What's happening today?"
            onClick={toggleModal}
          />
        </div>
        <div className="flex justify-between items-center ">
          <div className="">
            <Image
              src={addPhotosImg}
              width={30}
              height={30}
              alt="add_photos"
              className="cursor-pointer"
              onClick={toggleModal}
            />
          </div>
        </div>
      </div>

      <CreatePostModal toggleModal={toggleModal} open={open} />
    </>
  );
};

export default CreatePost;
