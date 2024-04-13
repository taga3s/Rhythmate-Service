import dayjs from "dayjs";
import { now } from "../pkg/dayjs";

export const getStartAndEndUTCDateTime = () => {
  const nowUTC = dayjs(now()).format();
  const nowUTCDayNum = dayjs(nowUTC).day();

  const subtractNum = nowUTCDayNum === 0 && dayjs(nowUTC).hour() < 15 ? 7 : nowUTCDayNum;
  const startUTC = dayjs(nowUTC).subtract(subtractNum, "d").hour(15).minute(0).second(0).format();

  const endUTC = dayjs(startUTC).add(6, "d").hour(15).minute(0).second(0).format();

  return { startUTC, endUTC };
};
