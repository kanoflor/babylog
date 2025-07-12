import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import uuid from 'react-native-uuid';

export type SignUpInput = {
  email: string;
  password: string;
};

export const signUp = async ({ email, password }: SignUpInput) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  const uid = cred.user.uid;
  const familyId = uuid.v4();

  await setDoc(doc(db, 'users', uid), {
    email,
    familyId,
    createdAt: serverTimestamp(),
  });

  return { uid, familyId };
};
