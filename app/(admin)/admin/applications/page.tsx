import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ApplicationsTable from "@/components/Tables/ApplicationsTable";
import { getcourses } from "@/app/actions/courses";
import { CourseProps } from "@/types/course";
import { getApplications } from "@/app/actions/Applications";
import { getCars } from "@/app/actions/cars";
import { getUsers } from "@/app/actions/users";
import { userProps } from "@/types/user";
import { CarProps } from "@/types/car";

export const metadata: Metadata = {
    title: "Applications",
    description: "Applications page",
};





const Applications = async () => {
    const res = await getApplications();
    const applications = res.applications;
    const usersreq = await getUsers();
    const users: userProps[] = usersreq.usersData;
    const instructors = users.filter(user => user.role == 'instructor')
    const carsReq = await getCars();
    const cars: CarProps[] = carsReq.Cars;
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Applications" />

            <div className="flex flex-col gap-10">
                <ApplicationsTable applications={applications} instructors={instructors} cars={cars} />
            </div>
        </DefaultLayout>
    );
};

export default Applications;
