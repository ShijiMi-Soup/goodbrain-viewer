import { Stack, Typography } from "@mui/material";
import { constants } from "../../global";

export const Header = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" p={1}>
      <Typography variant="h1">{constants.texts.SITE_TITLE}</Typography>
    </Stack>
  );
};
