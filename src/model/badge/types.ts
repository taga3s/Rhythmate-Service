export type Badge = {
  id: string;
  badgeId: string;
  obtainedAt: string;
  isPinned: boolean;
  unlockable: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type BadgeWithDetail = Badge & {
  name: string;
  description: string;
  imageType: string;
};
