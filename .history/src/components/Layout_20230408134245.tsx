import React, { useContext } from 'react';
import {  ConnectKitButton } from "connectkit";
import Link from 'next/link';

type LayoutProps = {
  children : React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wra p-6">
        <Link href="/" className="flex items-center flex-shrink-0 text-2xl font-bold text-black mr-6">
          My Website
        </Link>
        <div className="w-full block lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-4">
              Home
            </Link>
          </div>
          <ConnectKitButton showBalance={true}/>
        </div>
      </nav>
      {props.children}
    </div>
  );
}

export default Layout;
