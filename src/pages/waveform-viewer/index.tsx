import { Stack } from "@mui/material";
import { DataSelectionPane } from "./DataSelectionPane";
import { WaveformViewPane } from "./WaveformViewPane";
import { Controls } from "./controls";

export const WaveformViewerPage = () => {
  return (
    <Stack
      flex={1}
      p={4}
      direction="row"
      flexWrap="nowrap"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="column" flex={1} height="100%">
        <WaveformViewPane sx={{ flex: 1, width: "100%", bgcolor: "cyan" }} />
        <Controls sx={{ width: "100%" }} />
      </Stack>
      <DataSelectionPane sx={{ height: "100%", width: 200 }} />
    </Stack>
  );
};
