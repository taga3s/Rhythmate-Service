import { formatDateTimeOnlyDate, getNextSunday, now } from "../../pkg/dayjs";

const getStartAndEndUtcDateTime = () => {
  const dateNowUtc = formatDateTimeOnlyDate(now());
  const nextSundayUtc = getNextSunday(dateNowUtc);
  return { dateNowUtc, nextSundayUtc };
};

export { getStartAndEndUtcDateTime };
