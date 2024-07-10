// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, price, list } = await req.json();

    const newService = new Service({
      name,
      price,
      list,
    });

    const exists = await Service.findOne({ name });
    if (exists) {
      return NextResponse.json(
        {
          status: false,
          message: "This service is already registered.",
        },
        { status: 500 }
      );
    }
    const service = await newService.save();
    if (service) {
      return NextResponse.json(
        {
          status: true,
          message: `Service ${service.name} has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating service",
    });
  }
}
