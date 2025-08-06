"use client";
import BodyWrapper from "@/components/BodyWrapper";
import { useAuth } from "@/lib/auth/useAuth";
import { notFound } from "next/navigation";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (!user || user?.role !== "ADMIN") {
    return notFound();
  }

  return <BodyWrapper>{loading ? <></> : children}</BodyWrapper>;
}

export default DashboardLayout;
