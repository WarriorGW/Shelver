"use server";

import db from "@/db";
import type { UserRole } from "@prisma/client";

export async function getUsers() {
  const users = await db.user.findMany({ orderBy: { createdAt: "desc" } });
  return users;
}

export async function getUserById(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function editUser(userId: string, formData: FormData) {
  const name = String(formData.get("name"));

  const role = formData.get("role") as UserRole;

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      name,
      role,
    },
  });

  return updatedUser;
}

export async function blockUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.status === "BLOCKED") {
    await db.user.update({
      where: { id: userId },
      data: {
        status: "ACTIVE",
      },
    });
    return { message: "User unblocked successfully" };
  }

  await db.user.update({
    where: { id: userId },
    data: {
      status: "BLOCKED",
    },
  });

  return { message: "User blocked successfully" };
}

export async function deleteUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.status === "DISABLED") {
    await db.user.update({
      where: { id: userId },
      data: { status: "ACTIVE" },
    });
    return { message: "User reactivated successfully" };
  }

  await db.user.update({
    where: { id: userId },
    data: { status: "DISABLED" },
  });

  return { message: "User deactivated successfully" };
}
