import { localhost } from "@wagmi/chains";
import { createConfig, configureChains, sepolia } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia, localhost],
  [
    infuraProvider({ apiKey: import.meta.env.VITE_INFURA_KEY }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `http://127.0.0.1:8545`,
      }),
    }),
  ]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default config;
