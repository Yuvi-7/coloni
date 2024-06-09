import mongoose, { Schema } from "mongoose";
import Friend from "./friendsModal";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add the full name"],
    },

    username: {
      type: String,
      required: [true, "Please add the username"],
      unique: [true, "username already taken"],
    },

    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },

    password: {
      type: String,
      required: [true, "Please add the user password"],
    },

    friends: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        fullname: {
          type: String,
        },
        username: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
