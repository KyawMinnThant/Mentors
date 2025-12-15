"use client";

import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { database, auth } from "@/firebaseConfig";
import { Button } from "@/components/ui/button";
import MentorCardSkeleton from "@/app/loading";
import { Course, Mentor } from "@/lib/types/type";

type Category = {
  category: string;
};

type Enrollment = {
  id: string;
  userId: string;
  courseId: string;
  mentorId: string;
  enrolledAt: any;
};

type Props = {
  id: string;
};

const CourseDetail: React.FC<Props> = ({ id }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const user = auth.currentUser;

  // Fetch course, category, mentor and user enrollments
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setEnrollments([]);

      try {
        // Fetch course
        const courseSnap = await getDoc(doc(database, "courses", id));
        if (!courseSnap.exists()) {
          setError("Course not found");
          setLoading(false);
          return;
        }
        const courseData = courseSnap.data() as Course;
        setCourse(courseData);

        // Fetch category
        const categorySnap = await getDoc(
          doc(database, "categories", courseData.categoryId)
        );
        setCategory(
          categorySnap.exists() ? (categorySnap.data() as Category) : null
        );

        // Fetch mentor
        const mentorSnap = await getDoc(
          doc(database, "mentors", courseData.userId)
        );
        setMentor(mentorSnap.exists() ? (mentorSnap.data() as Mentor) : null);

        // Fetch user enrollments
        if (user) {
          const enrollmentQuery = query(
            collection(database, "enrollments"),
            where("userId", "==", user.uid)
          );
          const enrollmentSnap = await getDocs(enrollmentQuery);
          const enrollmentList: Enrollment[] = enrollmentSnap.docs.map(
            (doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<Enrollment, "id">),
            })
          );
          setEnrollments(enrollmentList);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  // Enroll user and refresh enrollments
  const handleEnroll = async () => {
    if (!user) {
      alert("Please login to enroll");
      return;
    }
    if (!course) return;

    setEnrollLoading(true);
    try {
      await addDoc(collection(database, "enrollments"), {
        userId: user.uid,
        courseId: id,
        mentorId: course.userId,
        enrolledAt: serverTimestamp(),
      });

      // Refresh enrollments after enrolling
      const enrollmentQuery = query(
        collection(database, "enrollments"),
        where("userId", "==", user.uid)
      );
      const enrollmentSnap = await getDocs(enrollmentQuery);
      const enrollmentList: Enrollment[] = enrollmentSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Enrollment, "id">),
      }));
      setEnrollments(enrollmentList);
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading) return <MentorCardSkeleton />;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!course) return null;

  // Check if current course id is in user's enrollments
  const isEnrolled = enrollments.some((enroll) => enroll.courseId === id);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Image */}
      <div>
        <img
          src={course.course_img}
          alt={course.title}
          className="w-full h-full object-contain rounded"
        />
      </div>

      {/* Content */}
      <div className="md:col-span-2 flex flex-col">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

        {mentor && (
          <div className="flex items-center gap-3 mb-6">
            <img
              src={mentor.img}
              alt={mentor.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="font-semibold">
              {mentor.name}{" "}
              <span className="text-gray-600 text-sm">
                ({mentor.specialization})
              </span>
            </p>
          </div>
        )}

        <p className="text-gray-700 mb-6">{course.description}</p>

        <ul className="text-gray-600 space-y-2 mb-6">
          <li>
            <strong>Duration:</strong> {course.duration}
          </li>
          <li>
            <strong>Level:</strong> {course.level}
          </li>
          {category && (
            <li>
              <strong>Category:</strong> {category.category}
            </li>
          )}
        </ul>

        <Button
          onClick={handleEnroll}
          disabled={!user || isEnrolled || enrollLoading}
          className="bg-blue-700 hover:bg-blue-800 w-full md:w-fit"
        >
          {!user
            ? "Login to Enroll"
            : isEnrolled
            ? "Already Enrolled"
            : enrollLoading
            ? "Enrolling..."
            : "Enroll"}
        </Button>
      </div>
    </div>
  );
};

export default CourseDetail;
