export type Badge = {
  id: string;
  badgeId: string;
  obtainedAt: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type BadgeWithDetail = {
  id: string;
  badgeId: string;
  name: string;
  description: string;
  obtainedAt: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
