import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      login: () => set({ isAuth: true }),
      logout: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage', 
    }
  )
);
