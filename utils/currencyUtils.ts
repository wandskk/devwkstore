export const currencyUtils = {
  format: (amount: number | string | null) => {
    const num = Number(amount);

    if (isNaN(num))
      throw new Error("Value is not a valid number or numeric string");

    return currencyUtils.currencyformatter.format(num);
  },
  currencyformatter: new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  }),
};
