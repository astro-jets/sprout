"use server";

import { CourseProps } from "@/types/course";

export const getcourses = async (): Promise<
  { course: CourseProps[] } | any
> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/courses/all/`);
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
