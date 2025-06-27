"use client";

import DrawerDialog from "@/components/DrawerDialog";
import DataTable from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUsers } from "./actions";
import { columns } from "./columns";
import UserForm from "./UserForm";
import { useUsersStore } from "./useUsers";

function Users() {
  const { isOpen, selectedUser, closeDialog, setRefetch } = useUsersStore();

  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsers();
    },
  });

  useEffect(() => {
    setRefetch(users.refetch);
  }, [users.refetch, setRefetch]);

  return (
    <>
      <DrawerDialog
        title="Editar usuario"
        isOpen={isOpen}
        setIsOpen={closeDialog}
      >
        <UserForm user={selectedUser} closeDialog={closeDialog} />
      </DrawerDialog>
      <DataTable
        columns={columns}
        data={users.data ?? []}
        getRowClassName={(row) => {
          const status = row.original.status;
          if (status === "DISABLED") return "bg-red-100 hover:bg-red-200/70";
          if (status === "BLOCKED")
            return "bg-yellow-100 hover:bg-yellow-200/70";
          return "";
        }}
      />
    </>
  );
}

export default Users;
