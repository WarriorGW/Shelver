"use client";
import DrawerDialog from "@/components/DrawerDialog";
import DataTable from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getLoans } from "./actions";
import { columns } from "./columns";
import { useLoansStore } from "./useLoans";
function Loans() {
  const { isOpen, selectedLoan, closeDialog, setRefetch } = useLoansStore();
  const loans = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      return await getLoans();
    },
  });
  useEffect(() => {
    setRefetch(loans.refetch);
  }, [loans.refetch, setRefetch]);

  return (
    <>
      <DrawerDialog
        title="Editar Prestamos"
        isOpen={isOpen}
        setIsOpen={closeDialog}
      >
        <>Form de prestamos</>
      </DrawerDialog>
      <DataTable columns={columns} data={loans.data ?? []} />
    </>
  );
}

export default Loans;
