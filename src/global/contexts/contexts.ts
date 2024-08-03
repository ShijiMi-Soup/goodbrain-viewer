import { createCustomContext } from "./_createCustomContext";
import { GBFocusData } from "../types";
import { constants } from "..";

export const {
  Context: TimeStartContext,
  useCustomContext: useTimeStartContext,
  ContextProvider: TimeStartContextProvider,
} = createCustomContext<number>(
  constants.controls.INIT_TIME_START,
  (newState) => newState >= 0
);

export const {
  Context: TimeWidthContext,
  useCustomContext: useTimeWidthContext,
  ContextProvider: TimeWidthContextProvider,
} = createCustomContext<number>(
  constants.controls.INIT_TIME_WIDTH,
  (newState) => newState >= 0
);

//
// GB Focus Data Contexts -----

export const {
  Context: GBFocusDataContext,
  useCustomContext: useGBFocusDataContext,
  ContextProvider: GBFocusDataContextProvider,
} = createCustomContext<GBFocusData>(constants.data.INIT_GBFOCUS_DATA);
