import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NewInstructor from "@/components/NewInstructor/page";
import { getUsersByType } from "@/app/actions/users";
import InstructorsTable from "@/components/Tables/InstructorsTable";

export const metadata: Metadata = {
    title: "Instructors",
    description: "This is the instructors page",
};

type instructorsType = {
    id: string, name: string, email: string, role: string
}[]

const InstructorsPage = async () => {
    const users = await getUsersByType('instructor')
    const instructors: instructorsType = users.usersData;
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Instructors" />
            <NewInstructor />

            <div className="flex flex-col gap-10">
                <InstructorsTable instructors={instructors} />
            </div>
        </DefaultLayout>
    );
};

export default InstructorsPage;
