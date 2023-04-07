import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig, createClient, configureChains } from "wagmi"
import { mainnet, optimism, polygon, arbitrum } from '@wagmi/core/chains'
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { publicProvider } from "wagmi/providers/public"
import type { AppProps } from "next/app"
export const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
)
const client = createClient({
  autoConnect: true,
  provider,
})



const App ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiConfig>
  )
}

export default api.withTRPC(App);
