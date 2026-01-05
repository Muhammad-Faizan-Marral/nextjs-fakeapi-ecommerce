"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const ProfileHeader = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const handlePhotoChange = () => {
    alert("Photo change functionality - Open file picker");
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
            <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
              <img
                alt="Profile"
                className="h-full w-full object-cover rounded-full border-2 border-[#0a0a0a]"
                src={user.avatar || "https://via.placeholder.com/200"}
              />
            </div>

            <div className="flex flex-col">
              <button
                onClick={handlePhotoChange}
                className="text-sm font-bold text-white hover:text-purple-400 transition-colors text-left"
              >
                Change Photo
              </button>
              <span className="text-xs text-gray-500">JPG, GIF or PNG. Max 1MB.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;