import { Loan } from "@prisma/client";
import { create } from "zustand";

interface LoansStore {
  isOpen: boolean;
  selectedLoan: Loan & {
    book: { title: string; author: string; coverImage: string | null };
    user: { name: string | null; email: string; status: string };
  };
  refetchLoans: () => void;
  openDialog: (
    loan: Loan & {
      book: { title: string; author: string; coverImage: string | null };
      user: { name: string | null; email: string; status: string };
    }
  ) => void;
  closeDialog: () => void;
  setRefetch: (fn: () => void) => void;
}

export const useLoansStore = create<LoansStore>((set) => ({
  isOpen: false,
  selectedLoan: {} as Loan & {
    book: { title: string; author: string; coverImage: string | null };
    user: { name: string | null; email: string; status: string };
  },
  refetchLoans: () => {},
  openDialog: (loan) => set({ isOpen: true, selectedLoan: loan }),
  closeDialog: () =>
    set({
      isOpen: false,
      selectedLoan: {} as Loan & {
        book: { title: string; author: string; coverImage: string | null };
        user: { name: string | null; email: string; status: string };
      },
    }),
  setRefetch: (fn) => set({ refetchLoans: fn }),
}));
