"use server";

import db from "@/db";
import { createSession } from "@/lib/auth/sessions";
import { CustomError } from "@/lib/errors";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";

export async function registerUser(formData: FormData) {
  const existingUser = await db.user.findFirst({
    where: { email: String(formData.get("email")) },
  });

  if (existingUser)
    throw new CustomError({
      name: "EMAIL_EXISTS",
      message: "Este correo ya está registrado",
    });

  const hashedPassword = await hash(String(formData.get("password")), 10);

  const newUser = await db.user.create({
    data: {
      email: String(formData.get("email")),
      password: hashedPassword,
    },
  });

  await createSession(newUser.id);

  return newUser;
}

export async function loginUser(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user)
    throw new CustomError({
      name: "USER_NOT_FOUND",
      message: "No existe un usuario con este correo.",
    });

  if (!(await compare(password, user.password))) {
    throw new CustomError({
      name: "INVALID_PASSWORD",
      message: "El correo o la contraseña son incorrectos.",
    });
  }

  // Manejo de sesion (test)
  const session = await createSession(user.id);
  console.log(session);

  return { cookie: "exampletoken" };
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (sessionId) {
    await db.session.update({
      where: { id: sessionId },
      data: { revoked: true },
    });
    cookieStore.delete("session");
  }

  return { success: true };
}
