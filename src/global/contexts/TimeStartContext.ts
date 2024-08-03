import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TimeStartContextType = [number, Dispatch<SetStateAction<number>>];
export const TimeStartContext = createContext<TimeStartContextType | null>(
  null
);

export const useTimeStartContext = () => {
  const context = useContext(TimeStartContext);
  if (!context) {
    throw new Error(
      "useTimeStartContext must be used within a TimeStartContextProvider"
    );
  }
  return context;
};
