import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import * as chains from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import "src/styles/globals.css";

const defaultChain = process.env.DEFAULT_CHAIN! as keyof typeof chains;

const { provider, webSocketProvider } = configureChains(
  [chains[defaultChain]],
  [
    // publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.RPC_HTTP_URL!,
        webSocket: process.env.RPC_WS_URL!,
      }),
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({
      chains: [chains[defaultChain]],
      options: {
        shimDisconnect: true,
      },
    }),
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
