import { Stack } from "@mui/material";
import { DataSelectionPane } from "./DataSelectionPane";
import { WaveformViewPane } from "./WaveformViewPane";

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
      <WaveformViewPane
        sx={{ flex: 1, bgcolor: "#f4f4f4", overflowX: "auto" }}
      />
      <DataSelectionPane sx={{ height: "100%", width: 200, flex: 1 }} />
    </Stack>
  );
};
