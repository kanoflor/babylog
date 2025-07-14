import { CategoryKey } from './config/categoryConfig';

export type LogEntry = {
  id: string;
  uid: string;
  category: CategoryKey;
  loggedAt: number; // Time when the log was logged
  createdAt: number; // Time when the log was created
  memo?: string;
  author?: string;
};
