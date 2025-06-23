"use client";

import DrawerDialog from "@/components/DrawerDialog";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Ban,
  CircleCheck,
  CircleMinus,
  CirclePlus,
  Edit,
  Ellipsis,
} from "lucide-react";
import { useState } from "react";
import { blockUser, deleteUser, getUsers } from "./actions";
import UserForm from "./UserForm";

function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsers();
    },
  });

  const blockMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await blockUser(userId);
    },
    onSuccess: () => {
      users.refetch();
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await deleteUser(userId);
    },
    onSuccess: () => {
      users.refetch();
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  return (
    <>
      <DrawerDialog
        title="Editar usuario"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <UserForm
          user={selectedUser!}
          closeDialog={() => setIsOpen(false)}
          refetchUsers={users.refetch}
        />
      </DrawerDialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Ultima sesion</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data?.map((user) => {
            return (
              <TableRow
                key={user.id}
                className={
                  user.status === "DISABLED"
                    ? "bg-red-100 hover:bg-red-200/70"
                    : user.status === "BLOCKED"
                    ? "bg-yellow-100 hover:bg-yellow-200/70"
                    : ""
                }
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name ? user.name : "Sin nombre"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.lastLogin?.toDateString()}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedUser(user);
                        }}
                      >
                        <Edit /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          blockMutation.mutate(user.id);
                        }}
                        disabled={user.status === "DISABLED"}
                      >
                        {user.status === "BLOCKED" ? (
                          <>
                            <CircleCheck /> Desbloquear
                          </>
                        ) : (
                          <>
                            <Ban /> Bloquear
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant={
                          user.status === "ACTIVE" || user.status === "BLOCKED"
                            ? "destructive"
                            : "default"
                        }
                        className={cn("", {
                          "text-green-500! *:[svg]:!text-green-500 hover:bg-green-500/10!":
                            user.status === "DISABLED",
                        })}
                        onClick={() => {
                          deleteMutation.mutate(user.id);
                        }}
                      >
                        {user.status === "DISABLED" ? (
                          <>
                            <CirclePlus /> Habilitar
                          </>
                        ) : (
                          <>
                            <CircleMinus /> Desactivar
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default Users;
