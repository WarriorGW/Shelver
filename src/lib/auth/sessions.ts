"use server";

import db from "@/db";
// import crypto from "crypto"; // si decides encriptar
import { cookies } from "next/headers";

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos

  // 1. Crear sesión en base de datos
  const session = await db.session.create({
    data: {
      userId,
      expiresAt,
    },
  });

  const sessionId = session.id;

  // 2. (Opcional) Cifrar ID antes de usarlo
  // const encrypted = await crypto.create({ sessionId, expiresAt });

  // 3. Guardar en cookie
  (await cookies()).set("session", sessionId, {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: expiresAt,
    sameSite: "lax",
  });

  return sessionId;
}

export async function getCurrentUser() {
  const sessionId = (await cookies()).get("session")?.value;

  if (!sessionId) return null;

  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: sessionId } });
    return null;
  }

  return session.user;
}
