// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Course from "@/models/Course";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.formData();
    const file = data.get("file") as unknown as File;
    const description = data.get("description") as unknown as string;
    const price = data.get("price") as unknown as string;
    const name = data.get("name") as unknown as string;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pathToPublic = join(process.cwd(), "public", "uploads");
    const path = join(pathToPublic, file.name);
    await writeFile(path, buffer);

    console.log(`Open ${path} to view image`);

    const newCourse = new Course({
      name,
      price,
      description,
      path: file.name,
    });

    const exists = await Course.findOne({ name });
    if (exists) {
      return NextResponse.json(
        {
          status: false,
          message: "This course is already registered.",
        },
        { status: 500 }
      );
    }
    const course = await newCourse.save();
    if (course) {
      return NextResponse.json(
        {
          status: true,
          message: `Course ${course.name} has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating course",
    });
  }
}
