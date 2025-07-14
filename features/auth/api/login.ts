import { auth } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

export type LoginInput = {
  email: string;
  password: string;
};

export const loginWithEmail = async ({ email, password }: LoginInput) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user.uid;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          throw new Error('Invalid email or password');
        case 'auth/too-many-requests':
          throw new Error('Too many attempts. Please try again later');
        default:
          throw new Error('Login failed. Please try again');
      }
    }
    throw error;
  }
};
