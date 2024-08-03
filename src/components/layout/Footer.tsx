import { Stack, Typography } from "@mui/material";
import { constants } from "../../global";

export const Footer = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" p={1}>
      <Typography>{constants.texts.FOOTER_TEXT}</Typography>
    </Stack>
  );
};
