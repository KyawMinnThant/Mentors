"use client";
import React from "react";
import { MapPin, Briefcase, Cake, Star } from "lucide-react";
import { Mentor } from "@/lib/types/type";
import { motion } from "framer-motion";

type GoalType = {
  goal: Mentor;
};

const MentoringGoalCard: React.FC<GoalType> = ({ goal }) => {
  const mentorRating = 5;
  const rating = mentorRating || 4.5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <motion.div
      className="bg-white border overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center rounded-xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* IMAGE */}
      <div className="w-full h-[40vh] overflow-hidden mb-4">
        <img
          src={goal.img}
          alt={goal.name}
          className="w-full h-full object-cover transition-transform duration-400 ease-out hover:scale-110"
        />
      </div>

      {/* NAME */}
      <h2 className="text-3xl font-semibold text-gray-800">{goal.name}</h2>

      {/* SUBJECT */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
        <Briefcase size={16} />
        <p>{goal.specialization}</p>
      </div>

      {/* RATING */}
      <div className="flex items-center gap-1 mt-3">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <Star
              key={i}
              size={18}
              className={
                isFull
                  ? "fill-yellow-400 text-yellow-400"
                  : isHalf
                  ? "fill-yellow-300 text-yellow-300 opacity-50"
                  : "text-gray-300"
              }
            />
          );
        })}
        <span className="text-sm text-gray-600 ml-2">{rating.toFixed(1)}</span>
      </div>

      {/* INFO */}
      <div className="flex flex-col gap-2 mt-4 text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <Cake size={16} className="text-blue-600" />
          <span>Age: {goal.age}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-red-500" />
          <span>{goal.location}</span>
        </div>
      </div>

      <div className="h-6"></div>
    </motion.div>
  );
};

export default MentoringGoalCard;
