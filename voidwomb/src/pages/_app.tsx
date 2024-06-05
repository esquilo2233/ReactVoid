import React from 'react'
import { SessionProvider } from 'next-auth/react'
import RootLayout from '../components/RootLayout'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RootLayout>
        <Component {...pageProps} />
        <ToastContainer />
      </RootLayout>
    </SessionProvider>
  )
}

export default MyApp