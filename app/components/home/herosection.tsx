"use client";

import { motion } from "framer-motion";
import HeroSectionForm from "./herosectionform";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat h-[95vh] py-20"
      style={{
        backgroundImage:
          "url('https://nstechblog.com/wp-content/uploads/2024/01/uses-of-laptop.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70 h-[95vh] overflow-y-hidden"></div>

      {/* Content container */}
      <motion.div
        className="relative max-w-7xl mx-auto px-6 py-20 text-white flex flex-col items-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <h1 className="lg:text-6xl text-3xl md:text-5xl font-bold mb-4">
          Search Teacher in{" "}
          <p className="text-blue-700">Mentoring Appointment</p>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mb-10">
          Find mentors, learn new skills, and grow your career with us.
        </p>

        {/* Form */}
        <HeroSectionForm />
      </motion.div>
    </section>
  );
};

export default HeroSection;
