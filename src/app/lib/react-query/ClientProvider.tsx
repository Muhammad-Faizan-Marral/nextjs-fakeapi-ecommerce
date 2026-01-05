"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import Providers from "../redux/providers";


// ✅ Define props type properly
interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  return <Providers>{children}</Providers>;
};
