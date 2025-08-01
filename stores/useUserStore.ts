import { loginWithEmail } from '@/features/auth/api/login';
import { signOut } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '../lib/firebase';
import { createAsyncStorage } from './storage';

type UserState = {
  user: { uid: string | null; email: string | null };
  login: (email: string, password: string) => Promise<void>;
  loginWithFirebaseUser: (uid: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const storage = createAsyncStorage();

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: { uid: null, email: null },
      login: async (email, password) => {
        const uid = await loginWithEmail({ email, password });

        await storage.setItem('user-auth-store', { uid, email });

        set({ user: { uid, email } });
      },
      loginWithFirebaseUser: async (uid: string, email: string) => {
        await storage.setItem('user-auth-store', { uid, email });

        set({ user: { uid, email } });
      },
      logout: async () => {
        set({ user: { uid: null, email: null } });

        // Clear Firebase auth state
        await signOut(auth);

        // Clear Zustand store
        await storage.removeItem('user-auth-store');
      },
    }),
    {
      name: 'user-auth-store',
      storage,
    }
  )
);
