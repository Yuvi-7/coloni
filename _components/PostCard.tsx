import { Avatar } from "@mui/material";
import React from "react";

const PostCard = ({ post }: any) => {
  // console.log(post, "000", post?.assets);
  return (
    <div className="bg-white rounded shadow max-w-lg mx-auto my-3">
      <header className="p-4">
        <Avatar
          alt={post?.creator_id?.fullname}
          src="/broken-image.jpg"
          className="float-left rounded-full w-10 h-10 m-1 mr-3"
        />

        <h3 className="text-lg font-bold">{post?.creator_id?.fullname}</h3>
        <p className="text-sm text-gray-600">@{post?.creator_id?.username}</p>
      </header>

      <section>
        <div
          className={`bg-[#EDFEFE] grid grid-cols-${post?.assets?.length} gap-1`}
        >
          {post?.assets?.map((img: { id: string; url: string }) => (
            <div
              className="col-span-1 h-[350px] bg-cover bg-no-repeat bg-center"
              key={`dispalyImage${img?.id}`}
              style={{
                backgroundImage: `URL(${
                  img.url || "https://via.placeholder.com/400x250"
                })`,
              }}
            ></div>
          ))}
        </div>

        {/* <img src="https://via.placeholder.com/400x250" className="w-full" /> */}
        <p className="text-sm text-gray-600 p-4">{post?.text}</p>
      </section>

      <footer className="p-4">
        <a
          href="#"
          className="uppercase font-bold text-sm text-blue-700 hover:underline mr-3"
        >
          Book Online
        </a>
        <a
          href="#"
          className="uppercase font-bold text-sm text-blue-700 hover:underline"
        >
          More Info
        </a>
        <a href="#" className="float-right">
          <img src="https://img.icons8.com/flat_round/24/000000/share--v1.png" />
        </a>
        <a href="#" className="float-right mr-3">
          <img src="https://img.icons8.com/flat_round/24/000000/hearts.png" />
        </a>
      </footer>
    </div>
  );
};

export default PostCard;
