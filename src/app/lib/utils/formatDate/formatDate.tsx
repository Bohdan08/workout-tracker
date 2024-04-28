interface Options {
  divider?: string;
  includeYear?: boolean;
}

const formatDate = (value?: string | Date, options?: Options) => {
  const { includeYear = true } = options || {};

  const formattedDate = value ? new Date(value) : new Date();
  // get date
  const dateNumber = formattedDate.getDate();

  // get month
  const monthIndex = formattedDate.getMonth();
  const monthName = MONTH_NAMES[monthIndex];

  // get year, which could be optional
  let yearValue = "";

  if (includeYear) {
    yearValue = includeYear ? `, ${formattedDate.getFullYear()}` : "";
  }

  // return `${dateNumber}${divider}${monthName}${yearValue}`;
  return `${monthName} ${dateNumber}${yearValue}`;
};

export default formatDate;

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
