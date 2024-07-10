// api/claims/new
import dbConnect from "@/lib/db";
import Claim from "@/models/Claim";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title, description, user, subscription } = await req.json();

    const newClaim = new Claim({
      title,
      description,
      user,
      subscription,
    });

    const service = await newClaim.save();
    if (service) {
      return NextResponse.json(
        {
          status: true,
          message: `Claim ${service.title} has been created successfully!`,
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
