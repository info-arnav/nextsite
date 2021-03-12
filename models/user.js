import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  userdp: String,
  email: String,
  verified: { type: Boolean, default: false },
  date: { type: String, default: new Date() },
  ddate: {
    type: String,
    default: `${String(new Date().getMonth() + 1)}-${String(
      new Date().getDate()
    )}-${new Date().getFullYear()}`,
  },
  posts: { type: Array, default: [] },
  bookmarks: { type: Array, default: [] },
  views: { type: Array, default: [] },
  likes: { type: Array, default: [] },
});

const User = mongoose.model("userSchema", userSchema);

module.exports = mongoose.models.userSchema || User;
