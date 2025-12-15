import React from "react";
import ProfileForm from "../../components/profile/profileform";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileCourse from "../../components/profile/profilecourse";
import Breadcrumb from "../../components/mentorlist/breadcrumb";
import { BreadcrumbItem } from "@/lib/types/type";

const Profile = async () => {
  const cookiesToken = await cookies();
  const token = cookiesToken.get("user_token");
  const uid = cookiesToken.get("user_uid");

  if (!token && !uid) {
    redirect("/");
  }
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },

    { label: "Profile" },
  ];
  return (
    <div className="mt-[120px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 w-[95%] lg:w-[85%] md:w-[95%] mx-auto">
        <h1 className="font-semibold xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700 pb-2">
          Profile Setting
        </h1>
        <Breadcrumb items={items} />
      </div>
      <div className="  grid grid-cols-1 md:grid-cols-2">
        <ProfileForm />
        <ProfileCourse />
      </div>
    </div>
  );
};

export default Profile;
