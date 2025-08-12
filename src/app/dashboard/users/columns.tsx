"use client";

import SortingButton from "@/components/SortingButton";
import { localeCompareSortingFn } from "@/lib/sortingFunctions";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./RowActions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.id.slice(16, 25),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortingButton text="Nombre" column={column} />,
    cell: ({ row }) => row.getValue("name"),
    sortingFn: localeCompareSortingFn,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortingButton text="Email" column={column} />,
    // header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <SortingButton text="Rol" column={column} />,
    cell: ({ row }) => row.getValue("role"),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortingButton text="Estado" column={column} />,
    // header: "Estado",
    cell: ({ row }) => row.getValue("status"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <RowActions user={user} />;
    },
    enableHiding: false,
  },
];
