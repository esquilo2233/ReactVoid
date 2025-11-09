import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateAuthState = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        const staff = localStorage.getItem('is_staff') === 'true';
        const email = localStorage.getItem('user_email') || '';
        
        setIsAuthenticated(!!token);
        setIsStaff(staff);
        setUserEmail(email);
      }
    };

    updateAuthState();

    // Fechar dropdown ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Atualizar estado quando a rota mudar (após login)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const staff = localStorage.getItem('is_staff') === 'true';
      const email = localStorage.getItem('user_email') || '';
      
      setIsAuthenticated(!!token);
      setIsStaff(staff);
      setUserEmail(email);
    }
  }, [router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('is_staff');
    document.cookie = 'auth_token=; path=/; max-age=0';
    setIsAuthenticated(false);
    setIsStaff(false);
    setUserEmail('');
    router.push('/');
  };

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
              <Link href="/" className="text-white hover:text-gray-300">Home</Link>
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
            {isStaff && (
              <li>
                <Link href="/admin" className="text-white hover:text-gray-300">Admin</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <div className="relative dropdown-container">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-white hover:text-gray-300 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{userEmail}</p>
                  </div>
                  <Link
                    href="/client"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Área de Cliente
                  </Link>
                  {isStaff && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowDropdown(false)}
                    >
                      Painel Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
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
