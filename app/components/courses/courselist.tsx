"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "./coursecard"; // Assuming this component accepts course & mentorInfo props
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { AlertCircle } from "lucide-react";
import { Course, Mentor } from "@/lib/types/type";

type Category = {
  id: string;
  category: string;
};

const CourseList = ({ type }: { type?: string }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const categoriesSnapshot = await getDocs(
          collection(database, "categories")
        );
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, "id">),
        }));
        setCategories(categoriesData);

        // Fetch courses
        const coursesSnapshot = await getDocs(collection(database, "courses"));
        const coursesData = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Course, "id">),
        }));
        setCourses(coursesData);

        // Fetch mentors
        const mentorsSnapshot = await getDocs(collection(database, "mentors"));
        const mentorsData = mentorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Mentor, "id">),
        }));
        setMentors(mentorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  console.log(categories);
  // Clean and normalize type for comparison
  // Normalize function: trim, lowercase, remove special chars
  const normalizeString = (str: string) =>
    str
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const selectedCategory = categories.find(
    (cat) => normalizeString(cat.category) === type
  );

  console.log(selectedCategory);
  // Filter courses if category type exists, else show all courses
  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.categoryId === selectedCategory.id)
    : courses;

  console.log(filteredCourses);
  const getMentor = (userId: string) => mentors.find((m) => m.id === userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {filteredCourses.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center p-10 text-gray-500">
          <AlertCircle className="w-16 h-16 mb-4" />
          <p className="text-xl font-semibold">No courses available</p>
        </div>
      ) : (
        filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            mentorInfo={getMentor(course.userId)}
          />
        ))
      )}
    </div>
  );
};

export default CourseList;
