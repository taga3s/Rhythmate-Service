import dayjs from "dayjs";
import { now } from "../pkg/dayjs";

export const getStartAndEndUTCDateTime = () => {
  const nowUTC = dayjs(now()).format();
  const nowUTCDayNum = dayjs(nowUTC).day();

  const startUTC = dayjs(nowUTC).subtract(nowUTCDayNum, "d").hour(15).minute(0).second(0).format();

  const endUTC = dayjs(startUTC).add(6, "d").hour(15).minute(0).second(0).format();

  return { startUTC, endUTC };
};
