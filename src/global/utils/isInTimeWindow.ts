import { TimeWindow } from "../types";

export const isInTimeWindow = (time: number, timeWindow: TimeWindow) => {
  return (
    time >= timeWindow.start && time <= timeWindow.start + timeWindow.width
  );
};
