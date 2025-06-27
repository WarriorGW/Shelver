import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import {
  Ban,
  CircleCheck,
  CircleMinus,
  CirclePlus,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { blockUser, deleteUser } from "./actions";
import { useUsersStore } from "./useUsers";

function RowActions({ user }: { user: User }) {
  const { openDialog, refetchUsers } = useUsersStore();

  const blockMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await blockUser(userId);
    },
    onSuccess: () => {
      refetchUsers();
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
      refetchUsers();
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
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
              openDialog(user);
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
    </>
  );
}

export default RowActions;
