// api/lessons/new
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Notification from "@/models/Notification";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const lessonId = searchParams.get("lesson");

    const updateData = { $set: { status: status } };

    const updatedLesson = await Lesson.findOneAndUpdate(
      { _id: lessonId },
      updateData
    );

    if (!updatedLesson) {
      return NextResponse.json(
        {
          status: false,
          message: `Failed to update lesson with ID "${lessonId}"`,
        },
        { status: 409 } // Conflict
      );
    }

    const application = await Application.findById(updatedLesson.application);

    console.log("Updated Lesson => ", updatedLesson);
    const user = await User.findById(application.user);
    const course = await Course.findById(application.course);
    const date = updatedLesson.date;
    const message = `Congratulations, your lessons for ${course.name} are now ${status}.`;
    const notification = new Notification({
      user: user._id,
      date,
      message,
    });
    const newNotification = await notification.save();
    console.log("New Notification => ", newNotification);

    return NextResponse.json(
      {
        status: true,
        message: `Lesson ${status} successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error updating lesson",
    });
  }
}
