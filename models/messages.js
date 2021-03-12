import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  email: String,
  message: String,
});

const Message = mongoose.model("messageSchema", messageSchema);

module.exports = mongoose.models.messageSchema || Message;
