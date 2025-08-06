"use client";
import BodyWrapper from "@/components/BodyWrapper";
import { useAuth } from "@/lib/auth/useAuth";
import { notFound } from "next/navigation";
import { useEffect } from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuth();

  useEffect(() => {
    console.log(user.user);
  }, [user]);

  if (!user || user.user?.role !== "ADMIN") {
    notFound();
  }

  return <BodyWrapper>{children}</BodyWrapper>;
}

export default DashboardLayout;
