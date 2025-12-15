"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { database, auth } from "@/firebaseConfig"; // Adjust imports
import { onAuthStateChanged } from "firebase/auth";
import CourseCard from "../courses/coursecard";
import { Course, Mentor } from "@/lib/types/type";
import { motion } from "framer-motion";

type Enrollment = {
  id: string;
  courseId: string;
  userId: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ProfileCourse: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<
    Array<{ course: Course; mentor: Mentor }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        // Query enrollments for this user
        const enrollmentsRef = collection(database, "enrollments");
        const q = query(enrollmentsRef, where("userId", "==", user.uid));
        const enrollmentSnap = await getDocs(q);

        const coursesWithMentors = await Promise.all(
          enrollmentSnap.docs.map(async (docSnap) => {
            const enrollment = docSnap.data() as Enrollment;
            // Get course data
            const courseRef = doc(database, "courses", enrollment.courseId);
            const courseSnap = await getDoc(courseRef);
            if (!courseSnap.exists()) return null;
            const courseData = {
              id: courseSnap.id,
              ...(courseSnap.data() as Course as Omit<Course, "id">),
            };

            // Get mentor data
            const mentorRef = doc(database, "mentors", courseData.userId);
            const mentorSnap = await getDoc(mentorRef);
            let mentorData = {};
            if (mentorSnap.exists()) {
              mentorData = {
                id: mentorSnap.id,
                ...(mentorSnap.data() as Mentor as Omit<Mentor, "id">),
              };
            }

            return { course: courseData, mentor: mentorData };
          })
        );

        setEnrolledCourses(coursesWithMentors.filter(Boolean) as any);
        setLoading(false);
      } else {
        setUserId(null);
        setEnrolledCourses([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading enrolled courses...</p>;
  if (!userId) return <p>Please login to see your enrolled courses.</p>;
  if (enrolledCourses.length === 0)
    return <p>You have not enrolled in any courses yet.</p>;

  return (
    <div className=" lg:mr-[120px] md:mr-[60px] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {enrolledCourses.map(({ course, mentor }) => (
          <motion.div key={course.id} variants={cardVariants}>
            <CourseCard course={course} mentorInfo={mentor} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProfileCourse;
