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


          <ConnectKitButton />
     
  
    </nav>
    {props.children}
        </div>

    );
    }

    export default Layout;