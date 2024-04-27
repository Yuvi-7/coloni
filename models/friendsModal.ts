import mongoose from "mongoose";

const Type = {
  _id: { type: String, required: true },
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
};

const friendSchema = new mongoose.Schema(
  {
    from_user: {
      type: Type,
      required: true,
    },
    to_user: { type: Type, required: true },
    status: String,
  },
  { timestamps: true }
);

const Friend = mongoose.models.Friend || mongoose.model("Friend", friendSchema);
export default Friend;
