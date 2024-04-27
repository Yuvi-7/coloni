import mongoose, { Schema } from "mongoose";

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

    // pending_friend_req: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [false],
    // },

    // friends: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [false],
    // },

    // sent_friend_req: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [false],
    // },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
