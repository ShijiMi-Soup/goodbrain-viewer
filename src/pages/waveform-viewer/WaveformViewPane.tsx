import { Stack, SxProps } from "@mui/material";

export type WaveformViewPaneProps = {
  sx?: SxProps;
};
export const WaveformViewPane = ({ sx }: WaveformViewPaneProps) => {
  return (
    <Stack bgcolor="cyan" sx={{ ...sx }}>
      WaveformViewPane
    </Stack>
  );
};
