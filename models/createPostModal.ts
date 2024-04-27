import mongoose from "mongoose";

const createPostSchema = new mongoose.Schema(
  {
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: [true, "Write Something"],
    },
    assets: {
      type: Array<{ id: string; url: string; type: string }[]>,
      required: [true, "Assets Needed"],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", createPostSchema);
export default Post;
