"use client";
import React, { useEffect, useState } from "react";
import MentoringGoalCard from "./mentoringgoalcard";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { Mentor } from "@/lib/types/type";

type MentoringGoalType = {
  name: string;
  age: string;
  location: string;
  subject: string;
  image: string;
};

const MetoringGoal = () => {
  const [mentor, setMentor] = useState<Mentor[]>([]);

  useEffect(() => {
    try {
      const fetchMentors = async () => {
        const querySnapshot = await getDocs(collection(database, "mentors"));
        const mentors: Mentor[] = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...(doc.data() as Omit<Mentor, "id">),
          };
        });
        setMentor(mentors);
      };

      fetchMentors();
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  }, []);

  const mentorGoal = mentor.slice(0, 3);
  // console.log(mentorGoal);

  return (
    <section className="mt-20 flex flex-col gap-8 items-center px-4 max-w-7xl mx-auto">
      {/* Tag */}
      <p className="tracking-widest text-center text-xl text-blue-700 font-semibold">
        MENTORING GOALS
      </p>

      {/* Header */}
      <header className="flex flex-col gap-2 items-center max-w-xl text-center">
        <h1 className="text-gray-800 font-semibold text-4xl">
          Popular Mentors
        </h1>
        <p className="text-gray-500">
          Do you want to move on next step? Choose your most popular learning
          mentors. They will help you reach your professional goals.
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {mentorGoal.map((goal, index) => (
          <MentoringGoalCard key={index} goal={goal} />
        ))}
      </div>
    </section>
  );
};

export default MetoringGoal;
