import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import React from "react";
import { deleteBook } from "./actions";
import { useBooksStore } from "./useBooks";

function RowActions({ book }: { book: Book }) {
  const { openDialog, refetchBooks } = useBooksStore();

  const deleteMutation = useMutation({
    mutationFn: async (bookId: string) => {
      return await deleteBook(bookId);
    },
    onSuccess: () => {
      refetchBooks();
    },
    onError: (error) => {
      console.error("Error deleting book:", error);
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              openDialog(book);
            }}
          >
            <Edit />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              deleteMutation.mutate(book.id);
            }}
          >
            <Trash2 /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default RowActions;
