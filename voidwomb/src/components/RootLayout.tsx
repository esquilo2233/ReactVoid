import React, { ReactNode } from 'react';
import Navbar from '../components/nav';
import Footer from '../components/footer'
import { SpeedInsights } from '@vercel/speed-insights/next';
import 'react-toastify/dist/ReactToastify.css';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div>
            <Navbar/>
            <SpeedInsights />
            <main>{children}</main>
            <Footer/>
        </div>
    );
}
