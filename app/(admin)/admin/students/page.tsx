import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getUsersByType } from "@/app/actions/users";
import InstructorsTable from "@/components/Tables/InstructorsTable";

export const metadata: Metadata = {
    title: "Students",
    description: "This is the students page",
};


type instructorsType = {
    id: string, name: string, email: string, role: string
}[]

const StudentsPage = async () => {
    const users = await getUsersByType('user')
    const students: instructorsType = users.usersData;

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Students" />

            <div className="flex flex-col gap-10">
                <InstructorsTable instructors={students} />
            </div>
        </DefaultLayout>
    );
};

export default StudentsPage;
