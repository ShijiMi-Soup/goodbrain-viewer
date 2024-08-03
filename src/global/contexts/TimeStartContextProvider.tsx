import { useState } from "react";
import { INIT_TIME_START } from "../constants";
import { TimeStartContext } from "./TimeStartContext";

export type TimeStartContextProviderProps = {
  children: React.ReactNode;
};
export const TimeStartContextProvider = ({
  children,
}: TimeStartContextProviderProps) => {
  const [timeStart, setTimeStart] = useState(INIT_TIME_START);

  return (
    <TimeStartContext.Provider value={[timeStart, setTimeStart]}>
      {children}
    </TimeStartContext.Provider>
  );
};
