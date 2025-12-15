"use client";

import { auth } from "@/firebaseConfig";
import { setAuthCookie } from "@/lib/auth/setAuthCookies";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type SignupFormInputs = {
  profilePhoto: FileList;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      let photoURL = "";
      if (
        data.profilePhoto &&
        data.profilePhoto[0] &&
        data.profilePhoto.length > 0
      ) {
        const formData = new FormData();
        formData.append("file", data.profilePhoto[0]);
        const res = await fetch("/api/upload_image", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();

        if (!res.ok || !result.url) {
          throw new Error("Failed to upload profile photo");
        }
        photoURL = result.url;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.fullName,
        photoURL: photoURL,
      });
      const token = await user.getIdToken();
      const userId = user.uid;
      await setAuthCookie(token, userId);

      router.push("/");
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-dmsans flex flex-col gap-5  items-center justify-center bg-gray-100 p-5">
      <img
        src="https://mentoring-wp.dreamstechnologies.com/wp-content/themes/mentoring/assets/images/logo.png"
        alt="logo"
        width={200}
        height={100}
        className="object-contain mb-5"
      />

      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-xl">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Sign Up
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Photo Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Profile Photo</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className={`border p-2 rounded-sm text-gray-900 bg-white file:bg-blue-700 file:text-white file:px-4 file:py-2 file:border-none file:rounded-sm file:cursor-pointer ${
                errors.profilePhoto ? "border-red-500" : "border-gray-300"
              }`}
              {...register("profilePhoto", {
                required: "Profile photo is required",
                validate: {
                  lessThan5MB: (files) =>
                    files?.[0]?.size < 5_000_000 || "Max file size is 5MB",
                  acceptedFormats: (files) =>
                    ["image/jpeg", "image/png"].includes(files?.[0]?.type) ||
                    "Only PNG or JPEG images are accepted",
                },
              })}
            />
            {errors.profilePhoto && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profilePhoto.message?.toString()}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`border p-2 rounded-sm text-gray-900 focus:ring-2 outline-none ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
              {...register("fullName", { required: "Full name is required" })}
              aria-invalid={errors.fullName ? "true" : "false"}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`border p-2 rounded-sm text-gray-900 focus:ring-2 outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter a strong password"
              className={`border p-2 rounded-sm text-gray-900 focus:ring-2 outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className={`border p-2 rounded-sm text-gray-900 focus:ring-2 outline-none ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Show generic form error */}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`bg-blue-700 text-white p-2 rounded-md font-semibold text-lg hover:bg-blue-900 transition ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-blue-700 underline font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
