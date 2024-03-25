import { getNextSunday, now } from "../../pkg/dayjs";

const getStartAndEndUtcDateTime = () => {
  const dateNowUtc = now();
  const nextSundayUtc = getNextSunday(dateNowUtc).format();
  return { dateNowUtc, nextSundayUtc };
};

export { getStartAndEndUtcDateTime };
