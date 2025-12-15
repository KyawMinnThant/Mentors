import React from "react";
import Breadcrumb from "../../components/mentorlist/breadcrumb";
import { BreadcrumbItem } from "@/lib/types/type";

const AboutUs = () => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <main className="font-dmsans px-4 md:px-10 lg:px-[125px] mt-[120px] mb-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="font-semibold xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700 pb-2">
          About Us
        </h1>
        <Breadcrumb items={items} />
      </div>

      <section className="mt-6 text-gray-700 space-y-6 leading-relaxed text-justify">
        <p>
          Welcome to our mentoring platform — a place dedicated to connecting
          learners with experienced mentors across various fields. Our mission
          is to empower individuals by facilitating meaningful relationships
          that promote growth, learning, and success.
        </p>

        <p>
          Founded with the vision of bridging the gap between knowledge seekers
          and experts, we strive to create a community where knowledge sharing
          is easy, accessible, and impactful. Whether you’re looking to enhance
          your skills, explore new career paths, or gain valuable insights, our
          mentors are here to guide you every step of the way.
        </p>

        <p>
          We believe that mentorship is a powerful tool for personal and
          professional development. By fostering connections based on trust,
          respect, and mutual growth, we aim to build a supportive ecosystem
          where everyone can thrive.
        </p>

        <p>
          Thank you for being a part of our journey. We are committed to
          continuously improving our platform to meet your needs and help you
          unlock your full potential.
        </p>
      </section>
    </main>
  );
};

export default AboutUs;
