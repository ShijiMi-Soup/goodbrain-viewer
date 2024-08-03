import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TimeWidthContextType = [number, Dispatch<SetStateAction<number>>];
export const TimeWidthContext = createContext<TimeWidthContextType | null>(
  null
);

export const useTimeWidthContext = () => {
  const context = useContext(TimeWidthContext);
  if (!context) {
    throw new Error(
      "useTimeWidthContext must be used within a TimeWidthContextProvider"
    );
  }
  return context;
};
