import { Stack, SxProps } from "@mui/material";

export type ControlsProps = {
  sx?: SxProps;
};
export const Controls = ({ sx }: ControlsProps) => {
  return (
    <Stack bgcolor="lime" sx={{ ...sx }}>
      Controls
    </Stack>
  );
};
