"use client";
import React from "react";
import MentorCard from "./mentorcard";
import MentorCardSkeleton from "@/app/loading";
import { Mentor } from "@/lib/types/type";

type Props = {
  mentor: Mentor[] | null;
};

const Mentorlist: React.FC<Props> = ({ mentor }) => {
  if (!mentor || mentor.length === 0) {
    return <p className="text-center w-full mt-5">No mentors found.</p>;
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {mentor.map((m) => (
        <MentorCard key={m.id} mentor={m} />
      ))}
    </div>
  );
};

export default Mentorlist;
