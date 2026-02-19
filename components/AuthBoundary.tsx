"use client";

import type { PropsWithChildren } from "react";

import { AuthProvider } from "@/context/AuthContext";

export default function AuthBoundary({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
