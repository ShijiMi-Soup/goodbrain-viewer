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
  //   if (csvData) {
  //     // Crop csv data based on timeStart and timeWidth
  //     // TODO: Start here!!
  //     const newData = gbFocusData.filter(
  //       (d) => +d.time >= timeStart && +d.time <= timeStart + timeWidth
  //     );
  //     setCsvData(newData);
  //   }
  // }, [timeStart, timeWidth, gbFocusData]);

  return (
    <Stack direction="column" width="80%" height="100%">
      <Stack
        ref={containerRef}
        sx={{ ...sx }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <LineChart
          data={gbFocusData}
          timeWindow={{ start: timeStart, width: timeWidth }}
          width={width}
          height={height}
        />
      </Stack>
      <Controls sx={{ width: "100%" }} />
    </Stack>
  );
};
