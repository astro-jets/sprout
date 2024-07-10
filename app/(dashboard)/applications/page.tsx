import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
import { getApplicationByUser } from "@/app/actions/Applications";
import { ApplicationProps } from "@/types/application";

export const metadata: Metadata = {
    title: "Customers | Applications",
    description: "This is the applications page",
};

const applicationsPage = async () => {
    const session = await getServerSession(options);
    if (!session?.user) { return }

    const res = await getApplicationByUser(session.user.id);
    console.log("Application => ", res)
    const applications: ApplicationProps[] = res.application;

    return (
        <CustomerDashboard>
            <Breadcrumb pageName="applications" />
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left">
                                <th className=" px-4 py-4 font-medium text-black xl:pl-11">
                                    Student
                                </th>
                                <th className="px-4 py-4 font-medium text-black">
                                    Course
                                </th>
                                <th className="px-4 py-4 font-medium text-black">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications?.map((application) => (
                                <tr key={application.id}>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black">
                                            {application.user.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black">
                                            {application.course.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black">Cost: K {application.course.price}</h5>
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

export default applicationsPage;
