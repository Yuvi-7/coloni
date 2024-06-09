import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});

const Friend = mongoose.models.Friend || mongoose.model("Friend", friendSchema);
export default Friend;
