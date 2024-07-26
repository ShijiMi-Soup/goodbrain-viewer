import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import { WaveformViewerPage } from "./pages";
import { Footer, Header } from "./components/layout";

function App() {
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />

        <Stack height="100dvh" maxHeight="100dvh" direction="column">
          <Header />
          <Stack flex={1} direction="column">
            <Stack flex={1}>
              <WaveformViewerPage />
            </Stack>
            <Footer />
          </Stack>
        </Stack>
      </ThemeProvider>
    </div>
  );
}

export default App;
