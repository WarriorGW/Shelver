"use client";
import DrawerDialog from "@/components/DrawerDialog";
import DataTable from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getBooks } from "./actions";
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
    <>
      <DrawerDialog
        title="Editar libro"
        isOpen={isOpen}
        setIsOpen={closeDialog}
      >
        xd
      </DrawerDialog>
      <DataTable columns={columns} data={books.data ?? []} />
    </>
  );
}

export default Books;
