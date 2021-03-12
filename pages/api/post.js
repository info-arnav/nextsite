import connectDB from "../../middleware/mongoDb";
import mongoose from "mongoose";
import Blog from "../../models/blogs";
import jwts from "jwt-simple";
import User from "../../models/user";

const handler = async (req, res) => {
  if (req.method === "POST") {
    Blog.create(req.body, (error, data) => {
      if (data) {
        User.update(
          { username: req.body.username },
          { $addToSet: { posts: data } },
          (error2, data2) => {
            if (data2) {
              res
                .status(200)
                .json(`/article/${data.username}/${data.title}/${data._id}`);
            } else {
              res.status(422).send("error_occured");
            }
          }
        );
      } else {
        res.status(422).send("error_occured");
      }
    });
  } else {
    res.status(422).send("error");
  }
};
export default connectDB(handler);
