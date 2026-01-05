"use client";

import React, { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ClientProviderProps {
  children: ReactNode;
}
const queryClient = new QueryClient();
export const QueryProvider = ({ children }: ClientProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
