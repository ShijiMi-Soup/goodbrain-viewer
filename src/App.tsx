import { Stack } from "@mui/material";
import { WaveformViewerPage } from "./pages";
import { Footer, Header } from "./components/layout";

function App() {
  return (
    <div>
      <Stack height="100dvh" maxHeight="100dvh" direction="column">
        <Header />
        <Stack flex={1} direction="column">
          <Stack flex={1}>
            <WaveformViewerPage />
          </Stack>
          <Footer />
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
