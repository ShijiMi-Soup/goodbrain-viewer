import { Stack, SxProps } from "@mui/material";
import { LineChart } from "../../../components/charts";
import { BrainWaveData, useElementSize } from "../../../global";
import { Controls } from "./Controls";
import {
  useDataCategoryContext,
  useDataSelectionContext,
  useGBFocusDataContext,
  useTimeStartContext,
  useTimeWidthContext,
} from "../../../global/contexts";
import { useState, useEffect } from "react";
import { DATA_CATEGORY_ITEMS } from "../../../global/constants/data";

export type WaveformViewPaneProps = {
  sx?: SxProps;
};
export const WaveformViewPane = ({ sx }: WaveformViewPaneProps) => {
  const [{ width, height }, containerRef] = useElementSize();
  const [gbFocusData] = useGBFocusDataContext();
  const [timeStart] = useTimeStartContext();
  const [timeWidth] = useTimeWidthContext();
  const [dataCategory] = useDataCategoryContext();
  const [dataSelection] = useDataSelectionContext();

  const [selectedDataKeys, setSelectedDataKeys] = useState<
    (keyof BrainWaveData)[]
  >([]);

  useEffect(() => {
    const categoryItems = DATA_CATEGORY_ITEMS[dataCategory];
    const selectedDataKeys = Object.entries(dataSelection)
      .filter(
        ([key, value]) =>
          value && categoryItems.includes(key as keyof BrainWaveData)
      )
      .map(([key]) => key);
    setSelectedDataKeys(selectedDataKeys as (keyof BrainWaveData)[]);
  }, [gbFocusData, dataSelection, dataCategory]);

  return (
    <Stack direction="column" width="80%" height="100%">
      <Stack
        ref={containerRef}
        sx={{ ...sx }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <LineChart
          selectedDataKeys={selectedDataKeys}
          timeWindow={{ start: timeStart, width: timeWidth }}
          width={width}
          height={height}
        />
      </Stack>
      <Controls sx={{ width: "100%" }} />
    </Stack>
  );
};
