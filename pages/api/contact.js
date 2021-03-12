import connectDB from "../../middleware/mongoDb";
import mongoose from "mongoose";
import Message from "../../models/messages";
const handler = async (req, res) => {
  if (req.method === "POST") {
    Message.create(req.body, (error, data) => {
      if (data) {
        res.status(200).redirect("/");
      } else {
        res.status(422).send("error_occured");
      }
    });
  } else {
    res.status(422).send("req_method_not_supported");
  }
};
export default connectDB(handler);
