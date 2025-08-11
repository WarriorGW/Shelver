"use client";
import SortingButton from "@/components/SortingButton";
import { localeCompareSortingFn } from "@/lib/sortingFunctions";
import { Loan } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./RowActions";

export const columns: ColumnDef<Loan>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.id.slice(16, 25),
    enableHiding: false,
  },
  {
    accessorKey: "bookId",
    header: ({ column }) => <SortingButton text="Libro" column={column} />,
    cell: ({ row }) => row.getValue("bookId"),
  },
  {
    accessorKey: "userId",
    header: ({ column }) => <SortingButton text="Usuario" column={column} />,
    cell: ({ row }) => row.getValue("userId"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const loan = row.original;
      return <RowActions loan={loan} />;
    },
    enableHiding: false,
  },
];
