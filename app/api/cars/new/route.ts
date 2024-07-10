// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Car from "@/models/Car";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.formData();
    const file = data.get("file") as unknown as File;
    const description = data.get("description") as unknown as string;
    const plate = data.get("plate") as unknown as string;
    const name = data.get("name") as unknown as string;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pathToPublic = join(process.cwd(), "public", "uploads");
    const path = join(pathToPublic, file.name);
    await writeFile(path, buffer);

    console.log(`Open ${path} to view image`);

    const newCar = new Car({
      name,
      plate,
      description,
      path: file.name,
    });

    const exists = await Car.findOne({ name });
    if (exists) {
      return NextResponse.json(
        {
          status: false,
          message: "This Car is already registered.",
        },
        { status: 500 }
      );
    }
    const car = await newCar.save();
    if (Car) {
      return NextResponse.json(
        {
          status: true,
          message: `Car ${Car.name} has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating Car",
    });
  }
}
