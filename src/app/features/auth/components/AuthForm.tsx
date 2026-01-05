"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useCreateUserMutation, useGetProfileMutation, useLoginUserMutation } from "@/app/features/auth/hooks";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "@/app/features/auth/slice";
import { setActiveUser } from "@/app/features/cart/slice";
import Loading from "@/app/components/ui/loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Schemas
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

const signupSchema = loginSchema.extend({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const AuthForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [tab, setTab] = useState<"login" | "signup">("login");

  const avatar = "https://picsum.photos/800";

  const { mutate: signup, isPending: signupLoading } = useCreateUserMutation();
  const { mutate: login, isPending: loginLoading } = useLoginUserMutation();
  const { mutate: getProfileData } = useGetProfileMutation();

  // React Hook Form setup with Zod validation
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Switch tabs and reset forms
  const handleTabSwitch = (newTab: "login" | "signup") => {
    setTab(newTab);
    loginForm.reset();
    signupForm.reset();
  };

  const handleLoginSubmit = (data: LoginFormData) => {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: (tokens) => {
          dispatch(setAuth({ tokens }));
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
              router.push("/dashboard"); 
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

  const handleSignupSubmit = (data: SignupFormData) => {
    signup(
      { name: data.name, email: data.email, password: data.password, avatar },
      {
        onSuccess: () => {
          toast.success("Signup successful, please login");
          handleTabSwitch("login");
        },
        onError: () => toast.error("Signup failed"),
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
              onClick={() => handleTabSwitch(t)}
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

        {/* Form - Conditional rendering based on tab */}
        {tab === "login" ? (
          <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                placeholder="Enter your email"
                type="email"
                {...loginForm.register("email")}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  loginForm.formState.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700/50 focus:ring-purple-500 focus:border-transparent"
                }`}
              />
              {loginForm.formState.errors.email && (
                <p className="mt-1.5 text-sm text-red-400">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                placeholder="Enter your password"
                type="password"
                {...loginForm.register("password")}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  loginForm.formState.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700/50 focus:ring-purple-500 focus:border-transparent"
                }`}
              />
              {loginForm.formState.errors.password && (
                <p className="mt-1.5 text-sm text-red-400">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loginLoading ? <Loading /> : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                placeholder="Enter your name"
                {...signupForm.register("name")}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  signupForm.formState.errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700/50 focus:ring-purple-500 focus:border-transparent"
                }`}
              />
              {signupForm.formState.errors.name && (
                <p className="mt-1.5 text-sm text-red-400">
                  {signupForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                placeholder="Enter your email"
                type="email"
                {...signupForm.register("email")}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  signupForm.formState.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700/50 focus:ring-purple-500 focus:border-transparent"
                }`}
              />
              {signupForm.formState.errors.email && (
                <p className="mt-1.5 text-sm text-red-400">
                  {signupForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                placeholder="Enter your password"
                type="password"
                {...signupForm.register("password")}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  signupForm.formState.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700/50 focus:ring-purple-500 focus:border-transparent"
                }`}
              />
              {signupForm.formState.errors.password && (
                <p className="mt-1.5 text-sm text-red-400">
                  {signupForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={signupLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {signupLoading ? <Loading /> : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;