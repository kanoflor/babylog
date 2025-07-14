import { auth, db } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import uuid from 'react-native-uuid';

export type SignUpInput = {
  email: string;
  password: string;
};

export const signUp = async ({ email, password }: SignUpInput) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    const uid = cred.user.uid;
    const familyId = uuid.v4();

    await setDoc(doc(db, 'users', uid), {
      email,
      familyId,
      createdAt: serverTimestamp(),
    });

    return { uid, familyId };
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('Email is already registered');
        case 'auth/invalid-email':
          throw new Error('Invalid email address');
        case 'auth/weak-password':
          throw new Error(
            'Password is too weak. Please use at least 6 characters'
          );
        case 'auth/operation-not-allowed':
          throw new Error('Email/password accounts are not enabled');
        default:
          throw new Error('Failed to create account. Please try again');
      }
    }
    throw error;
  }
};
