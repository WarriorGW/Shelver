"use server";

import db from "@/db";
import type { Book } from "@prisma/client";

export async function getBooks() {
  const books = await db.book.findMany({ orderBy: { createdAt: "desc" } });
  return books;
}

export async function getBookById(bookId: string) {
  const book = await db.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}

export async function editBook(bookId: string, formData: FormData) {
  const title = String(formData.get("title"));
  const author = String(formData.get("author"));
  const description = String(formData.get("description"));
  const coverImage = String(formData.get("coverImage"));

  const book = await db.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  const updatedBook = await db.book.update({
    where: { id: bookId },
    data: {
      title,
      author,
      description,
      coverImage,
    },
  });

  return updatedBook;
}

export async function deleteBook(bookId: string) {
  const book = await db.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  await db.book.delete({
    where: { id: bookId },
  });

  return { message: "Book deleted successfully" };
}

export async function createBook(formData: FormData) {
  const title = String(formData.get("title"));
  const author = String(formData.get("author"));
  const description = String(formData.get("description"));
  const coverImage = String(formData.get("coverImage"));

  const newBook = await db.book.create({
    data: {
      title,
      author,
      description,
      coverImage,
    },
  });

  return newBook;
}
