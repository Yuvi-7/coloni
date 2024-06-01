import mongoose from "mongoose";

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
      type: Type,
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
