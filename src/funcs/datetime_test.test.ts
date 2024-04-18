import { getStartAndEndUTCDateTime } from "./datetime_test";

describe("サインアップ時", () => {
  it("2024-04-08T09:30:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-08T09:30:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-09T12:30:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-09T12:30:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-10T15:00:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-10T15:00:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-11T17:30:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-11T17:30:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-12T22:30:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-12T22:30:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-13T03:30:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-13T03:30:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-14T06:00:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-14T06:00:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-14T14:30:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-14T14:30:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-14T15:30:00+00:00にサインアップした場合", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-14T15:30:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-14T15:00:00+00:00",
      endUTC: "2024-04-20T15:00:00+00:00",
    });
  });
});

describe("cron時", () => {
  it("2024-04-07T15:00:00+00:00のジョブ", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-07T15:00:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-07T15:00:00+00:00",
      endUTC: "2024-04-13T15:00:00+00:00",
    });
  });
  it("2024-04-14T15:00:00+00:00のジョブ", () => {
    const { startUTC, endUTC } = getStartAndEndUTCDateTime("2024-04-14T15:00:00+00:00");
    expect({ startUTC, endUTC }).toStrictEqual({
      startUTC: "2024-04-14T15:00:00+00:00",
      endUTC: "2024-04-20T15:00:00+00:00",
    });
  });
});
