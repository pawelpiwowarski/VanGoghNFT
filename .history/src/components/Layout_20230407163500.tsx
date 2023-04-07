import React, { useContext } from 'react';
import {  ConnectKitButton } from "connectkit";
import { useNetwork } from 'wagmi'

type LayoutProps = {
    children : React.ReactNode
  }
    const Layout=  (props: LayoutProps)=> {

      const { chain, chains } = useNetwork()


    return (
    <div>
        <nav className="flex items-center justify-between flex-wrap p-6 " >
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>

          {chain && <div>Connected to {chain.name}</div>}
         {chains && (
            <div>Available chains: {chains.map((chain) => chain.name)} 
            </div>
         )}
          <ConnectKitButton  showBalance={true} 
          
          />
     
  
    </nav>
    {props.children}
        </div>

    );
    }

    export default Layout;