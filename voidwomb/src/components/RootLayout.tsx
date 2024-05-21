import React, { ReactNode } from 'react';
import Navbar from '../components/nav';
import Footer from '../components/footer'
interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}
