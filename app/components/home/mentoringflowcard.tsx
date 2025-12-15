"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type MentoringStep = {
  title: string;
  description: string;
  icon: ReactNode;
};

type MentoringFlowCardProps = {
  step: MentoringStep;
};

const MentoringFlowCard: React.FC<MentoringFlowCardProps> = ({ step }) => {
  return (
    <motion.div
      className="group relative flex flex-col shadow-md gap-4 items-center p-6 border rounded-lg 
                 bg-white text-gray-800
                 hover:bg-blue-700
                 transition-colors transition-transform transition-shadow duration-300 ease-in-out
                 hover:-translate-y-1 hover:shadow-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Big white circle */}
      <div
        className="pointer-events-none absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-white
                   opacity-0 group-hover:opacity-30 transition-opacity duration-300"
      ></div>

      <div
        className="p-4 rounded-full bg-blue-700 text-blue-100 
                   group-hover:bg-white group-hover:text-blue-700
                   transition-colors duration-300"
      >
        {step.icon}
      </div>

      <h2
        className="text-xl font-semibold
                   transition-colors duration-300
                   group-hover:text-white"
      >
        {step.title}
      </h2>

      <p
        className="text-center
                   transition-colors duration-300
                   group-hover:text-white"
      >
        {step.description}
      </p>

      {/* Big white circle */}
      <div
        className="pointer-events-none absolute bottom-[-20px] left-[-20px] w-20 h-20 rounded-full bg-white
                   opacity-0 group-hover:opacity-30 transition-opacity duration-300"
      ></div>
    </motion.div>
  );
};

export default MentoringFlowCard;
