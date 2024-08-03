import { createCustomContext } from "./_createCustomContext";
import { DataCategory, DataSelection, GBFocusData } from "../types";
import { constants } from "..";

export const [useTimeStartContext, TimeStartContextProvider] =
  createCustomContext<number>(
    constants.controls.INIT_TIME_START,
    (newState) => newState >= 0
  );

export const [useTimeWidthContext, TimeWidthContextProvider] =
  createCustomContext<number>(
    constants.controls.INIT_TIME_WIDTH,
    (newState) => newState >= 0
  );

export const [useGBFocusDataContext, GBFocusDataContextProvider] =
  createCustomContext<GBFocusData>(constants.data.INIT_GBFOCUS_DATA);

export const [useDataSelectionContext, DataSelectionContextProvider] =
  createCustomContext<DataSelection>(constants.data.INIT_DATA_SELECTION);

export const [useDataCategoryContext, DataCategoryContextProvider] =
  createCustomContext<DataCategory>(constants.data.INIT_DATA_CATEGORY);
