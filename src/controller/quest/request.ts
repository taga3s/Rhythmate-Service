import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type CreateQuestRequest = schemaHelper.RequestData<"/quests", "post">;

export type UpdateQuestRequest = schemaHelper.RequestData<"/quests/:id", "patch">;
