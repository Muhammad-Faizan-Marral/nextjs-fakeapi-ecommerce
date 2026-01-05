"use client";
import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { updateProfile } from "@/app/features/auth/slice";

const UserProfileInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  if (!user) return null;

  const handleSave = () => {
    dispatch(updateProfile(tempInfo));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempInfo({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
    });
    setIsEditing(false);
  };
  const handleEdit = () => {
    setIsEditing(true);
    setTempInfo(user);
  };


  return (
    <div className="">
      <div className="lg:col-span-2">
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 lg:p-8 shadow-xl shadow-black/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-300 mb-2 block">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempInfo.name}
                  onChange={(e) => setTempInfo({ ...tempInfo, name: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="flex items-center gap-3 bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-200">{user.name}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempInfo.email}
                  onChange={(e) => setTempInfo({ ...tempInfo, email: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="your@email.com"
                />
              ) : (
                <div className="flex items-center gap-3 bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-200 text-sm">{user.email}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempInfo.phone}
                  onChange={(e) => setTempInfo({ ...tempInfo, phone: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="+92 300 1234567"
                />
              ) : (
                <div className="flex items-center gap-3 bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-200">{user.phone}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-300 mb-2 block">Address</label>
              {isEditing ? (
                <textarea
                  value={tempInfo.address}
                  onChange={(e) => setTempInfo({ ...tempInfo, address: e.target.value })}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Enter your address"
                />
              ) : (
                <div className="flex items-start gap-3 bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span className="text-gray-200">{user.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
