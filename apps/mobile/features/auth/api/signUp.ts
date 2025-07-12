import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../../../lib/firebase';

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user.uid;
  const familyId = uuidv4();

  await setDoc(doc(db, 'users', uid), {
    email,
    familyId,
    createdAt: serverTimestamp(),
  });

  return { uid, familyId };
};
