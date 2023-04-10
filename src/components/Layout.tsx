import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-2xl font-bold text-black mr-6">
          <Link href="/">
            Home
          </Link>
          <span className="mx-2">|</span>
          <Link href="/future">
            Future
          </Link>
        </div>
        <div className="w-full block lg:flex lg:items-center lg:w-auto">
          <ConnectKitButton showBalance={true}/>
        </div>
      </nav>
      {props.children}
    </div>
  );
}

export default Layout;
