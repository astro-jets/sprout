// api/claims/new
import dbConnect from "@/lib/db";
import Claim from "@/models/Claim";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const claimId = searchParams.get("claim");

    const updateData = { $set: { status: status } };

    const updatedClaim = await Claim.findOneAndUpdate(
      { _id: claimId },
      updateData
    );

    if (!updatedClaim) {
      return NextResponse.json(
        {
          message: `Failed to update claim with ID "${claimId}"`,
        },
        { status: 409 } // Conflict
      );
    }

    console.log("Updated Claim => ", updatedClaim);
    const user = updatedClaim.user;
    const title = `Claim ${status}`;
    const description = `Your claim ${updatedClaim.title} has been ${status}.`;

    const notification = new Notification({
      user,
      title,
      description,
    });
    const newNotification = await notification.save();
    console.log("New Notification => ", newNotification);

    return NextResponse.json(
      {
        message: `Claim ${status} successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error updating claim",
    });
  }
}
