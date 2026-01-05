"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isAuthenticated, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      router.replace("/login");
    }
  }, [isAuthenticated, accessToken, router]);

  if (!isAuthenticated) return null; 

  return <>{children}</>;
};

export default ProtectedRoute;
