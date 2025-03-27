import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="bg-black w-full" style={{ backgroundColor: "black" }}>
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo Section */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/img/logosemfundo.png" alt="Voidwomb Logo" width={100} height={100} />
        </Link>

        {/* Center Menu Section */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8">
            <li>
              <Link href="/Home" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link href="/store" className="text-white hover:text-gray-300">Store</Link>
            </li>
            <li>
              <Link href="/concept" className="text-white hover:text-gray-300">Concept</Link>
            </li>
            <li>
              <Link href="/rituals" className="text-white hover:text-gray-300">Rituals</Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
            </li>
            {session?.user && session.user.is_staff && (
              <li>
                <Link href="/Adm/Home" className="text-white hover:text-gray-300">Admin</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {session?.user ? (
            <button onClick={() => signOut()} className="text-white hover:text-gray-300">Logout</button>
          ) : (
            <>
              <Link href="/auth/signin" className="text-white hover:text-gray-300">Login</Link>
              <Link href="/auth/signup" className="text-white hover:text-gray-300">Sign Up</Link>
            </>
          )}
          <Link href="/cart" className="text-white hover:text-gray-300">
            <div className="flex items-center">
              <Image src="/img/cart.png" alt="Cart" className="w-6 h-6 filter invert" width={24} height={24} />
              <span id="cart-total" className="ml-2"></span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
