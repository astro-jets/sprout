// models/Car.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CarSchema = new Schema({
  name: { type: String, required: true },
  plate: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
  status: { type: String, default: "available" },
});

const Car = mongoose.models.Car || model("Car", CarSchema);

export default Car;
