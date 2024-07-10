// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import Car from "@/models/Car";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const lessons = await Lesson.find().sort({ createdAt: -1 });
    if (!lessons) {
      return NextResponse.json(
        {
          status: false,
          message: "No Lessons found.",
        },
        { status: 500 }
      );
    }

    const data = [];

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const application = await Application.findById(lesson.application);
      const course = await Course.findById(application.course);
      const student = await User.findById(application.user);
      const instructor = await User.findById(lesson.instructor);
      const car = await Car.findById(lesson.car);

      data.push({
        id: lesson._id,
        date: lesson.date,
        status: lesson.status,
        course,
        student: { id: student._id, name: student.name, email: student.email },
        instructor: {
          id: instructor._id,
          name: instructor.name,
          email: instructor.email,
        },
        car,
      });
    }

    return NextResponse.json({ lessons: data }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error fetching Lessons",
    });
  }
}
