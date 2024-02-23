export type WeeklyReport = {
  id: string;
  completedQuests: number;
  failedQuests: number;
  completedPercentage: number;
  completedDays: number;
  completedQuestsEachDay: number[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};