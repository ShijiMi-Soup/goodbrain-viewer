import { ReactNode } from "react";
import {
  DataCategoryContextProvider,
  DataSelectionContextProvider,
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
        <DataSelectionContextProvider>
          <DataCategoryContextProvider>
            <GBFocusDataContextProvider>{children}</GBFocusDataContextProvider>
          </DataCategoryContextProvider>
        </DataSelectionContextProvider>
      </TimeWidthContextProvider>
    </TimeStartContextProvider>
  );
};
