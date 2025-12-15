import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-20 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Image
            src="https://mentoring-wp.dreamstechnologies.com/wp-content/themes/mentoring/assets/images/logo.png"
            alt="logo"
            width={200}
            height={200}
          />
          <p className="text-gray-400 max-w-xs">
            Connecting mentors and mentees worldwide to foster growth and
            success.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/mentors" className="hover:text-blue-500">
                Mentors
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-blue-500">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-blue-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@mentornet.com"
              className="hover:text-blue-500"
            >
              support@mentornet.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:text-blue-500">
              +1 (234) 567-890
            </a>
          </p>
          <p>Address: 123 Mentor St, Learning City, USA</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="mb-4 text-gray-400">
            Subscribe to get the latest mentoring tips and updates.
          </p>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MentorNet. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
