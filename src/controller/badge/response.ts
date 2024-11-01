import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type AchieveBadgeResponse = schemaHelper.ResponseData<"/badges/:id", "patch">;

export type ListBadgesResponse = schemaHelper.ResponseData<"/badges", "get">;

export type PinBadgeResponse = schemaHelper.ResponseData<"/badges/pin/:id", "patch">;

export type UnpinBadgeResponse = schemaHelper.ResponseData<"/badges/unpin/:id", "patch">;

type BadgeBaseResponse = {
  badge_id: string;
  name: string;
  description: string;
  image_type: "bow" | "cat" | "crown" | "gem" | "horse" | "shield" | "sword";
  frame_color: "bronze" | "silver" | "gold";
  obtained_at: string;
  unlockable: boolean;
  is_pinned: boolean;
};

export const toBadgeBaseResponse = (obj: {
  id: string;
  name: string;
  description: string;
  imageType: string;
  frameColor: string;
  obtainedAt: string;
  unlockable: boolean;
  isPinned: boolean;
}): BadgeBaseResponse => {
  return {
    badge_id: obj.id,
    name: obj.name,
    description: obj.description,
    image_type: obj.imageType as "bow" | "cat" | "crown" | "gem" | "horse" | "shield" | "sword",
    frame_color: obj.frameColor as "bronze" | "silver" | "gold",
    obtained_at: obj.obtainedAt,
    unlockable: obj.unlockable,
    is_pinned: obj.isPinned,
  };
};
