import connectDB from "../../../middleware/mongoDb";
import mongoose from "mongoose";
import Blog from "../../../models/blogs";
import jwts from "jwt-simple";
import User from "../../../models/user";
import { useRouter } from "next/router";

const postData = async (req, res) => {
  if (req.method === "POST") {
    Blog.findOne({ _id: req.body.id }, (error, data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(422).send("error");
      }
    });
  } else {
    res.status(422).send("error");
  }
};
export default connectDB(postData);
