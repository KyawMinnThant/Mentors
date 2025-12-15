"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

interface CourseFormData {
  course_img: FileList | null;
  title: string;
  description: string;
  duration: string;
  level: string;
  userId: string;
  categoryId: string; // Added categoryId field
}

type Category = {
  id: string;
  category: string;
};

const CourseCreateForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    defaultValues: {
      course_img: null,
      title: "",
      description: "",
      duration: "",
      level: "",
      userId: "",
      categoryId: "", // default empty
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "categories"));
        const categories: Category[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: CourseFormData) => {
    try {
      setLoading(true);
      const course_img = data.course_img ? data.course_img[0] : null;
      if (!course_img) return;

      const formData = new FormData();
      formData.append("file", course_img);

      const res = await fetch("api/upload_image", {
        method: "POST",
        body: formData,
      });

      const { url } = await res.json();

      await addDoc(collection(database, "courses"), {
        course_img: url,
        title: data.title,
        description: data.description,
        duration: data.duration,
        level: data.level,
        userId: data.userId,
        categoryId: data.categoryId, // save selected category
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[90px] max-w-md mx-auto p-8 bg-white rounded-lg shadow-md flex flex-col gap-6"
    >
      <h1 className="text-2xl font-bold">Create Course</h1>

      {/* Course Image */}
      <div>
        <label
          htmlFor="course_img"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Course Image
        </label>
        <input
          type="file"
          id="course_img"
          accept="image/*"
          {...register("course_img", { required: "Course image is required" })}
          className="w-full rounded-lg border border-gray-300 file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800"
        />
        {errors.course_img && (
          <p className="mt-1 text-sm text-red-600">
            {errors.course_img.message}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Course Title
        </label>
        <Input
          id="title"
          {...register("title", { required: "Course title is required" })}
          placeholder="Enter course title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Course Description
        </label>
        <Input
          id="description"
          {...register("description", {
            required: "Course description is required",
          })}
          placeholder="Enter course description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label
          htmlFor="duration"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Duration
        </label>
        <Input
          id="duration"
          {...register("duration", { required: "Duration is required" })}
          placeholder="Enter course duration (e.g. 3 months)"
        />
        {errors.duration && (
          <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
        )}
      </div>

      {/* Level */}
      <div>
        <label
          htmlFor="level"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Course Level
        </label>
        <select
          id="level"
          {...register("level", { required: "Course level is required" })}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm
            placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          defaultValue=""
        >
          <option value="" disabled>
            Select level
          </option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {errors.level && (
          <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="categoryId"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="categoryId"
          {...register("categoryId", { required: "Category is required" })}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm
            placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          defaultValue=""
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat?.category}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      {/* User ID */}
      <div>
        <label
          htmlFor="userId"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          User ID (Mentor ID)
        </label>
        <Input
          id="userId"
          {...register("userId", { required: "User ID is required" })}
          placeholder="Enter user/mentor ID"
        />
        {errors.userId && (
          <p className="mt-1 text-sm text-red-600">{errors.userId.message}</p>
        )}
      </div>

      <Button disabled={loading} type="submit" className="w-full">
        {loading ? "Creating..." : "Create Course"}
      </Button>
    </form>
  );
};

export default CourseCreateForm;
