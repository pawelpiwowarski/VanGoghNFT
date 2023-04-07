import React, { useContext } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';

type LayoutProps = {
    children : React.ReactNode
  }
    const Layout=  (props: LayoutProps)=> {
    const { data: sessionData, status } = useSession();
    console.log(sessionData)
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return (
    <div>
        <nav className="flex items-center justify-between flex-wrap p-6 " >
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>
          <Link href="/"> Home </Link>

<p>{sessionData?.user.name} </p>

  
    </nav>
    {props.children}
        </div>

    );
    }

    export default Layout;