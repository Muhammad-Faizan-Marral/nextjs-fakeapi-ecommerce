"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/app/features/profile/components/ProfileHeader";
import UserProfileInfo from "@/app/features/profile/components/UserProfileInfo";
import ProfileLiked from "@/app/features/profile/components/ProfileLiked";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/auth/slice";

const ProfilePage = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <ProfileHeader />
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
            <UserProfileInfo />
            <div className="lg:col-span-1 space-y-6">
              <ProfileLiked />

              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/50">
                <h3 className="text-lg font-bold text-white mb-4">Account Actions</h3>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
