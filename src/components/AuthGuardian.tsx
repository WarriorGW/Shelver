"use client";
import { useAuth } from "@/lib/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthGuardian({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.replace("/"); // o una página de error
      // notFound(); // Redirige a una página 404
    }
  }, [loading, user, router]);

  if (loading || !user || user.role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
}

export default AuthGuardian;
