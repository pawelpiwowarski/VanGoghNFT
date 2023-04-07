import React, { useContext } from 'react';
import { useAccount } from "wagmi";
import {  ConnectKitButton } from "connectkit";

import Link from 'next/link';

type LayoutProps = {
    children : React.ReactNode
  }
    const Layout=  (props: LayoutProps)=> {
      const { address, isConnecting, isDisconnected } = useAccount();






    return (
    <div>
        <nav className="flex items-center justify-between flex-wrap p-6 " >
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>
          <Link href="/"> Home </Link>

          <ConnectKitButton />
            {/* {isConnecting && <p>Connecting...</p>}
            {isDisconnected && <p className="text-2xl text-white"> Disconnected</p>} */}
            {/* {address && <p className="text-xl text-white">Connected to {address}</p>} */}

  
    </nav>
    {props.children}
        </div>

    );
    }

    export default Layout;