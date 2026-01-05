"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { Camera, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

const ProfileHeader = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [profileImage, setProfileImage] = useState<string>("");

  // Load profile image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem(`profileImage_${user?.email}`);
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [user?.email]);

  // Handle image drop/upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        // Save to localStorage
        localStorage.setItem(`profileImage_${user?.email}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [user?.email]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeProfileImage = () => {
    setProfileImage("");
    localStorage.removeItem(`profileImage_${user?.email}`);
  };

  if (!user) return null;

  return (
    <div>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 lg:p-8 shadow-xl shadow-black/50 relative overflow-hidden group">
        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-700"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
            <p className="text-gray-400">Manage your personal information and account preferences.</p>
          </div>

          <div className="flex items-center gap-4 bg-[#1a1a1a] p-2 pr-6 rounded-full border border-gray-800">
            {/* Profile Image with Hover Overlay */}
            <div className="relative group/avatar">
              <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
                <div className="h-full w-full rounded-full overflow-hidden border-2 border-[#0a0a0a]">
                  {profileImage ? (
                    <img
                      alt="Profile"
                      className="h-full w-full object-cover"
                      src={profileImage}
                    />
                  ) : (
                    <img
                      alt="Profile"
                      className="h-full w-full object-cover"
                      src={user.avatar || "https://via.placeholder.com/200"}
                    />
                  )}
                </div>
              </div>

              {/* Upload Button Overlay */}
              <div
                {...getRootProps()}
                className="absolute inset-0 rounded-full bg-black/70 opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
              >
                <input {...getInputProps()} />
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-2">
                <div
                  {...getRootProps()}
                  className="text-sm font-bold text-white hover:text-purple-400 transition-colors cursor-pointer"
                >
                  <input {...getInputProps()} />
                  Change Photo
                </div>
                {profileImage && (
                  <>
                    <span className="text-gray-600">|</span>
                    <button
                      onClick={removeProfileImage}
                      className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
              <span className="text-xs text-gray-500">JPG, GIF or PNG. Max 1MB.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;