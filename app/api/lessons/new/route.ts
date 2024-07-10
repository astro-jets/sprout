// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Notification from "@/models/Notification";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { car, instructor, application, date } = await req.json();
    const newLesson = new Lesson({
      car: car,
      instructor: instructor,
      application: application,
      date: date,
    });

    const exists = await Lesson.find({ application });
    if (exists.length) {
      return NextResponse.json(
        {
          status: false,
          message: "This Lesson is already registered.",
        },
        { status: 500 }
      );
    }
    const lesson = await newLesson.save();
    if (lesson) {
      // Get the current application
      const currentApplication = await Application.findById(application);

      // Update the application status
      const updateData = { $set: { status: "approved" } };
      await Application.findOneAndUpdate(
        { _id: currentApplication._id },
        updateData
      );

      // Create a new notification
      const user = await User.findById(currentApplication.user);
      const course = await Course.findById(currentApplication.course);
      const title = `Application approved.`;
      const message = `Your application for the course ${course.name} has been accepted and your lessons will start on ${date}.`;
      const notification = new Notification({
        user: user._id,
        date,
        title,
        message,
      });
      const newNotification = await notification.save();
      return NextResponse.json(
        {
          status: true,
          title: title,
          message: `Your application for the course ${course.name} has been accepted and your lessons will start on ${date}.`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating Lesson",
    });
  }
}
