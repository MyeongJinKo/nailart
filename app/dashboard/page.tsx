"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardNavbar from "@/components/dashboard/navbar";
import { PromptArea } from "@/components/dashboard/promptArea";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#181818",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5f5f5",
        }}
      >
        로딩 중...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#181818",
      }}
    >
      <DashboardNavbar />
      <div
        style={{
          minHeight: "100vh",
          padding: "clamp(3rem, 4vw, 5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PromptArea />
      </div>
    </main>
  );
}
