import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type AchieveBadgeResponse = schemaHelper.ResponseData<"/badges/:id", "patch">;

export type ListBadgesResponse = schemaHelper.ResponseData<"/badges", "get">;

export type PinBadgeResponse = schemaHelper.ResponseData<"/badges/pin/:id", "patch">;

export type UnpinBadgeResponse = schemaHelper.ResponseData<"/badges/unpin/:id", "patch">;
