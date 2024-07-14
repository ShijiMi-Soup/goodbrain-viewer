import { cyan } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: cyan,
    mode: "light",
  },
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
});
