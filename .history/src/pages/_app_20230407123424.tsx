import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig, createClient, configureChains } from "wagmi"
import { mainnet, optimism, polygon, arbitrum } from '@wagmi/core/chains'
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { publicProvider } from "wagmi/providers/public"
import { InjectedConnector } from 'wagmi/connectors/injected'

export const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
)
const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({chains})],
  provider,
})



const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WagmiConfig client={client}>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
