"use server";

import db from "@/db";

export async function getLoans() {
  const loans = await db.loan.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      book: { select: { title: true, author: true, coverImage: true } },
      user: { select: { name: true, email: true, status: true } },
    },
  });
  return loans;
}

export async function createLoan(
  userEmail: string,
  bookId: string,
  returnDays: number
) {
  const user = await db.user.findUnique({ where: { email: userEmail } });

  if (!user) throw new Error("Usuario no encontrado");

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + returnDays);

  const loan = await db.loan.create({
    data: {
      userId: user.id,
      bookId,
      dueDate,
      status: "ACTIVE",
    },
  });

  return loan;
}

export async function getUsersForLoan() {
  const users = await db.user.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, name: true, email: true },
  });
  return users;
}

export async function getBooksForLoan() {
  const books = await db.book.findMany({
    where: { status: "AVAILABLE" },
    select: { id: true, title: true, author: true, coverImage: true },
  });
  return books;
}

export async function updateLoan(loanId: string, returnDays: number) {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + returnDays);

  const loan = await db.loan.update({
    where: { id: loanId },
    data: {
      dueDate,
    },
  });

  return loan;
}

export async function returnLoan(loanId: string) {
  const loan = await db.loan.update({
    where: { id: loanId },
    data: {
      status: "RETURNED",
    },
  });

  return loan;
}

export async function cancelLoan(loanId: string) {
  const loan = await db.loan.update({
    where: { id: loanId },
    data: {
      status: "CANCELLED",
    },
  });

  return loan;
}
