"use client";

import BookCard from "@/components/BookCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getBooks } from "./actions";

export default function Home() {
  const books = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      return await getBooks();
    },
  });

  useEffect(() => {
    console.log(books.data);
  }, [books.data]);

  if (books.isPending) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        Cargando libros...
      </div>
    );
  }

  return (
    <div>
      {books.data?.length ? (
        <p>Hay {books.data.length} libros</p>
      ) : (
        <p>No hay libros</p>
      )}
      <div className="flex flex-wrap gap-4 items-stretch">
        {books.data &&
          books.data.map((book) => <BookCard key={book.id} {...book} />)}
      </div>
    </div>
  );
}
