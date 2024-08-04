import { Stack, SxProps } from "@mui/material";
import { LineChart } from "../../../components/charts";
import { BrainWaveDataKey, useElementSize } from "../../../global";
import { Controls } from "./Controls";
import {
  useDataCategoryContext,
  useDataConfigsContext,
  useGBFocusDataContext,
  useTimeStartContext,
  useTimeWidthContext,
} from "../../../global/contexts";
import { useState, useEffect } from "react";

export type WaveformViewPaneProps = {
  sx?: SxProps;
};
export const WaveformViewPane = ({ sx }: WaveformViewPaneProps) => {
  const [{ width, height }, containerRef] = useElementSize();
  const [gbFocusData] = useGBFocusDataContext();
  const [timeStart] = useTimeStartContext();
  const [timeWidth] = useTimeWidthContext();
  const [dataCategory] = useDataCategoryContext();
  const [dataConfigs] = useDataConfigsContext();

  const [, setSelectedDataKeys] = useState<BrainWaveDataKey[]>([]);

  useEffect(() => {
    const configs = dataConfigs[dataCategory];
    const selectedDataKeys = Object.entries(configs)
      .filter(([, value]) => value.show)
      .map(([key]) => key);

    setSelectedDataKeys(selectedDataKeys as BrainWaveDataKey[]);
  }, [gbFocusData, dataConfigs, dataCategory]);

  return (
    <Stack direction="column" width="80%" height="100%">
      <Stack
        ref={containerRef}
        sx={{ ...sx }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <LineChart
          timeWindow={{ start: timeStart, width: timeWidth }}
          width={width}
          height={height}
        />
      </Stack>
      <Controls sx={{ width: "100%" }} />
    </Stack>
  );
};
