"use client";
import SortingButton from "@/components/SortingButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAvatarUrl } from "@/lib/getAvatarUrl";
import { Loan } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./RowActions";

export const columns: ColumnDef<
  Loan & {
    book: { title: string; author: string; coverImage: string | null };
    user: { name: string | null; email: string; status: string };
  }
>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.id.slice(16, 25),
    enableHiding: false,
  },
  {
    accessorKey: "book",
    accessorFn: (row) => row.book.title,
    header: ({ column }) => <SortingButton text="Libro" column={column} />,
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          {row.original.book.title}
        </PopoverTrigger>
        <PopoverContent className="w-fit max-w-48">
          <div className="flex flex-col justify-center">
            <img
              src={row.original.book.coverImage || "/no_cover.webp"}
              alt={row.original.book.title}
              className="w-40 aspect-square object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {row.original.book.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {row.original.book.author}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    accessorKey: "user",
    accessorFn: (row) => row.user.name ?? row.user.email,
    header: ({ column }) => <SortingButton text="Usuario" column={column} />,
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          {row.original.user.name ?? row.original.user.email}
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <div className="flex flex-row justify-center items-center gap-6">
            <img
              src={getAvatarUrl(row.original.user.email)}
              alt="avatar"
              className="w-20 aspect-square rounded-full"
            />
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold">
                  {row.original.user.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {row.original.user.email}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Estado: {row.original.user.status}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortingButton text="Estado" column={column} />,
    cell: ({ row }) => {
      return (
        <span
          className={`text-sm ${
            row.original.status === "ACTIVE"
              ? "text-green-600"
              : row.original.status === "RETURNED"
              ? "text-yellow-600"
              : row.original.status === "OVERDUE"
              ? "text-red-600"
              : row.original.status === "CANCELLED"
              ? "text-gray-600"
              : ""
          }`}
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortingButton text="Fecha de creación" column={column} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("es-ES");
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <SortingButton text="Fecha de devolución" column={column} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"));
      return date.toLocaleDateString("es-ES");
    },
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
