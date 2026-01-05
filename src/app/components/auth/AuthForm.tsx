"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useCreateUserMutation, useGetProfileMutation, useLoginUserMutation } from "@/app/features/auth/mutations";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "@/app/features/auth/authSlice";
import Loading from "../ui/loading";
import { setActiveUser } from "@/app/features/cart/cartSlice";

const AuthForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [tab, setTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const avatar = "https://picsum.photos/800";

  const { mutate: signup, isPending: signupLoading } = useCreateUserMutation();
  const { mutate: login, isPending: loginLoading } = useLoginUserMutation();
  const { mutate: getProfileData } = useGetProfileMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email & Password required");
      return;
    }

    if (tab === "signup") {
      if (!name) {
        toast.error("Name is required");
        return;
      }

      signup(
        { name, email, password, avatar },
        {
          onSuccess: () => {
            toast.success("Signup successful, please login");
            setTab("login");
            setName("");
            setEmail("");
            setPassword("");
          },
          onError: () => toast.error("Signup failed"),
        },
      );
      return;
    }

    // LOGIN FLOW - FIXED
    login(
      { email, password },
      {
        onSuccess: (tokens) => {
          // First, store tokens in Redux
          dispatch(setAuth({ tokens }));

          // Then fetch profile with access token
          getProfileData(tokens.access_token, {
            onSuccess: (profileData) => {
              dispatch(
                setUser({
                  id: profileData.id,
                  name: profileData.name,
                  email: profileData.email,
                  avatar: profileData.avatar,
                  phone: profileData.phone || "",
                  address: profileData.address || "",
                }),
              );

              dispatch(setActiveUser(profileData.id));
              
              toast.success("Login successful!");
              router.push("/"); // Redirect to home or dashboard
            },
            onError: () => {
              toast.error("Failed to fetch profile");
            },
          });
        },
        onError: () => toast.error("Invalid credentials"),
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4">
      <ToastContainer theme="dark" transition={Bounce} />

      <div className="w-full max-w-md bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-10 shadow-2xl">
        {/* Tab Switcher */}
        <div className="flex mb-8 bg-gray-800/30 rounded-xl p-1 border border-gray-700/30">
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 font-semibold rounded-lg transition-all duration-300 ${
                tab === t
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {tab === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          {tab === "login" ? "Login to continue your journey" : "Join us and get started today"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {tab === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading || signupLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loginLoading || signupLoading ? <Loading /> : tab === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;