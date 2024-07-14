import { Stack, Typography } from "@mui/material";
import { FOOTER_TEXT } from "../../global";

export const Footer = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" p={1}>
      <Typography>{FOOTER_TEXT}</Typography>
    </Stack>
  );
};
