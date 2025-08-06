"use client";

import { useAuth } from "@/lib/auth/useAuth";
import { useEffect } from "react";

function SessionInitializer() {
  const { getSession } = useAuth();
  useEffect(() => {
    getSession();
  }, [getSession]);

  return null;
}

export default SessionInitializer;
