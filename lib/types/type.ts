import { Timestamp } from "firebase/firestore";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type Mentor = {
  id: string;
  name: string;
  specialization: string;
  age: string; // age is string
  createdAt: Timestamp; // Firestore Timestamp
  img: string;
  isAvailable: boolean;
  location: string;
};

export type Course = {
  id: string;
  categoryId: string;
  course_img: string;
  description: string;
  duration: string;
  level: string;
  title: string;
  userId: string;
};
