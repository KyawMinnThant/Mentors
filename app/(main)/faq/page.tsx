"use client";
import React, { useState } from "react";

import { BreadcrumbItem } from "@/lib/types/type";
import Breadcrumb from "@/app/components/mentorlist/breadcrumb";

const faqs = [
  {
    question: "How do I find a mentor?",
    answer:
      "You can browse our mentor list and filter mentors by subject, location, and availability. Once you find a mentor that fits your needs, you can view their profile and get in touch.",
  },
  {
    question: "Is mentorship free or paid?",
    answer:
      "Our platform supports both free and paid mentorships. The mentor’s profile will specify if there is a fee for their guidance.",
  },
  {
    question: "How can I become a mentor?",
    answer:
      "If you have expertise and want to guide others, you can sign up on our platform and create your mentor profile to connect with mentees.",
  },
  {
    question: "What subjects are available?",
    answer:
      "We offer mentors in a wide range of subjects including Languages, Maths, Sciences, Technology, Business, Arts, and more.",
  },
  {
    question: "How do I contact my mentor?",
    answer:
      "Once you select a mentor, you can find their contact options on their profile page, which may include messaging, email, or scheduled meetings.",
  },
];

const FAQ = () => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "FAQ" },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="font-dmsans px-4 mt-[120px] md:px-10 lg:px-[125px] mb-10 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="font-semibold xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700 pb-2">
          Frequently Asked Questions
        </h1>
        <Breadcrumb items={items} />
      </div>

      <section className="mt-8 space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="border rounded-md shadow-sm bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left px-6 py-2 flex justify-between items-center text-gray-900 font-semibold focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${idx}`}
                id={`faq-header-${idx}`}
              >
                {faq.question}
                <span className="ml-2 text-xl">{isOpen ? "−" : "+"}</span>
              </button>

              <div
                id={`faq-content-${idx}`}
                role="region"
                aria-labelledby={`faq-header-${idx}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden text-gray-700 border-t ${
                  isOpen
                    ? "max-h-96 opacity-100 py-4"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default FAQ;
