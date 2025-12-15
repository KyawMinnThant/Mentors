"use client";

import {
  Timestamp,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "@/firebaseConfig";
import {
  MapPin,
  Briefcase,
  UserCheck,
  UserX,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import Breadcrumb from "../mentorlist/breadcrumb";
import { Course, Mentor } from "@/lib/types/type";

type BreadcrumbItem = {
  label: string;
  href?: string; // if no href, it's the current page
};
const MentorDetail = ({ mentorid }: { mentorid: string }) => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Mentorlist" },
  ];
  const [loading, setLoading] = useState(true);
  const [mentorDetail, setMentorDetail] = useState<Mentor | null>(null);

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseLoading, setCourseLoading] = useState(true);

  /* ---------- Fetch Mentor ---------- */
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const mentorRef = doc(database, "mentors", mentorid);
        const mentorSnap = await getDoc(mentorRef);

        if (mentorSnap.exists()) {
          setMentorDetail({
            id: mentorSnap.id,
            ...(mentorSnap.data() as Omit<Mentor, "id">),
          });
        }
      } catch (error) {
        console.error("Error fetching mentor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [mentorid]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(
          collection(database, "courses"),
          where("userId", "==", mentorid)
        );

        const snapshot = await getDocs(q);

        const courseList: Course[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Course, "id">),
        }));

        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourses();
  }, [mentorid]);

  if (loading)
    return (
      <div className="max-w-md p-6 bg-white rounded-xl shadow animate-pulse">
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
        <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
      </div>
    );

  if (!mentorDetail)
    return <p className="text-center text-gray-500">Mentor not found</p>;

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
      <div className="flex flex-col mb-10 md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <p className="font-semibold xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700">
          Mentor Profile
        </p>
        <Breadcrumb items={items} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/*  LEFT : Mentor */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex flex-col items-center">
              <img
                src={mentorDetail.img}
                alt={mentorDetail.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <h2 className="text-xl font-semibold text-white mt-4">
                {mentorDetail.name}
              </h2>
              <p className="text-blue-100 text-sm">Age: {mentorDetail.age}</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>{mentorDetail.specialization}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>{mentorDetail.location}</span>
              </div>

              <div
                className={`flex items-center gap-3 font-medium ${
                  mentorDetail.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {mentorDetail.isAvailable ? (
                  <UserCheck className="w-5 h-5" />
                ) : (
                  <UserX className="w-5 h-5" />
                )}
                {mentorDetail.isAvailable
                  ? "Available for mentoring"
                  : "Not available"}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT : Courses  */}
        <section className="lg:col-span-2">
          <h3 className="font-semibold xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 w-fit mb-5 border-blue-700">
            Courses by {mentorDetail.name}
          </h3>

          {courseLoading ? (
            <p className="text-gray-500">Loading courses...</p>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-xl shadow">
              <AlertCircle className="w-12 h-12 mb-3" />
              <p className="text-lg font-medium">
                No courses related to this mentor
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={course.course_img}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold text-lg line-clamp-1">
                      {course.title}
                    </h4>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.level}
                      </span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MentorDetail;
