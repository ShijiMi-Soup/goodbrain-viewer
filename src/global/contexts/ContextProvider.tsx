import { ReactNode } from "react";
import {
  DataCategoryContextProvider,
  DataConfigsContextProvider,
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
        <DataConfigsContextProvider>
          <DataCategoryContextProvider>
            <GBFocusDataContextProvider>{children}</GBFocusDataContextProvider>
          </DataCategoryContextProvider>
        </DataConfigsContextProvider>
      </TimeWidthContextProvider>
    </TimeStartContextProvider>
  );
};
