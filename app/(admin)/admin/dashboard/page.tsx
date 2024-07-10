import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getUsers } from "@/app/actions/users";
import { getAdminStats } from "@/app/actions/action";

export const metadata: Metadata = {
  title: "Quick Pass Admin",
  description: "This is the dashboard",
};
type userType = {
  id: string; name: string; email: string; role: string
}[]
type dataProps = {
  students: string, instructors: string
}

export default async function Home() {
  // Get users
  const res = await getAdminStats();
  const data = res.stats;

  return (
    <>
      <DefaultLayout>
        <ECommerce data={data} />
      </DefaultLayout>
    </>
  );
}
