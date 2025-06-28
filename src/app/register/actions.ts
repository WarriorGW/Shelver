"use server";

import db from "@/db";
import { CustomError } from "@/lib/errors";

export async function registerUser(formData: FormData) {
  const existingUser = await db.user.findFirst({
    where: { email: String(formData.get("email")) },
  });

  if (existingUser)
    throw new CustomError({
      name: "EMAIL_EXISTS",
      message: "Este correo ya está registrado",
    });

  const newUser = await db.user.create({
    data: {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    },
  });

  return newUser;
}
