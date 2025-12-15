import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono, Roboto } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/home/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mentors",
  description: "Find the mentors and enroll their courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className={dmSans.className}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
