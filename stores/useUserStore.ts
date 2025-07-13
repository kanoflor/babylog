import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '../lib/firebase';
import { createAsyncStorage } from './storage';

type UserState = {
  uid: string | null;
  email: string | null;
  login: (uid: string, email: string) => void;
  logout: () => void;
};

const storage = createAsyncStorage();

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      uid: null,
      email: null,
      login: (uid, email) => set({ uid, email }),
      logout: async () => {
        set({ uid: null, email: null });

        // Clear Firebase auth state
        await signOut(auth);

        // Clear Zustand store
        await storage.removeItem('user-auth-store');

        router.replace('/login');
      },
    }),
    {
      name: 'user-auth-store',
      storage,
    }
  )
);
