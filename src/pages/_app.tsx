import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig, createClient } from "wagmi";  
import { ConnectKitProvider, getDefaultClient,SIWESession } from "connectkit";
import { polygon } from "wagmi/chains";
import { api } from "../utils/api";
import { siweClient } from "../utils/siweClient";

import "../styles/globals.css";

const alchemyId = process.env.ALCHEMY_ID;
const client = createClient(
  getDefaultClient({
    chains: [polygon],
    appName: "Van Gogh Dapp",
    alchemyId,
  }),
);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    
    <WagmiConfig client={client}>

<siweClient.Provider
  enabled={true} // defaults true
  nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
  sessionRefetchInterval={300000}// in milliseconds, defaults to 5 minutes
  signOutOnDisconnect={true} // defaults true
  signOutOnAccountChange={true} // defaults true
  signOutOnNetworkChange={true} // defaults true
  onSignIn={(session?: SIWESession) => null}
  onSignOut={() => null}
  >
      <ConnectKitProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </ConnectKitProvider>
    </siweClient.Provider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);