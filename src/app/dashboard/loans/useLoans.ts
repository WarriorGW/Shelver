import { Loan } from "@prisma/client";
import { create } from "zustand";

interface LoansStore {
  isOpen: boolean;
  selectedLoan: Loan;
  refetchLoans: () => void;
  openDialog: (loan: Loan) => void;
  closeDialog: () => void;
  setRefetch: (fn: () => void) => void;
}

export const useLoansStore = create<LoansStore>((set) => ({
  isOpen: false,
  selectedLoan: {} as Loan,
  refetchLoans: () => {},
  openDialog: (loan) => set({ isOpen: true, selectedLoan: loan }),
  closeDialog: () => set({ isOpen: false, selectedLoan: {} as Loan }),
  setRefetch: (fn) => set({ refetchLoans: fn }),
}));
