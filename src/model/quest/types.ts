export type Quest = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  startedAt: string;
  minutes: number;
  tagId: string;
  difficulty: string;
  state: string;
  isSucceeded: boolean;
  continuationLevel: number;
  days: string[];
  weeklyFrequency: number;
  weeklyCompletionCount: number;
  totalCompletionCount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
