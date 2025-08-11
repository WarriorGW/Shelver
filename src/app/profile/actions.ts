"use server";

import db from "@/db";

export async function editUsername(userId: string, name: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  console.log(`Editing user: ${userId} with name: ${name}`);

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      name,
    },
  });

  return updatedUser;
}

export async function deleteUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.user.update({
    where: { id: userId },
    data: { status: "DISABLED" },
  });

  return { message: "User deactivated successfully" };
}
