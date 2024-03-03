const getStartAndEndJstDateTime = () => {
  const dateNowObject = new Date();
  const nextSundayDateObject = new Date(
    dateNowObject.getFullYear(),
    dateNowObject.getMonth(),
    dateNowObject.getDate() + (6 - ((dateNowObject.getDay() + 6) % 7)),
  );
  const dateNowJst = dateNowObject.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const nextSundayJst = nextSundayDateObject.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  return { dateNowJst, nextSundayJst };
};

export { getStartAndEndJstDateTime };
