import * as schemaHelper from "../../pkg/schemaHelper";

export type CreateQuestRequest = schemaHelper.RequestData<"/quests", "post">;

export type UpdateQuestRequest = schemaHelper.RequestData<"/quests/:id", "patch">;
