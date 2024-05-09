import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div>
            <header>
                <nav className="bg-black border-gray-200 dark:bg-gray-900 z-50 relative" style={{ backgroundColor: "black" }}>
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link href="/" passHref>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                                {/* Certifique-se de que a imagem está na pasta public */}
                                <Image src="/img/logosemfundo.png" alt="Voidwomb Logo" width={50} height={50} />
                            </div>
                        </Link>
                        {/* Botão de menu para telas menores */}
                        {/* Exemplo de navegação */}
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-black md:dark:bg-black dark:border-gray-700">
                                <li>
                                    <Link href="/store">Store</Link>
                                </li>
                                <li>
                                    <Link href="/concept">Concept</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Contact</Link>
                                </li>
                                <li>
                                  <Link href="/cart" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    <div className="flex items-center">
                                        <Image src="/img/cart.png" alt='' className="w-6 h-6 filter invert" width={24} height={24}/>
                                        <span id="cart-total" className="ml-2">itens</span>
                                    </div>
                                  </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main>{children}</main>
            <footer className="bg-black text-white shadow-md p-4 fixed bottom-0 left-0 w-full z-20">
              <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row justify-between items-center">
                  <span className="text-sm sm:text-center">© 2024 <a href="https://flowbite.com/" className="hover:underline">VoidWomb</a>. All Rights Reserved.</span>
                  <ul className="flex flex-wrap items-center mt-3 sm:mt-0 gap-4 text-sm">
                      <li>
                          <a href="https://www.instagram.com/voidwomb_band" className="hover:underline"><Image src="/img/footer/instagram.png" alt="" className="w-6 h-6 filter invert" width={24} height={24} /></a>
                      </li>
                      <li>
                          <a href="https://www.facebook.com/Voidwombband" className="hover:underline"><Image src="/img/footer/facebook (1).png" alt="" className="w-6 h-6 filter invert" width={24} height={24} /></a>
                      </li>
                      <li>
                          <a href="https://open.spotify.com/intl-pt/artist/3MicrcV6nGFpSrQeSNPtCE?autoplay=true" className="hover:underline"><Image src="/img/footer/spotify-logo.png" alt="" className="w-6 h-6 filter invert" width={24} height={24} /></a>
                      </li>
                      <li>
                          <a href="https://voidwomb.bandcamp.com/album/altars-of-cosmic-devotion-2" className="hover:underline"><Image src="/img/footer/bandcamp.png" alt="" className="w-8 h-8 filter invert" width={32} height={32} /></a>
                      </li>
                  </ul>
              </div>
          </footer>
      </div>
    );
}
