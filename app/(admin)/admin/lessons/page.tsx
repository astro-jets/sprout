import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NewCar from "@/components/NewCar/page";
import { getCars } from "@/app/actions/cars";
import { CarProps } from "@/types/car";
import { getlessons } from "@/app/actions/Lessons";
import { lesson } from "@/types/lessons";
import CompleteBtn from "./completeBtn";

export const metadata: Metadata = {
    title: "Cars",
    description: "This is the cars page",
};

const LessonsPage = async () => {
    const res = await getlessons();
    const lessons: lesson[] = res.lessons;
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Lessons" />

            {/* <div className="flex flex-wrap gap-10">
                {
                    lessons.map(l => (
                        <div className="">
                            <p>{l.car.name}</p>
                            <p>{l.lesson.name}</p>
                            <p>K {l.lesson.price}</p>
                            <p>{l.student.name}</p>
                            <p>{l.lesson.email}</p>
                            <p>{l.date}</p>
                            <p>{l.status}</p>
                        </div>
                    ))
                }
            </div> */}

            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left">
                                <th className=" px-4 py-4 font-medium text-black xl:pl-11">
                                    Student
                                </th>
                                <th className=" px-4 py-4 font-medium text-black">
                                    Instructor
                                </th>

                                <th className="px-4 py-4 font-medium text-black">
                                    Course
                                </th>
                                <th className="px-4 py-4 font-medium text-black">
                                    Car
                                </th>
                                <th className="px-4 py-4 font-medium text-black">
                                    Date
                                </th>
                                <th className="px-4 py-4 font-medium text-black">
                                    status
                                </th>
                                <th className="px-4 py-4 font-medium text-black">
                                    Completed
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((lesson) => (
                                <tr key={lesson.id}>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black">
                                            {lesson.student.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black">
                                            {lesson.instructor.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black">
                                            {lesson.course.name}
                                        </h5>
                                        <p className="text-sm">Cost: K {lesson.course.price}</p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black">
                                            {lesson.car.name}
                                        </h5>
                                        <p className="text-sm">Number plate: {lesson.car.plate}</p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black">
                                            {lesson.date}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black">
                                            {lesson.status}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            {/* Completed */}
                                            <CompleteBtn id={lesson.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default LessonsPage;
