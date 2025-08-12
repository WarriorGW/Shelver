import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loan } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { cancelLoan, returnLoan } from "./actions";
import { useLoansStore } from "./useLoans";

function RowActions({
  loan,
}: {
  loan: Loan & {
    book: { title: string; author: string; coverImage: string | null };
    user: { name: string | null; email: string; status: string };
  };
}) {
  const { openDialog, refetchLoans } = useLoansStore();

  const returnedMutation = useMutation({
    mutationFn: async () => {
      return await returnLoan(loan.id);
    },
    onSuccess: () => {
      refetchLoans();
    },
    onError: (error) => {
      console.error("Error returning loan:", error);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async () => {
      return await cancelLoan(loan.id);
    },
    onSuccess: () => {
      refetchLoans();
    },
    onError: (error) => {
      console.error("Error cancelling loan:", error);
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
              openDialog(loan);
            }}
          >
            <Edit /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => returnedMutation.mutate()}
            disabled={loan.status === "CANCELLED" || loan.status === "RETURNED"}
          >
            <Check /> Devuelto
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => cancelMutation.mutate()}
            disabled={loan.status === "CANCELLED" || loan.status === "RETURNED"}
          >
            <Trash2 /> Cancelar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default RowActions;
