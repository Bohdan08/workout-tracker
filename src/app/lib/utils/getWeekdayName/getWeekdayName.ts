const getWeekdayName = (value?: Date | string) => {
  const date = value ? new Date(value) : new Date();
  const day = date.getDay();

  return WEEKDAY_NAMES[day];
};

export default getWeekdayName;

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
