import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    publicProvider(),
    alchemyProvider({
      apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
      stallTimeout: 1_000,
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RichEthExplorer",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
          appInfo={{
            appName: "RichEthExplorer",
            learnMoreUrl: "https://richardtom.site",
          }}
        >
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </Router>
  </React.StrictMode>
);
