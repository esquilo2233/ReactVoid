// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="bg-black border-gray-200 dark:bg-gray-900 z-50 relative" style={{ backgroundColor: "black" }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" passHref>
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <Image src="/img/logosemfundo.png" alt="Voidwomb Logo" width={50} height={50} />
          </div>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-black md:dark:bg-black dark:border-gray-700">
            <li>
              <Link href="/Home" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white">Home</Link>
            </li>
            <li>
              <Link href="/store" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white">Store</Link>
            </li>
            <li>
              <Link href="/concept" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white">Concept</Link>
            </li>
            <li>
              <Link href="/rituals" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white">Rituals</Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white">Contact</Link>
            </li>
            {session?.user && session.user.is_staff && (
              <li>
                <Link href="/Adm/Home" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white">Admin</Link>
              </li>
            )}
            {session?.user && (
              <li>
                <button onClick={() => signOut()} className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white">Logout</button>
              </li>
            )
              
            }
                
            <li>
              <Link href="/cart" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <div className="flex items-center">
                  <Image src="/img/cart.png" alt='' className="w-6 h-6 filter invert" width={24} height={24}/>
                  <span id="cart-total" className="ml-2"></span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
