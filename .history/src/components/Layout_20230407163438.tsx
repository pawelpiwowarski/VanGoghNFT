import React, { useContext } from 'react';
import {  ConnectKitButton } from "connectkit";
import { useNetwork } from 'wagmi'

type LayoutProps = {
    children : React.ReactNode
  }
    const Layout=  (props: LayoutProps)=> {



    return (
    <div>
        <nav className="flex items-center justify-between flex-wrap p-6 " >
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>


          <ConnectKitButton  showBalance={true} 
          
          />
     
  
    </nav>
    {props.children}
        </div>

    );
    }

    export default Layout;