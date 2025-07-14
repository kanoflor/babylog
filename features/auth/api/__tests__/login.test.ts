import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginWithEmail, type LoginInput } from '../login';

jest.mock('firebase/app', () => ({
  FirebaseError: class MockFirebaseError extends Error {
    code: string;

    constructor(code: string, message: string) {
      super(message);
      this.code = code;
      this.name = 'FirebaseError';
    }
  },
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('@/lib/firebase', () => ({
  auth: {},
}));

import { FirebaseError } from 'firebase/app';

const mockSignInWithEmailAndPassword =
  signInWithEmailAndPassword as jest.MockedFunction<
    typeof signInWithEmailAndPassword
  >;

describe('loginWithEmail', () => {
  const validInput: LoginInput = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('successful login', () => {
    it('should return user uid when login is successful', async () => {
      const mockUserUid = 'user-123';
      const mockResult = { user: { uid: mockUserUid } };

      mockSignInWithEmailAndPassword.mockResolvedValueOnce(mockResult as any);

      const result = await loginWithEmail(validInput);

      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        validInput.email,
        validInput.password
      );
      expect(result).toBe(mockUserUid);
    });

    it('should call signInWithEmailAndPassword with correct parameters', async () => {
      const mockResult = { user: { uid: 'test-uid' } };
      mockSignInWithEmailAndPassword.mockResolvedValueOnce(mockResult as any);

      await loginWithEmail(validInput);

      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        validInput.email,
        validInput.password
      );
    });
  });

  describe('Firebase error handling', () => {
    it('should throw custom error for user-not-found', async () => {
      const firebaseError = new FirebaseError(
        'auth/user-not-found',
        'User not found'
      );
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(firebaseError);

      await expect(loginWithEmail(validInput)).rejects.toThrow(
        'Invalid email or password'
      );
    });

    it('should throw custom error for wrong-password', async () => {
      const firebaseError = new FirebaseError(
        'auth/wrong-password',
        'Wrong password'
      );
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(firebaseError);

      await expect(loginWithEmail(validInput)).rejects.toThrow(
        'Invalid email or password'
      );
    });

    it('should throw custom error for too-many-requests', async () => {
      const firebaseError = new FirebaseError(
        'auth/too-many-requests',
        'Too many requests'
      );
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(firebaseError);

      await expect(loginWithEmail(validInput)).rejects.toThrow(
        'Too many attempts. Please try again later'
      );
    });

    it('should throw generic error for other Firebase errors', async () => {
      const firebaseError = new FirebaseError(
        'auth/network-request-failed',
        'Network error'
      );
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(firebaseError);

      await expect(loginWithEmail(validInput)).rejects.toThrow(
        'Login failed. Please try again'
      );
    });

    it('should throw generic error for unknown Firebase error codes', async () => {
      const firebaseError = new FirebaseError(
        'auth/unknown-error',
        'Unknown error'
      );
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(firebaseError);

      await expect(loginWithEmail(validInput)).rejects.toThrow(
        'Login failed. Please try again'
      );
    });
  });

  describe('non-Firebase error handling', () => {
    it('should re-throw non-Firebase errors as-is', async () => {
      const networkError = new Error('Network connection failed');
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(networkError);

      await expect(loginWithEmail(validInput)).rejects.toThrow(networkError);
    });

    it('should re-throw generic errors without modification', async () => {
      const genericError = new Error('Something went wrong');
      mockSignInWithEmailAndPassword.mockRejectedValueOnce(genericError);

      await expect(loginWithEmail(validInput)).rejects.toThrow(genericError);
    });
  });
});
