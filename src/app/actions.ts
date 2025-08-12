"use server";
import db from "@/db";

export async function getBooks() {
  const books = await db.book.findMany({ orderBy: { createdAt: "desc" } });
  return books;
}

export async function loanBook(
  bookId: string,
  userId: string,
  returnDays: number
) {
  const book = await db.book.findUnique({ where: { id: bookId } });
  if (!book) {
    throw new Error("Book not found");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + returnDays);

  const loan = await db.loan.create({
    data: {
      bookId,
      userId,
      dueDate,
    },
  });

  return loan;
}
