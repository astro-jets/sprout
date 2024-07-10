// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const courses = await Course.find();
    if (!courses) {
      return NextResponse.json(
        {
          status: false,
          message: "No courses found.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ courses }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error fetching course",
    });
  }
}
