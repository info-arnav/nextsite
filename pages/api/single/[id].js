import connectDB from "../../../middleware/mongoDb";
import Blog from "../../../models/blogs";

const postData = async (req, res) => {
  const { id } = req.query;
  Blog.findOne({ _id: id }, (error, data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(422).send("error");
    }
  });
};
export default connectDB(postData);
