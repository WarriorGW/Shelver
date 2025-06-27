"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./RowActions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.id.slice(16, 25),
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => row.getValue("role"),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => row.getValue("status"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <RowActions user={user} />;
    },
  },
];
