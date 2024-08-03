export type AxisRange = [number, number];
export const timeConfToXConf = (timeStart: number, timeWidth: number) => {
  const xRange = [timeStart, timeStart + timeWidth];
  return xRange as AxisRange;
};
