import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: String, 
    course: String,
    description: String,
    points: Number, 
    dueDate: Date, 
    availableDate: Date,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
