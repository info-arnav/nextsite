import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  email: String,
  message: String,
});

const Message = mongoose.model("messageSchema", messageSchema);

export default Message;
