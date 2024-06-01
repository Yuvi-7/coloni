"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineLogout } from "react-icons/md";
import { useSession } from "next-auth/react";
import { fetchNotifications } from "@/lib/redux/features/notifications/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Notification from "./Notification";

const RightMenu = () => {
  const notifications = useAppSelector((state) => state.notification);
  const [anchorEl, setAnchorEl] = useState({
    notification: null,
    profile: null,
  });
  const session = useSession()?.data;
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl.notification);
  const openProfile = Boolean(anchorEl.profile);

  useEffect(() => {
    session?.user?.id && dispatch(fetchNotifications(session?.user?.id));
  }, [session]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
    setAnchorEl({ ...anchorEl, [type]: event.currentTarget });
  };

  const handleClose = (type: string) => {
    setAnchorEl({ ...anchorEl, [type]: null });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
              <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Notification">
          <IconButton
            onClick={(e) => handleClick(e, "notification")}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "notifications" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="notification relative">
              <div className="absolute right-[7px] top-[4px] z-10 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">3</span>
              </div>
              <div className="bell-container z-0">
                <div className="bell"></div>
              </div>
            </div>
          </IconButton>
        </Tooltip>

        <Tooltip title="Account settings">
          <IconButton
            onClick={(e) => handleClick(e, "profile")}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl.notification}
        id="notifications"
        open={open}
        onClose={() => handleClose("notification")}
        onClick={() => handleClose("notification")}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            style: {
              width: "400px",
            },
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,

              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                backgroundColor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <h5 className="px-3 pb-2 font-medium">Notifications</h5>
        <hr />

        {notifications?.notifications?.length === 0 && (
          <p className="text-center text-gray-400">No Notifications Yet</p>
        )}

        <MenuItem
          onClick={() => handleClose("notification")}
          style={{ flexDirection: "column" }}
        >
          {notifications?.notifications?.map((notification) => (
            <div
              className="w-full my-2"
              key={`Notification${notification?._id}`}
            >
              <Notification notification={notification} />
            </div>
          ))}
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl.profile}
        id="account-menu"
        open={openProfile}
        onClose={() => handleClose("profile")}
        onClick={() => handleClose("profile")}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                backgroundColor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <MenuItem onClick={() => handleClose("profile")}>
          <ListItemIcon>
            <MdOutlineLogout size={20} />
          </ListItemIcon>
          Logout 
        </MenuItem>
      </Menu>
    </>
  );
};

export default RightMenu;
