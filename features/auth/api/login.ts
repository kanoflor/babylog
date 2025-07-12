import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export type LoginInput = {
  email: string;
  password: string;
};

export const loginWithEmail = async ({ email, password }: LoginInput) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user.uid;
};
