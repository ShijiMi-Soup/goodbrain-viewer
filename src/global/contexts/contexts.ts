import { createCustomContext } from "./_contextFactory";
import { GBFocusData } from "../types";
import {
  INIT_GBFOCUS_DATA,
  INIT_TIME_START,
  INIT_TIME_WIDTH,
} from "../constants";

export const {
  Context: TimeStartContext,
  useCustomContext: useTimeStartContext,
  ContextProvider: TimeStartContextProvider,
} = createCustomContext<number>(INIT_TIME_START, (newState) => newState >= 0);

export const {
  Context: TimeWidthContext,
  useCustomContext: useTimeWidthContext,
  ContextProvider: TimeWidthContextProvider,
} = createCustomContext<number>(INIT_TIME_WIDTH, (newState) => newState > 0);

//
// GB Focus Data Contexts -----

export const {
  Context: GBFocusDataContext,
  useCustomContext: useGBFocusDataContext,
  ContextProvider: GBFocusDataContextProvider,
} = createCustomContext<GBFocusData>(INIT_GBFOCUS_DATA);
