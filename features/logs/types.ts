import { CategoryKey } from './config/categoryConfig';

export type LogData = {
  formula?: {
    amount: number; // milliliters
  };
  // 将来的に他のカテゴリ用のデータも追加可能
};

export type LogEntry = {
  id: string;
  uid: string;
  category: CategoryKey;
  loggedAt: number; // Time when the log was logged
  createdAt: number; // Time when the log was created
  memo?: string;
  author?: string;
  data?: LogData;
};
