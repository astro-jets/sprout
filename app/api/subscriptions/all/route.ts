// pages/api/subscriptions.ts
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { NextResponse } from "next/server";

type subscriptionProps = {
  user: string;
  service: string;
}[];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user");

    await dbConnect();

    const subscriptions: subscriptionProps = await Subscription.find({
      user: userId,
    });
    if (!subscriptions) {
      return NextResponse.json(
        {
          status: false,
          message: "No subscriptions found.",
        },
        { status: 500 }
      );
    }

    const services: any = [];
    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];
      const service = await Service.findById(subscription.service);
      services.push(service);
    }
    return NextResponse.json({ services }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching subscription ${error}`,
    });
  }
}
