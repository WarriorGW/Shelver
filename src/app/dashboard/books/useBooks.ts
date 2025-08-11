import { Book } from "@prisma/client";
import { create } from "zustand";

interface BooksStore {
  isOpen: boolean;
  selectedBook: Book;
  refetchBooks: () => void;
  openDialog: (book: Book) => void;
  closeDialog: () => void;
  setRefetch: (fn: () => void) => void;
}

export const useBooksStore = create<BooksStore>((set) => ({
  isOpen: false,
  selectedBook: {} as Book,
  refetchBooks: () => {},
  openDialog: (book) => set({ isOpen: true, selectedBook: book }),
  closeDialog: () => set({ isOpen: false, selectedBook: {} as Book }),
  setRefetch: (fn) => set({ refetchBooks: fn }),
}));
