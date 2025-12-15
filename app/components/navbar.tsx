"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Menunav from "./menunav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useAuthStore } from "../store/useAuthStore";
import { clearAuthCookie } from "@/lib/auth/setAuthCookies";

type MenuItem = {
  label: string;
  href: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser, setLoading, loading } = useAuthStore();

  const isActive = (href: string) => pathname === href;

  // Merged menu data
  const mentorMenu: MenuItem[] = [
    { label: "Mentor List", href: "/mentor-list" },
    { label: "How To Find A Mentor", href: "/how-to-find-a-mentor" },
  ];

  const pagesMenu: MenuItem[] = [
    { label: "About Us", href: "/about-us" },
    { label: "FAQ", href: "/faq" },
  ];

  const coursesMenu: MenuItem[] = [
    { label: "All Courses", href: "course" },
    { label: "Languages", href: "course?type=languages" },
    { label: "Maths", href: "course?type=maths" },
    { label: "Sciences", href: "course?type=sciences" },
    { label: "DevOps", href: "course?type=devops" },
    { label: "Designs", href: "course?type=designs" },

    { label: "Computer Science", href: "course?type=computerscience" },
    { label: "Web Development", href: "course?type=webdevelopment" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  const handleLogout = async () => {
    await signOut(auth);
    await clearAuthCookie();
  };

  return (
    <nav className="bg-white shadow-sm p-5 font-dmsans fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image
              src="https://mentoring-wp.dreamstechnologies.com/wp-content/themes/mentoring/assets/images/logo.png"
              alt="logo"
              width={160}
              height={50}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop menu (lg+) */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/">
            <span
              className={`text-sm font-dmsans cursor-pointer ${
                isActive("/") ? "text-blue-600 underline font-semibold" : ""
              }`}
            >
              Home
            </span>
          </Link>

          <Menunav menuItems={mentorMenu} activePath={pathname}>
            <p
              className={`${
                isActive("/how-to-find-a-mentor") || isActive("/mentor-list")
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}
            >
              Mentor
            </p>
          </Menunav>

          <Menunav menuItems={pagesMenu} activePath={pathname}>
            <p
              className={`${
                isActive("/about-us") || isActive("/faq")
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}
            >
              Pages
            </p>
          </Menunav>

          <Menunav menuItems={coursesMenu} activePath={pathname}>
            <p
              className={`${
                isActive(`/course`) ||
                isActive(`/course?type=languages`) ||
                isActive(`/course?type=maths`) ||
                isActive(`/course?type=sciences`) ||
                isActive(`/course?type=cooking`) ||
                isActive(`/course?type=technology`)
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}
            >
              Courses
            </p>
          </Menunav>

          <Link href="/contact">
            <span
              className={`text-sm font-dmsans cursor-pointer ${
                isActive("/contact") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Contact
            </span>
          </Link>

          {!user && !loading ? (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <Link
              href="/profile"
              className="flex gap-2 items-center cursor-pointer hover:text-blue-600"
            >
              <img
                src={`${user?.photoURL}`}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <p>{user?.displayName}</p>
            </Link>
          )}
          {loading && <p>Loading... </p>}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md mt-2">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link href="/">
              <span
                onClick={() => setMenuOpen(false)}
                className={`text-base font-dmsans cursor-pointer ${
                  isActive("/") ? "text-blue-600 font-semibold underline" : ""
                }`}
              >
                Home
              </span>
            </Link>

            <Menunav menuItems={mentorMenu} activePath={pathname}>
              Mentor
            </Menunav>

            <Menunav menuItems={pagesMenu} activePath={pathname}>
              Pages
            </Menunav>

            <Menunav menuItems={coursesMenu} activePath={pathname}>
              Courses
            </Menunav>

            <Link href="/contact">
              <span
                onClick={() => setMenuOpen(false)}
                className={`text-base font-dmsans cursor-pointer ${
                  isActive("/contact") ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Contact
              </span>
            </Link>

            {!user && !loading && (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </Link>
            )}
            {user && !loading && (
              <Link href="/profile" className="flex gap-2 items-center">
                <img
                  src={`${user?.photoURL}`}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <p>{user?.displayName}</p>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
