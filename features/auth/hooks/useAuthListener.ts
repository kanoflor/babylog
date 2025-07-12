import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../../lib/firebase';

/**
 * Check if the user is logged in or not.
 */
export const useAuthListener = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // First loading flag

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { user, loading };
};
