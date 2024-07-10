// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Car from "@/models/Car";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const Cars = await Car.find();
    if (!Cars) {
      return NextResponse.json(
        {
          status: false,
          message: "No Cars found.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ Cars }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error fetching Car",
    });
  }
}
