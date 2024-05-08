import mongoose from "mongoose";
import { Anybody } from "next/font/google";

const Type = {
  _id: { type: String, required: true },
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
};

const createNotificationSchema = new mongoose.Schema(
  {
    notificationFrom: {
      type: Type,
      required: true,
    },
    notificationOF: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", createNotificationSchema);
export default Notification;
