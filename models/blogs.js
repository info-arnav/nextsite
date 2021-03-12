import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  username: String,
  tags: String,
  userdp: String,
  date: { type: String, default: new Date() },
  ddate: {
    type: String,
    default: `${String(new Date().getMonth() + 1)}-${String(
      new Date().getDate()
    )}-${new Date().getFullYear()}`,
  },
  image: String,
  blog: String,
  title: String,
  likes: { type: Array, default: [] },
  bookmarks: { type: Array, default: [] },
  views: { type: Array, default: [] },
  comments: { type: Array, default: [] },
});

const Blog = mongoose.model("blogSchema", blogSchema);

module.exports = mongoose.models.BlogSchema || Blog;
