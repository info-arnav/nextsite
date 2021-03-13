import connectDB from "../../../middleware/mongoDb";
import Blog from "../../../models/blogs";
import User from "../../../models/user";

const handler = async (req, res) => {
  if (req.method === "POST") {
    Blog.update(
      { _id: req.body.post },
      { $addToSet: { views: req.body.user } }
    );
    User.update(
      { username: req.body.user },
      { $addToSet: { views: req.body.post } }
    );
  } else {
    res.status(422).send("error");
  }
};
export default connectDB(handler);
