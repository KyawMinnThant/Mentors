import React from "react";
import Breadcrumb from "../../components/mentorlist/breadcrumb";
import { Button } from "@/components/ui/button"; // Assuming you have this Button component
import Link from "next/link";
import { BreadcrumbItem } from "@/lib/types/type";

const FindMentor = () => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "How to find a mentor" },
  ];

  return (
    <main className="font-dmsans px-4 md:px-10 lg:px-[125px] mt-[120px] mb-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="font-semibold xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700 pb-2">
          How To Find A Mentor
        </h1>
        <Breadcrumb items={items} />
      </div>

      <section className="mt-6 text-gray-700 space-y-6 leading-relaxed text-justify">
        <p>
          Finding the right mentor can be a transformative step in your personal
          and professional growth. A mentor offers guidance, shares valuable
          insights from their experience, and supports you in navigating
          challenges and opportunities.
        </p>
        <p>
          To begin your search, consider what areas you want to develop or
          improve—whether it’s career advancement, skill building, or gaining
          clarity in your goals. Look for mentors who have expertise in those
          fields and a willingness to invest time in your growth.
        </p>
        <p>
          Online platforms and communities have made connecting with mentors
          easier than ever before. By joining mentoring programs or platforms,
          you can access a wide network of professionals ready to share their
          knowledge. Remember, building a meaningful mentor-mentee relationship
          takes openness, respect, and regular communication.
        </p>
        <p>
          If you're ready to start this exciting journey, browse through our
          comprehensive list of mentors available to help you achieve your
          goals. Each mentor profile includes their areas of expertise,
          availability, and ratings from mentees.
        </p>
      </section>

      <div className="mt-8 flex justify-center md:justify-start">
        <Link href="/mentor-list">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition">
            View Mentor List
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default FindMentor;
