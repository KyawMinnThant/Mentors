"use client";

import { Course, Mentor } from "@/lib/types/type";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

type CourseCardProps = {
  course: Course;
  mentorInfo?: Mentor;
};

const CourseCard: React.FC<CourseCardProps> = ({ course, mentorInfo }) => {
  return (
    <motion.div
      className="bg-white w-full rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img
        src={course.course_img}
        alt={course.title}
        className="w-full h-40 object-cover"
        loading="lazy"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{course.title}</h2>
        <p className="text-xs bg-gray-600 text-white w-fit mb-5 px-3 rounded-full">
          {course.level}
        </p>

        <p className="text-gray-600 text-sm mb-3 flex-grow">
          {course.description.slice(0, 100)}...
        </p>

        <div className="flex items-center gap-3 mb-4">
          {/* Mentor info */}
          <div className="flex items-center gap-2">
            {mentorInfo?.img && (
              <img
                src={mentorInfo.img}
                className="w-[30px] h-[30px] rounded-full"
                alt={mentorInfo.name}
              />
            )}
            <div className="flex flex-col">
              <p className="text-gray-900 font-semibold">{mentorInfo?.name}</p>
              <p className="text-gray-600 text-xs">
                {mentorInfo?.specialization}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={`course-detail/${course.id}`}
          className="mt-auto bg-blue-700 text-white py-2 rounded-md hover:bg-blue-700 transition text-center"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
