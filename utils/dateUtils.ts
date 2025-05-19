export const dateUtils = {
  getCurrentYear: () => new Date().getFullYear(),
  format: (date: Date | string) => {
    const parsedDate = new Date(date);

    return {
      dateTime: parsedDate.toLocaleString("en-US", dateUtils.dateTimeOptions),
      dateOnly: parsedDate.toLocaleString("en-US", dateUtils.dateOptions),
      timeOnly: parsedDate.toLocaleString("en-US", dateUtils.timeOptions),
    };
  },

  dateTimeOptions: {
    month: "short",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as Intl.DateTimeFormatOptions,

  dateOptions: {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
  } as Intl.DateTimeFormatOptions,

  timeOptions: {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as Intl.DateTimeFormatOptions,
};
