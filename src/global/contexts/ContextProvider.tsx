import { ReactNode } from "react";
import { TimeStartContextProvider } from "./TimeStartContextProvider";
import { TimeWidthContextProvider } from "./TimeWidthContextProvider";

export type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  return (
    <TimeStartContextProvider>
      <TimeWidthContextProvider>{children}</TimeWidthContextProvider>
    </TimeStartContextProvider>
  );
};
