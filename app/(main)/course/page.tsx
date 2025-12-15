import React from "react";

import { BreadcrumbItem } from "@/lib/types/type";
import Breadcrumb from "@/app/components/mentorlist/breadcrumb";
import CourseList from "@/app/components/courses/courselist";

type CourseParams = {
  searchParams: Promise<{
    type: string;
  }>;
};

const Course = async ({ searchParams }: CourseParams) => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Courses" },
  ];
  const { type } = await searchParams;
  console.log("Course type:", type);

  return (
    <main className="px-4 md:px-10 mt-[120px] mb-10 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="font-semibold flex gap-2 xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700 pb-2">
          Courses:{" "}
          <p className=" uppercase text-blue-700">
            {" "}
            {type ? type : "All Courses"}{" "}
          </p>
        </h1>
        <Breadcrumb items={items} />
      </div>

      <CourseList type={type} />
    </main>
  );
};

export default Course;
