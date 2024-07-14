import { Stack } from "@mui/material";
import { DataSelectionPane } from "./DataSelectionPane";
import { WaveformViewPane } from "./WaveformViewPane";
import { Controls } from "./Controls";

export const WaveformViewerPage = () => {
  return (
    <Stack
      flex={1}
      p={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="row" flex={1} width="100%">
        <WaveformViewPane sx={{ flex: 1 }} />
        <DataSelectionPane />
      </Stack>
      <Controls sx={{ width: "100%" }} />
    </Stack>
  );
};
