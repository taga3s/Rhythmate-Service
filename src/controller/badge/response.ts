type BadgeBaseResponse = {
  badge_id: string;
  name: string;
  description: string;
  image_type: string;
  frame_color: string;
  obtained_at: string;
  is_pinned: boolean;
  unlockable: boolean;
};

export type AchieveBadgeResponse = BadgeBaseResponse & {
  status: string;
};

export type ListBadgesResponse = {
  status: string;
  badgesWithDetail: BadgeBaseResponse[];
};

export type PinBadgeResponse = BadgeBaseResponse & {
  status: string;
};

export type UnpinBadgeResponse = BadgeBaseResponse & {
  status: string;
};
