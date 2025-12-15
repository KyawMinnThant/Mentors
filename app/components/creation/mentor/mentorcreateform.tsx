"use client";

import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { mentorsSeed } from "@/lib/data/mentor";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface FormData {
  img: FileList | null;
  name: string;
  age: number;
  specialization: string;
  isAvailable: boolean;
  location: string;
}

const MentorCreateForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const mentorImageUrl = data.img ? data.img[0].name : null;
      if (!mentorImageUrl) {
        return;
      }
      // console.log(mentorImageUrl);
      const formData = new FormData();
      formData.append("file", data.img ? data.img[0] : null!);
      const res = await fetch("/api/upload_image", {
        method: "POST",
        body: formData,
      });

      const { url } = await res.json();
      // console.log(url);

      const docRef = await addDoc(collection(database, "mentors"), {
        name: data.name,
        age: data.age,
        specialization: data.specialization,
        isAvailable: data.isAvailable,
        location: data.location,
        img: url,
        createdAt: Timestamp.now(),
      });
      // console.log("Document written with ID: ", docRef.id);

      router.push(`/`);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue("img", e.target.files);
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Create Mentor
      </h2>

      {/* Image */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">
          Profile Image
        </label>
        <input
          type="file"
          {...register("img", { required: "Image required" })}
          // onChange={handleFileChange}
          className="w-full rounded-lg border border-gray-300 file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0 file:bg-black file:text-white
      hover:file:bg-gray-800"
        />
        {errors.img && (
          <p className="text-xs text-red-500">{errors.img.message}</p>
        )}
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name required" })}
          placeholder="John Doe"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Age */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Age</label>
        <input
          type="number"
          {...register("age", { required: "Age required", min: 18, max: 100 })}
          placeholder="25"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.age && (
          <p className="text-xs text-red-500">{errors.age.message}</p>
        )}
      </div>

      {/* Specialization */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">
          Specialization
        </label>
        <input
          type="text"
          {...register("specialization", {
            required: "Specialization required",
          })}
          placeholder="Frontend Developer"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.specialization && (
          <p className="text-xs text-red-500">
            {errors.specialization.message}
          </p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Location</label>
        <input
          type="text"
          {...register("location", { required: "Location required" })}
          placeholder="Remote"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.location && (
          <p className="text-xs text-red-500">{errors.location.message}</p>
        )}
      </div>

      {/* Availability */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          {...register("isAvailable")}
          className="w-4 h-4 accent-black"
        />
        Available for mentoring
      </label>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
      >
        {loading ? "Creating..." : "Create Mentor"}
      </Button>
    </form>
  );
};

export default MentorCreateForm;
