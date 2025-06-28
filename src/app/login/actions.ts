"use server";

import db from "@/db";
import { CustomError } from "@/lib/errors";

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

  if (user.password !== password) {
    throw new CustomError({
      name: "INVALID_PASSWORD",
      message: "El correo o la contraseña son incorrectos.",
    });
  }

  return { cookie: "exampletoken" };
}
