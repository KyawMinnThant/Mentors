"use client";

import Breadcrumb from "@/app/components/mentorlist/breadcrumb";
import { BreadcrumbItem } from "@/lib/types/type";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      // Replace this with your actual API call or email sending logic
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];

  return (
    <main className="font-dmsans px-4 md:px-10 lg:px-[125px] mt-[120px] mb-20 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="font-semibold  xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700 pb-2">
          Contact Us
        </h1>
        <Breadcrumb items={items} />
      </div>

      <p className="text-gray-700 mb-8 mt-5">
        Have questions or want to get in touch? Fill out the form below and
        we’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 space-y-6"
        noValidate
      >
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-600 mt-4">
            Thanks for reaching out! We will get back to you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4">
            Oops! Something went wrong. Please try again later.
          </p>
        )}
      </form>

      <section className="mt-14 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Other ways to contact us</h2>
        <p className="mb-2">📍 123 Mentor Street, Learning City, Edu Country</p>
        <p className="mb-2">📞 Phone: +1 (555) 123-4567</p>
        <p className="mb-2">✉️ Email: support@mentoringplatform.com</p>
        <p>🌐 Website: www.mentoringplatform.com</p>
      </section>
    </main>
  );
};

export default Contact;
