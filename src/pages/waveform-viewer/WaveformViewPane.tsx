import * as d3 from "d3";
import { Stack, SxProps } from "@mui/material";
import { LineChart } from "../../components/charts";
import { useElementSize } from "../../global";
import { useEffect, useState } from "react";

export type WaveformViewPaneProps = {
  sx?: SxProps;
};
export const WaveformViewPane = ({ sx }: WaveformViewPaneProps) => {
  const [{ width, height }, containerRef] = useElementSize();
  const [csvData, setCsvData] = useState<d3.DSVRowArray<string>>();

  useEffect(() => {
    d3.csv("/Dummy_Brain_Wave_Data.csv").then((data) => {
      setCsvData(data);
    });
  }, []);

  return (
    <Stack
      ref={containerRef}
      sx={{ ...sx }}
      alignItems="center"
      justifyContent="flex-end"
    >
      <LineChart data={csvData} width={width} height={height} />
    </Stack>
  );
};
