import connectDB from "../../middleware/mongoDb";
import Blog from "../../models/blogs";
const handler = async (req, res) => {
  await Blog.find({}, (error, data) => {
    array[0] = [data[0]];
    array[1] = data.slice(0, 9);
    array[2] = data.slice(0, 9);
    array[3] = data.slice(0, 9);
    array[4] = data.slice(0, 94);
    res.status(200).send(array);
  });
};
export default connectDB(handler);
