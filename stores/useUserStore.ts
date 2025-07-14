import { loginWithEmail } from '@/features/auth/api/login';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '../lib/firebase';
import { createAsyncStorage } from './storage';

type UserState = {
  uid: string | null;
  email: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const storage = createAsyncStorage();

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      uid: null,
      email: null,
      login: async (email, password) => {
        const uid = await loginWithEmail({ email, password });

        await storage.setItem('user-auth-store', { uid, email });

        set({ uid, email });
      },
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
