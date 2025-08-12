"use client";
import DrawerDialog from "@/components/DrawerDialog";
import DataTable from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getLoans } from "./actions";
import { columns } from "./columns";
import LoanForm from "./LoanForm";
import { useLoansStore } from "./useLoans";
function Loans() {
  const { isOpen, selectedLoan, closeDialog, setRefetch } = useLoansStore();
  const [addOpen, setAddOpen] = useState(false);
  const loans = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      return await getLoans();
    },
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    setRefetch(loans.refetch);
  }, [loans.refetch, setRefetch]);

  return (
    <div className="flex flex-col gap-8">
      <DrawerDialog
        btnText="Agregar prestamo"
        title="Agregar prestamo"
        isOpen={addOpen}
        setIsOpen={setAddOpen}
      >
        <LoanForm closeDialog={closeDialog} />
      </DrawerDialog>
      <DrawerDialog
        title="Editar Prestamos"
        isOpen={isOpen}
        setIsOpen={closeDialog}
      >
        <LoanForm loan={selectedLoan} closeDialog={closeDialog} />
      </DrawerDialog>
      <DataTable columns={columns} data={loans.data ?? []} />
    </div>
  );
}

export default Loans;
