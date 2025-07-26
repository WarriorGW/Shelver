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

// export const useAuth = create((set) => ({
//   user: null,
//   isLoading: true,

//   login: async (email: string, password: string) => {
//     const res = await fetch("/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//     });
//     if (res.ok) {
//       const user = await res.json();
//       set({ user, isLoading: false });
//     }
//   },

//   logout: async () => {
//     await fetch("/auth/logout", { method: "POST" });
//     set({ user: null });
//   },

//   getSession: async () => {
//     const res = await fetch("/auth/session");
//     if (res.ok) {
//       const user = await res.json();
//       set({ user, isLoading: false });
//     } else {
//       set({ user: null, isLoading: false });
//     }
//   },
// }));
