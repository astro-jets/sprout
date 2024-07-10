import { getcourses } from "@/app/actions/courses";
import { CourseProps } from "@/types/course";
import ServiceCard from "./serviceCard";

const CoursesComponent = async () => {
    const res = await getcourses();
    const courses: CourseProps[] = res.courses;

    return (
        <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                            <span className="mb-2 block text-lg font-semibold text-primary">
                                Our Courses
                            </span>
                            <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                                What We Offer
                            </h2>
                            <p className="text-base text-body-color dark:text-dark-6">
                                There are many variations of passages of Lorem Ipsum available
                                but the majority have suffered alteration in some form.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-mx-4 flex flex-wrap">
                    {
                        courses?.map(course => (
                            <ServiceCard
                                id={course._id as string}
                                title={course.name}
                                price={course.price.toLocaleString()}
                                details={course.description}
                                icon={
                                    <img
                                        src={`/uploads/${course.path}`}
                                    />
                                }
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
export default CoursesComponent;