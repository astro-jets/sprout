import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getUsersByType } from "@/app/actions/users";
import CoursesTable from "@/components/Tables/CoursesTable";
import NewCourse from "@/components/NewCourse/page";
import { getcourses } from "@/app/actions/courses";
import { CourseProps } from "@/types/course";

export const metadata: Metadata = {
    title: "Courses",
    description: "This is the instructors page",
};



const CoursesPage = async () => {
    const res = await getcourses();
    const courses: CourseProps[] = res.courses;
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Courses" />
            <NewCourse />

            <div className="flex flex-col gap-10">
                <CoursesTable courses={courses} />
            </div>
        </DefaultLayout>
    );
};

export default CoursesPage;
