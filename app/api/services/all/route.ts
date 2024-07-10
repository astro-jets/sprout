// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const services = await Service.find();
    if (!services) {
      return NextResponse.json(
        {
          status: false,
          message: "No services found.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ services }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error fetching service",
    });
  }
}
