export const currencyformatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

export const formatCurrency = (amount: number | string | null) => {
  const num = Number(amount);

  if (isNaN(num))
    throw new Error("Value is not a valid number or numeric string");

  return currencyformatter.format(num);
};
