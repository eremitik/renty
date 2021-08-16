import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postItem = mongoose.model("postItem", postSchema);

export default postItem;