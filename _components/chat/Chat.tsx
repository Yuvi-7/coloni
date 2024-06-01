import React, { useEffect, useRef, useState } from "react";
import chat from "../../public/assets/icons/chat.png";
import { Avatar, Button, Popover, Typography } from "@mui/material";
import Image from "next/image";
import ChatBox from "./ChatBox";

interface Props {
  toggleChat: Boolean;
  setToggleChat?: (value: boolean) => void;
}

const Chat = ({ toggleChat, setToggleChat }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLLIElement | null>(null);
  const el = useRef(null);

  useEffect(() => {
    if (toggleChat) {
      setAnchorEl(el.current);
    } else {
      setAnchorEl(null);
    }
  }, [toggleChat]);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setToggleChat && setToggleChat(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Avatar
        sx={{ width: 40, height: 40 }}
        onClick={(e) => handleClick(e)}
        ref={el}
        className="bg-white cursor-pointer !min-w-0 !p-0 !m-0 absolute right-8 bottom-12"
      >
        <Image src={chat} alt="chat-icon" width={24} />
      </Avatar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            style: {
              marginTop: "-10px",
              right: "2rem",
            },
          },
        }}
      >
        <ChatBox />
      </Popover>
    </div>
  );
};

export default Chat;
