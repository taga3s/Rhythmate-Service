export type AchieveBadgeResponse = {
  status: string;
  id: string;
  badge_id: string;
  obtained_at: string;
  is_pinned: boolean;
};

export type ListBadgesResponse = {
  status: string;
  badgesWithDetail: {
    id: string;
    badge_id: string;
    name: string;
    description: string;
    obtained_at: string;
    is_pinned: boolean;
  }[];
};

export type PinBadgeResponse = {
  status: string;
  id: string;
  badge_id: string;
  obtained_at: string;
  is_pinned: boolean;
};

export type UnpinBadgeResponse = {
  status: string;
  id: string;
  badge_id: string;
  obtained_at: string;
  is_pinned: boolean;
};
