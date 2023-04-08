import React, { useContext } from 'react';
import {  ConnectKitButton } from "connectkit";
import Link from 'next/link';


type LayoutProps = {
  children : React.ReactNode
}

const Layout=  (props: LayoutProps)=> {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap p-6">
        <Link href="/" className="flex items-center flex-shrink-0 text-white mr-6">
          <img src='/images/0.png' className="rounded-full w-14 h-14 ml-auto" />
        </Link>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>
        <ConnectKitButton showBalance={true} />
      </nav>
      {props.children}
    </div>
  );
}

export default Layout;
