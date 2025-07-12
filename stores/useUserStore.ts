import { create } from 'zustand';

type UserState = {
  uid: string | null;
  login: (uid: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>(set => ({
  uid: null,
  login: uid => set({ uid }),
  logout: () => set({ uid: null }),
}));
