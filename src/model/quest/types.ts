export type Quest = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  startedAt: string;
  minutes: number;
  tagId: string;
  difficulty: string;
  isDone: boolean;
  startDate: Date;
  endDate: Date;
  dates: string[];
  weeklyFrequency: number;
  weeklyCompletionCount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

// export interface UserModel { }
