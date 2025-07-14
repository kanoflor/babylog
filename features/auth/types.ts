import { User as FirebaseUser } from 'firebase/auth';

export interface User extends FirebaseUser {
  familyId: string;
  createdAt: number;
}
