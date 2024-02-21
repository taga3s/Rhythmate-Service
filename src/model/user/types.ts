export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Quest = {
  id: string;
  title: string;
  description: string;
  startsAt: Date;
  startedAt: Date;
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
}

// export interface UserModel { }