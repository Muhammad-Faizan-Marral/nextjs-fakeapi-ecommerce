"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveUser } from "@/app/features/cart/cartSlice";
import { useGetProfileMutation } from "@/app/features/auth/mutations";

const AppInitializer = () => {
  const dispatch = useDispatch();
  const { mutate: profile } = useGetProfileMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    profile(token, {
      onSuccess: (profileData) => {
        dispatch(setActiveUser(profileData.id));
      },
      onError: (err) => {
        console.log("Failed to fetch profile:", err);
      },
    });
  }, [dispatch, profile]);

  return null;
};

export default AppInitializer;
