"use client";
import React, { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { clearAuthCookie } from "@/lib/auth/setAuthCookies";
import Breadcrumb from "../mentorlist/breadcrumb";
import { BreadcrumbItem } from "@/lib/types/type";

const ProfileForm = () => {
  const { user, setUser } = useAuthStore();

  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Mentorlist" },
  ];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [username, setUsername] = useState(user?.displayName || "");

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const handleImageClick = () => fileInputRef.current?.click();

  // Preview image (no upload yet)
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file); // Save file for upload later
    setPreviewImage(URL.createObjectURL(file)); // Temporary preview
  };

  // Delete Image from ImageKit (backend)
  const deleteOldImageFromImageKit = async (fileId: string) => {
    await fetch("/api/delete-imagekit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId }),
    });
  };

  // ⬇ Save Button: Upload image + update Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setUploading(true);

    let finalPhotoURL = user?.photoURL || null;

    // If new image selected → upload
    if (selectedFile) {
      try {
        const signRes = await fetch("/api/imagekit-auth");
        const { signature, expire, token } = await signRes.json();

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("fileName", `profile-${Date.now()}`);
        formData.append("token", token);
        formData.append("signature", signature);
        formData.append("expire", expire);
        formData.append("folder", "/mentoring");

        const uploadRes = await fetch("/api/upload_image", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadData?.url) {
          const oldFileId = user?.photoURL?.split("fileId=")?.[1];
          if (oldFileId) {
            await deleteOldImageFromImageKit(oldFileId);
          }

          finalPhotoURL = uploadData.url + `?fileId=${uploadData.fileId}`;
        }
      } catch (err) {
        console.log("Upload Failed", err);
      }
    }

    // Update Firebase Profile
    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: finalPhotoURL || undefined,
    });

    await auth.currentUser.reload();
    setUser({ ...auth.currentUser });

    setUploading(false);
    alert("Profile updated!");
  };

  const handleLogout = async () => {
    const confrimation = confirm("Are you sure you want to logout?");
    if (!confrimation) return;
    signOut(auth);
    await clearAuthCookie();
    setUser(null);

    router.push("/");
  };

  return (
    <div className="font-dmsans lg:w-[50%] md:w-[70%] w-[95%]  lg:ml-[120px] md:ml-0 p-4 mt-10  ">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        {/* Profile Image */}
        <div className="relative w-24 h-24">
          <img
            src={previewImage || user?.photoURL || "/default-avatar.png"}
            className="w-24 h-24 rounded-full object-cover border"
            alt="User"
          />

          <button
            type="button"
            onClick={handleImageClick}
            disabled={uploading}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 disabled:bg-gray-400"
          >
            <Pencil size={16} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImagePreview}
          />
        </div>

        {/* Username */}
        <div>
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            disabled
            value="************"
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Save */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={uploading}
        >
          {uploading ? "Saving..." : "Save Changes"}
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
