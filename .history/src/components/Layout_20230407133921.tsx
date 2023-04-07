import React, { useContext } from 'react';
import { useAccount } from "wagmi";

import Link from 'next/link';

type LayoutProps = {
    children : React.ReactNode
  }
    const Layout=  (props: LayoutProps)=> {
      const { address, isConnecting, isDisconnected } = useAccount();

    if (isConnecting) {
      return <div>Loading...</div>;
    }




    return (
    <div>
        <nav className="flex items-center justify-between flex-wrap p-6 " >
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>
          <Link href="/"> Home </Link>

<p>{address} </p>

  
    </nav>
    {props.children}
        </div>

    );
    }

    export default Layout;