"use server";

import db from "@/db";
import { CustomError } from "@/lib/errors";
import { hash } from "bcrypt";

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

  return newUser;
}
