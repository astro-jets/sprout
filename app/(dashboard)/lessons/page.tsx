import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

import { getlessons } from "@/app/actions/Lessons";
import { lesson } from "@/types/lessons";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";

export const metadata: Metadata = {
    title: "Customers | Lessons",
    description: "This is the cars page",
};

const LessonsPage = async () => {
    const session = await getServerSession(options);
    if (!session?.user) { return }

    const res = await getlessons();
    const data: lesson[] = res.lessons;
    const lessons = data.filter(lesson => lesson.student.id === session.user.id)

    return (
        <CustomerDashboard>
            <Breadcrumb pageName="Lessons" />
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </CustomerDashboard>
    );
};

export default LessonsPage;
