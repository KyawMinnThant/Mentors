import LoginForm from "@/app/components/auth/login/loginform";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

const Login = async () => {
  const cookiesToken = await cookies();
  const token = cookiesToken.get("user_token");

  if (token) {
    redirect("/");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
