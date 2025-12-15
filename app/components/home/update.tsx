import React from "react";
import UpdateCard from "./updatecard";

type UpdateType = {
  adminName: string;
  adminProfile: string;
  title: string;
  description: string;
  time: string; // <-- Add this
};

const updateSteps: UpdateType[] = [
  {
    adminName: "Admin",
    adminProfile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bpfKkRgsak6hP6zkTcwjzM5u76piV5qoQg&s",
    title: "New Mentorship Categories Added",
    description:
      "We introduced new categories including AI, Graphic Design, and Content Writing to help learners explore more career paths.",
    time: "2 hours ago",
  },

  {
    adminName: "Admin",
    adminProfile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bpfKkRgsak6hP6zkTcwjzM5u76piV5qoQg&s",
    title: "Platform UI Improvements",
    description:
      "A refreshed UI layout has been released for better navigation, improved accessibility, and faster performance.",
    time: "1 day ago",
  },

  {
    adminName: "Admin",
    adminProfile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bpfKkRgsak6hP6zkTcwjzM5u76piV5qoQg&s",
    title: "Mentor Verification Update",
    description:
      "A new verification system is now in place to ensure mentors meet high professional and educational standards.",
    time: "3 days ago",
  },
];

const Update = () => {
  return (
    <section className="mt-20 flex flex-col gap-8 items-center px-4 max-w-7xl mx-auto">
      {/* Tag */}
      <p className="tracking-widest text-center text-xl text-blue-700 font-semibold">
        UPDATES
      </p>

      {/* Header */}
      <header className="flex flex-col gap-2 items-center max-w-xl text-center">
        <h1 className="text-gray-800 font-semibold text-4xl">
          What are added?
        </h1>
        <p className="text-gray-500">
          Updates are happening and now added by the admin so that all can see.
          Now discorver and meet with mentors.
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {updateSteps.map((update, index) => (
          <UpdateCard key={index} update={update} />
        ))}
      </div>
    </section>
  );
};

export default Update;
