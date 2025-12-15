"use client";

import React from "react";
import { motion } from "framer-motion";

type AllLearning = {
  title: string;
  image: string;
};

type AllLearningType = {
  learning: AllLearning;
};

const AllLearningCard: React.FC<AllLearningType> = ({ learning }) => {
  return (
    <motion.div
      className="relative h-[50vh] w-full rounded-xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={learning.image}
        alt={learning.title}
        className="absolute inset-0 w-full h-full object-cover 
                   group-hover:scale-110 transition-transform duration-500"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>

      {/* TITLE */}
      <h2
        className="absolute inset-0 flex items-center justify-center 
                   text-white text-xl font-semibold px-3 text-center
                   drop-shadow-md"
      >
        {learning.title}
      </h2>
    </motion.div>
  );
};

export default AllLearningCard;
