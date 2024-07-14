import { teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: teal,
    mode: "light",
  },
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
});
