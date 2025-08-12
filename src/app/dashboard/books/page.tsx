"use client";
import DrawerDialog from "@/components/DrawerDialog";
import DataTable from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getBooks } from "./actions";
import BookForm from "./BookForm";
import { columns } from "./columns";
import { useBooksStore } from "./useBooks";

function Books() {
  const { isOpen, selectedBook, closeDialog, setRefetch } = useBooksStore();

  const books = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      return await getBooks();
    },
  });

  useEffect(() => {
    setRefetch(books.refetch);
  }, [books.refetch, setRefetch]);

  return (
    <div className="flex flex-col gap-8">
      <DrawerDialog
        btnText="Agregar libro"
        title="Agregar libro"
        isOpen={isOpen}
        setIsOpen={closeDialog}
      >
        <BookForm closeDialog={closeDialog} />
      </DrawerDialog>
      <DrawerDialog
        title="Editar libro"
        isOpen={isOpen}
        setIsOpen={closeDialog}
      >
        <BookForm book={selectedBook} closeDialog={closeDialog} />
      </DrawerDialog>
      <DataTable columns={columns} data={books.data ?? []} />
    </div>
  );
}

export default Books;
