import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NewCar from "@/components/NewCar/page";
import { getCars } from "@/app/actions/cars";
import { CarProps } from "@/types/car";
import ServiceCard from "@/components/courses/serviceCard";

export const metadata: Metadata = {
    title: "Cars",
    description: "This is the cars page",
};

const CoursesPage = async () => {
    const res = await getCars();
    console.log(res)
    const cars: CarProps[] = res.Cars;
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Cars" />
            <NewCar />

            <div className=" flex-wrap gap-10 grid grid-cols-3">
                {
                    cars.map(car => (
                        <div className="w-full">
                            <div className="mb-9 rounded-[20px] bg-white shadow-2 hover:shadow-lg">
                                <div className="mb-8 overflow-hidden flex h-60 w-full items-center justify-center rounded-xl">
                                    <img className="object-cover w-full h-60" src={`/uploads/${car.path}`} alt="" />
                                </div>
                                <div className="flex flex-col px-4 py-2">
                                    <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
                                        {car.name}
                                    </h4>
                                    <p className="text-primary text-lg"> {car.plate}</p>
                                    <p className="text-dark-6">{car.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </DefaultLayout>
    );
};

export default CoursesPage;
