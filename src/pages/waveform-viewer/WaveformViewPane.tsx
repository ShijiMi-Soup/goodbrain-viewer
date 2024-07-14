import { Stack, SxProps } from "@mui/material";

export type WaveformViewPaneProps = {
  sx?: SxProps;
};
export const WaveformViewPane = ({ sx }: WaveformViewPaneProps) => {
  return (
    <Stack sx={{ ...sx }} alignItems="center" justifyContent="center">
      WaveformViewPane
    </Stack>
  );
};
