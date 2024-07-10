// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Car from "@/models/Car";
import { NextResponse } from "next/server";
import Application from "@/models/Application";
import Course from "@/models/Course";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const studentsCount = await User.countDocuments({ role: "user" });
    const instructorsCount = await User.countDocuments({ role: "instructor" });
    const carsCount = await Car.countDocuments();
    const applications = await Application.find();

    let paymentsCount = 0;
    for (let i = 0; i < applications.length; i++) {
      const application = applications[i];
      const course = await Course.findById(application.course);
      paymentsCount += parseInt(course.price as string);
    }
    const stats = {
      students: studentsCount,
      instructors: instructorsCount,
      cars: carsCount,
      payments: paymentsCount,
    };

    return NextResponse.json({ stats }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching User ${error}`,
    });
  }
}
