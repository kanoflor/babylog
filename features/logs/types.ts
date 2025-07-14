export type LogEntry = {
  id: string;
  uid: string;
  category: string;
  loggedAt: number; // Time when the log was logged
  createdAt: number; // Time when the log was created
  memo?: string;
  author?: string;
};
