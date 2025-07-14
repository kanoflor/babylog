import { useUserStore } from '@/stores/useUserStore';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../../lib/firebase';

/**
 * Check if the user is logged in or not.
 */
export const useAuthListener = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true); // First loading flag

  const loginWithFirebaseUser = useUserStore(s => s.loginWithFirebaseUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async firebaseUser => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await loginWithFirebaseUser(firebaseUser.uid, firebaseUser.email ?? '');
      }
      setLoading(false);
    });

    return () => unsub();
  }, [loginWithFirebaseUser]);

  return { user, loading };
};
