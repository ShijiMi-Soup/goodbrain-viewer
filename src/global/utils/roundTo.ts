export const roundTo = (num: number, digit: number) => {
  const pow = Math.pow(10, digit);
  return Math.round(num * pow) / pow;
};
