import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import { WaveformViewerPage } from "./pages";

function App() {
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <WaveformViewerPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
