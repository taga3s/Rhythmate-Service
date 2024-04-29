import * as schemaHelper from "../../pkg/schemaHelper";

export type ListWeeklyReportResponse = schemaHelper.ResponseData<"/weekly-reports", "get">;

export type GetWeeklyReportFeedBackResponse = schemaHelper.ResponseData<
  "/weekly-reports/feedback/:weeklyReportId",
  "get"
>;

export type GenerateWeeklyReportFeedBackResponse = schemaHelper.ResponseData<
  "/weekly-reports/feedback/:weeklyReportId",
  "post"
>;
