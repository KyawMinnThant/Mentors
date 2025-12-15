import CourseDetail from "@/app/components/courses/coursedetail";
import Breadcrumb from "@/app/components/mentorlist/breadcrumb";
import { BreadcrumbItem } from "@/lib/types/type";
import React from "react";

type courseParams = {
  params: Promise<{ id: string }>;
};

const CourseDetailSection: React.FC<courseParams> = async ({ params }) => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/course" },
    { label: "Course Detail" },
  ];
  const { id } = await params;
  console.log(id);
  return (
    <div className="flex flex-col max-w-5xl mx-auto gap-2 mt-[100px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="font-semibold xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700 pb-2">
          Course Detail
        </h1>
        <Breadcrumb items={items} />
      </div>

      <CourseDetail id={id} />
    </div>
  );
};

export default CourseDetailSection;
