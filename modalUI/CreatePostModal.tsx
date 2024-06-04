import React, { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import addPhotosImg from "@images/gallery.png";
import { Avatar } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { fetchPosts } from "@/lib/redux/features/posts/postsSlice";
import { uploadAssets } from "@/lib/uploadIntoFirebaseCloud";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/lib/redux/hooks";

interface FileState {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface Props {
  open: boolean;
  toggleModal: () => void;
}

let style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "auto",
  outline: "none",
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function CreatePostModal({ open, toggleModal }: Props) {
  const session: any = useSession()?.data;
  const [text, setText] = useState("");
  const [images, setImages] = useState<FileState[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !open && setImages([]);
  }, [open]);

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      for (let i = 0; i < files?.length; i++) {
        setImages((prevImages: Array<FileState>) => [...prevImages, files[i]]);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const createPost = async () => {
    if (images?.length > 0) {
      let imgURL: { id: string; url: string; type: string }[] = [];
      for (let i = 0; i < images?.length; i++) {
        const uniqueID = uuidv4();
        const url = await uploadAssets(
          images[i],
          `${images[i]?.size}uuID${uniqueID + images[0]?.lastModified}`
        );

        if (url) {
          imgURL = [...imgURL, { id: uniqueID, url, type: "image" }];
        }
      }

      post(imgURL);
      return;
    }
    post();
  };

  const post = async (imgURL?: { id: string; url: string; type: string }[]) => {
    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        creator_id: session?.user?.id,
        text,
        assets: imgURL && imgURL?.length > 0 ? imgURL : [],
      }),
    });
    const resData = await res.json();
    if (!res.ok) {
      return toast.error(resData?.message);
    }

    toast.success(resData?.message);
    dispatch(fetchPosts());
    setText("");
    toggleModal();
  };

  const deleteImage = (name: string) => {
    setImages([...images?.filter((img: FileState) => img?.name !== name)]);
  };

  // console.log(images, "ghj");
  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center" style={{ position: "relative" }}>
            <h4
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              Create Post
            </h4>
            <IoCloseOutline
              size={25}
              className="cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-full"
              style={{ position: "absolute", right: 0 }}
              onClick={toggleModal}
            />
          </div>

          <div className="flex justify-between pb-3">
            <div className="flex item-center">
              <Avatar alt={session?.user?.fullname} src="/broken-image.jpg" />

              <div className="flex flex-col justify-center pl-2">
                <strong>{session?.user?.fullname}</strong>
                <span className="text-xs">@{session?.user?.username}</span>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col justify-between"
            style={{ height: "86%" }}
          >
            <div className="py-1">
              <textarea
                name="post"
                id="create-post"
                rows={4}
                className="w-full border-b-2 outline-none resize-none"
                placeholder="What's happening today?"
                value={text}
                onChange={(e) => handleChange(e)}
              />
            </div>

            {images?.length > 0 && (
              <div
                className="flex gap-2 flex-wrap overflow-y-auto justify-between"
                style={{ height: "30vh", marginBottom: "10px" }}
              >
                {images.map((file: FileState, i: number) => (
                  <div
                    key={`upload_images${i}`}
                    style={{
                      display: "inline-block",
                      color: "transparent",
                      backgroundColor: "aliceblue",
                      padding: "25px",
                      borderRadius: "5px",
                      position: "relative",
                      width: "49%",
                      height: "fit-content",
                    }}
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="image"
                      className="w-200 h-100 object-cover m-auto"
                      width={200}
                      height={100}
                    />

                    <IoCloseOutline
                      size={25}
                      className="cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-full"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        color: "#b0abab",
                      }}
                      onClick={() => deleteImage(file?.name)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <div className="flex justify-between items-center">
                <div className="">
                  <label htmlFor="imgae_uplaod">
                    <Image
                      src={addPhotosImg}
                      width={30}
                      height={30}
                      alt="add_photos"
                      className="cursor-pointer"
                    />
                  </label>

                  <input
                    type="file"
                    name=""
                    accept="image/*"
                    id="imgae_uplaod"
                    className="hidden"
                    multiple
                    onChange={(e) => fileHandler(e)}
                  />
                </div>
                <button
                  className=" text-white py-2 px-4 rounded-md text-sm"
                  style={{ backgroundColor: "#5E5EE2" }}
                  onClick={createPost}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
