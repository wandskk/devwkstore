export const dateTimeOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  year: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  year: "numeric",
  day: "numeric",
};

export const timeOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const getCurrentYear = (): number => new Date().getFullYear();

export const formatDate = (date: Date | string) => {
  const parsedDate = new Date(date);

  return {
    dateTime: parsedDate.toLocaleString("en-US", dateTimeOptions),
    dateOnly: parsedDate.toLocaleString("en-US", dateOptions),
    timeOnly: parsedDate.toLocaleString("en-US", timeOptions),
  };
};
