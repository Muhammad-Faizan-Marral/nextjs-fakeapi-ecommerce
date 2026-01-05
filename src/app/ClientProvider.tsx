"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";

// ✅ Define props type properly
interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  return <Provider>{children}</Provider>;
};
