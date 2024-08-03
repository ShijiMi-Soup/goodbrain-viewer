import { useState } from "react";
import { INIT_TIME_WIDTH } from "../constants";
import { TimeWidthContext } from "./TimeWidthContext";

export type TimeWidthContextProviderProps = {
  children: React.ReactNode;
};
export const TimeWidthContextProvider = ({
  children,
}: TimeWidthContextProviderProps) => {
  const [timeWidth, setTimeWidth] = useState(INIT_TIME_WIDTH);

  return (
    <TimeWidthContext.Provider value={[timeWidth, setTimeWidth]}>
      {children}
    </TimeWidthContext.Provider>
  );
};
