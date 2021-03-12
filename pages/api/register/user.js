import connectDB from "../../../middleware/mongoDb";
import mongoose from "mongoose";
//if (req.method === 'POST') {
//res.status(422).send("req_method_not_supported");
const handler = async (req, res) => {
  testModal.findOne({}, (e, d) => res.status(200).json(d));
};

export default connectDB(handler);
