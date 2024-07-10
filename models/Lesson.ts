// models/Lesson.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const LessonSchema = new Schema(
  {
    car: {
      type: String,
    },
    instructor: {
      type: String,
    },
    application: {
      type: String,
    },
    date: {
      type: String,
    },
    status: {
      type: String,
      default: "progressing",
    },
  },
  { timestamps: true }
);

const Lesson = mongoose.models.Lesson || model("Lesson", LessonSchema);

export default Lesson;
