import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: String,
  },
  { collection: "modules" }
);
export default schema;