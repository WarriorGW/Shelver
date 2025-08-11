"use client";

import SortingButton from "@/components/SortingButton";
import { localeCompareSortingFn } from "@/lib/sortingFunctions";
import { Book } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./RowActions";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.id.slice(16, 25),
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: ({ column }) => <SortingButton text="Titulo" column={column} />,
    cell: ({ row }) => row.getValue("title"),
    sortingFn: localeCompareSortingFn,
  },
  {
    accessorKey: "author",
    header: ({ column }) => <SortingButton text="Autor" column={column} />,
    cell: ({ row }) => row.getValue("author"),
    sortingFn: localeCompareSortingFn,
  },

  {
    accessorKey: "isbn",
    header: ({ column }) => <SortingButton text="ISBN" column={column} />,
    cell: ({ row }) => row.getValue("isbn"),
  },
  {
    accessorKey: "publishedAt",
    header: ({ column }) => <SortingButton text="Publicado" column={column} />,
    cell: ({ row }) => {
      const date = row.getValue("publishedAt");
      return date
        ? new Date(date as Date).toLocaleDateString()
        : "No disponible";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original;
      return <RowActions book={book} />;
    },
  },
];
