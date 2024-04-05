type BaseResponse = {
  badge_id: string;
  name: string;
  description: string;
  image_type: string;
  frame_color: string;
  obtained_at: string;
  is_pinned: boolean;
  unlockable: boolean;
};

export type AchieveBadgeResponse = BaseResponse & {
  status: string;
};

export type ListBadgesResponse = {
  status: string;
  badgesWithDetail: BaseResponse[];
};

export type PinBadgeResponse = {
  status: string;
  id: string;
  badge_id: string;
  name: string;
  description: string;
  image_type: string;
  obtained_at: string;
  is_pinned: boolean;
};

export type UnpinBadgeResponse = {
  status: string;
  id: string;
  badge_id: string;
  name: string;
  description: string;
  image_type: string;
  obtained_at: string;
  is_pinned: boolean;
};
