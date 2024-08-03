import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import { ContextProvider } from "./global/contexts/ContextProvider.tsx";

export const Main = () => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <ContextProvider>
          <App />
        </ContextProvider>
      </ThemeProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
