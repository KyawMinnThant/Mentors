import SignupForm from "@/app/components/auth/signup/signupform";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Signup = async () => {
  const cookiesToken = await cookies();
  const token = cookiesToken.get("user_token");

  if (token) {
    redirect("/");
  }
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default Signup;
