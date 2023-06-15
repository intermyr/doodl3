import { WagmiConfig } from "wagmi";
import config from "./utils/wagmiConf";
import { AppShell, Box, MantineProvider } from "@mantine/core";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <WagmiConfig config={config}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <AppShell
          sx={{
            padding: "0 10px",
          }}
          fixed
          header={<Header />}
        >
          <Box sx={{ margin: "auto", maxWidth: "1200px" }}>
            <Outlet />
          </Box>
        </AppShell>
      </MantineProvider>
    </WagmiConfig>
  );
}

export default App;
