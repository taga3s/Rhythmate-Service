import { getUpdatedLevelAndExp } from "./exp";

describe("cron時", () => {
  it("現状の経験値:100, 獲得経験値:200", () => {
    const { updatedLevel, updatedExp } = getUpdatedLevelAndExp(100, 200);
    expect({ updatedLevel, updatedExp }).toStrictEqual({
      updatedLevel: 3,
      updatedExp: 300,
    });
  });
  it("現状の経験値:400, 獲得経験値:100", () => {
    const { updatedLevel, updatedExp } = getUpdatedLevelAndExp(400, 100);
    expect({ updatedLevel, updatedExp }).toStrictEqual({
      updatedLevel: 3,
      updatedExp: 500,
    });
  });
});
