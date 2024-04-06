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

export type PinBadgeResponse = BaseResponse & {
  status: string;
};

export type UnpinBadgeResponse = BaseResponse & {
  status: string;
};
