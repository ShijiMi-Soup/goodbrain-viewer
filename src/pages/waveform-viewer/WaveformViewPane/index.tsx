import * as d3 from "d3";
import { Stack, SxProps } from "@mui/material";
import { LineChart } from "../../../components/charts";
import { useElementSize } from "../../../global";
import { Controls } from "./Controls";
import {
  useGBFocusDataContext,
  useTimeStartContext,
  useTimeWidthContext,
} from "../../../global/contexts";

export type WaveformViewPaneProps = {
  sx?: SxProps;
};
export const WaveformViewPane = ({ sx }: WaveformViewPaneProps) => {
  const [{ width, height }, containerRef] = useElementSize();
  const [gbFocusData] = useGBFocusDataContext();
  const [timeStart] = useTimeStartContext();
  const [timeWidth] = useTimeWidthContext();

  // useEffect(() => {
  //   d3.csv("/brainwave_2024-08-03 09:13.csv").then((data) => {
  //     console.log(data);
  //     setCsvData(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (csvData) {
  //     // Crop csv data based on timeStart and timeWidth
  //     // TODO: Start here!!
  //     const newData = csvData.filter(
  //       (d) => +d.time >= timeStart && +d.time <= timeStart + timeWidth
  //     );
  //     setCsvData(newData);
  //   }
  // }, [timeStart, timeWidth, csvData]);

  return (
    <Stack direction="column" width="80%" height="100%">
      <Stack
        ref={containerRef}
        sx={{ ...sx }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <LineChart data={gbFocusData} width={width} height={height} />
      </Stack>
      <Controls sx={{ width: "100%" }} />
    </Stack>
  );
};
