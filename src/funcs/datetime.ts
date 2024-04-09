import dayjs from "dayjs";
import { now } from "../pkg/dayjs";

export const getStartAndEndUTCDateTime = () => {
  const nowUTC = now();

  const dayOfTheWeekNumber = dayjs(nowUTC).day();
  const sundayUTC = dayjs(nowUTC)
    .add(6 - dayOfTheWeekNumber, "d")
    .hour(15)
    .minute(0)
    .second(0)
    .format();

  return { nowUTC, sundayUTC };
};
