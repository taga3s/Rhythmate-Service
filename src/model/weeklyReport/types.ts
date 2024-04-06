export type WeeklyReport = {
  id: string;
  completedQuests: number;
  failedQuests: number;
  completedPercentage: number;
  completedDays: number;
  completedQuestsEachDay: number[];
  failedQuestsEachDay: number[];
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
