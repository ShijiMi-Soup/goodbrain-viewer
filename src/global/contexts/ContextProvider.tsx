import { ReactNode } from "react";
import {
  GBFocusDataContextProvider,
  TimeStartContextProvider,
  TimeWidthContextProvider,
} from "./contexts";

export type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  return (
    <TimeStartContextProvider>
      <TimeWidthContextProvider>
        <GBFocusDataContextProvider>{children}</GBFocusDataContextProvider>
      </TimeWidthContextProvider>
    </TimeStartContextProvider>
  );
};
