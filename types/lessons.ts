import { CarProps } from "./car";
import { CourseProps } from "./course";
import { userProps } from "./user";

export type lesson = {
  id: string;
  car: CarProps;
  course: CourseProps;
  instructor: userProps;
  student: userProps;
  date: string;
  status: string;
};
