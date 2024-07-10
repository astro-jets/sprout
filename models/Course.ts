// models/Course.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
});

const Course = mongoose.models.Course || model("Course", CourseSchema);

export default Course;
