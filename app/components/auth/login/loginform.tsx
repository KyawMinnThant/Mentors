"use client";

import { auth, googleProvider } from "@/firebaseConfig";
import { setAuthCookie } from "@/lib/auth/setAuthCookies";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";

type LoginInputType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  const onSubmit = async (data: LoginInputType) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      const token = await user.getIdToken();
      const userId = user.uid;

      await setAuthCookie(token, userId);

      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const provider = googleProvider;
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userId = user.uid;
      await setAuthCookie(token, userId);
      router.push("/");
    } catch (err) {
      setError("Fail to login with google");
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
          Login
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Enter your password"
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

          {/* Show error message from Firebase */}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`bg-blue-700 text-white p-2 rounded-md font-semibold text-lg hover:bg-blue-900 transition ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="border border-gray-300 p-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          >
            <img
              src="https://e7.pngegg.com/pngimages/299/774/png-clipart-google-logo-google-search-search-engine-optimization-google-s-google-google-logo-google-thumbnail.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700">Login with Google</span>
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-700 underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
