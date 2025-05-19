export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
};

export const roundTwoDecimals = (value: number | string): number => {
  const num = Number(value);
  if (isNaN(num))
    throw new Error("Value is not a valid number or numeric string");
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
