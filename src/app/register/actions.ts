import db from "@/db";

export async function registerUser() {
  const existingUser = await db.user.findFirst({
    where: { email: "user@example.com" },
  });

  if (existingUser) return;

  const newUser = await db.user.create({
    data: {
      email: "user@example.com",
      password: "securepassword123!",
    },
  });

  return newUser;
}
