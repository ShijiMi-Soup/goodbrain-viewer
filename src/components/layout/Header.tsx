import { Stack, Typography } from "@mui/material";
import { SITE_TITLE } from "../../global";

export const Header = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" p={1}>
      <Typography variant="h1">{SITE_TITLE}</Typography>
    </Stack>
  );
};
