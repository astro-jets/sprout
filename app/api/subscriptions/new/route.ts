// pages/api/Subscription.ts
import dbConnect from "@/lib/db";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { user, service } = await req.json();

    const newSubscription = new Subscription({ user, service });
    const subscription = await newSubscription.save();

    if (subscription) {
      return NextResponse.json(
        {
          status: true,
          message: `Subscription has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating subscription",
    });
  }
}
