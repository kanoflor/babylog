import { useUserStore } from '@/stores/useUserStore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../../lib/firebase';

/**
 * Check if the user is logged in or not.
 */
export const useAuthListener = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // First loading flag

  const loginWithFirebaseUser = useUserStore(s => s.loginWithFirebaseUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async firebaseUser => {
      setUser(firebaseUser);
      if (firebaseUser) {
        console.log('firebaseUser', firebaseUser);
        await loginWithFirebaseUser(firebaseUser.uid, firebaseUser.email ?? '');
      }
      setLoading(false);
    });

    return () => unsub();
  }, [loginWithFirebaseUser]);

  return { user, loading };
};

const firebaseUser = {
  _redirectEventId: undefined,
  apiKey: 'AIzaSyCqFEwUsxVAIL5ALExZbpP19lyIUmLyAxk',
  appName: '[DEFAULT]',
  createdAt: '1752348812970',
  displayName: undefined,
  email: 'test3@gmail.com',
  emailVerified: false,
  isAnonymous: false,
  lastLoginAt: '1752483095896',
  phoneNumber: undefined,
  photoURL: undefined,
  providerData: [[Object]],
  stsTokenManager: {
    accessToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE4ZGY2MmQzYTBhNDRlM2RmY2RjYWZjNmRhMTM4Mzc3NDU5ZjliMDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmFieWxvZy01ZTlmZiIsImF1ZCI6ImJhYnlsb2ctNWU5ZmYiLCJhdXRoX3RpbWUiOjE3NTI0ODMwOTUsInVzZXJfaWQiOiJiQldDNHJ5R3R0ZnQ0QzV6bW9yUE5jdU12SUoyIiwic3ViIjoiYkJXQzRyeUd0dGZ0NEM1em1vclBOY3VNdklKMiIsImlhdCI6MTc1MjQ5OTUxNiwiZXhwIjoxNzUyNTAzMTE2LCJlbWFpbCI6InRlc3QzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0M0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.WNoS5y7r0fvrUe9lcFzXNVBdH_gHGw2-cPhKMIPNxyspGmUoSoxKPyh2F0fEKRx7qApMyQUkFX_jpldufl0L_H6Ik_NoODzGe1W9_KObI-yRotSBAGFRfwqq1oaS3xd3ZSfhZ2lH7hrYov3URaHmSNSA1c00gi2FTMptqS-0P7FZHuBA-9T5BJKQCiXV-lUItd5e3wYW70DdiHGjj9kPqJCckl2glXeeDyzjIShm2qbCim-B43uLhSXr0xESCgxAZRIqhK0p_iatnNjZCJk16HyYLmBckHixa_or0qT3rCkYrnDcuHelUiHAhhKkV_4mvsxRk3rDLJj2pMGm8sHV_Q',
    expirationTime: 1752503116619,
    refreshToken:
      'AMf-vBy5fhUQ42hAcduLPrTJ7X6SYWKL0ejEvUZkHHMxr3UNukqPFtu5zGh162FVWJ3jv3cngCpjUmpt4VMLyBwyVeDZ8iEJOKbN_A8rrcawIPWy1C60wNm1jn2a2OyksFxQ83lOsrjAwU-ppZcxtTdBwHxlYz3N9_HeebHvKyuhD2Bza22KIyB-a4n743CWyEQP_4T5DsiW',
  },
  tenantId: undefined,
  uid: 'bBWC4ryGttft4C5zmorPNcuMvIJ2',
};
