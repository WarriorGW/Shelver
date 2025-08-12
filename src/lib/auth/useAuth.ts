import { User } from "@prisma/client";
import { create } from "zustand";
import { loginUser, logout, registerUser } from "./actions";
import { getCurrentUser } from "./sessions";

interface AuthState {
  user: User | null;
  loading: boolean;
  register: (formData: FormData) => Promise<void>;
  login: (formData: FormData) => Promise<void>;
  logout: () => Promise<void>;
  getSession: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  register: async (formData: FormData) => {
    await registerUser(formData);
    const user = await getCurrentUser(); // Server Action usable desde client
    set({ user, loading: false });
  },

  login: async (formData) => {
    await loginUser(formData);
    const user = await getCurrentUser(); // Server Action usable desde client
    set({ user, loading: false });
  },

  logout: async () => {
    await logout();
    set({ user: null, loading: false });
  },

  getSession: async () => {
    const { user } = get();
    if (user !== null) return;
    const newUser = await getCurrentUser();
    set({ user: newUser, loading: false });
  },
}));
