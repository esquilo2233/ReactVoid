import React from 'react';
import RootLayout from '../components/RootLayout'; 
import type { AppProps } from 'next/app';
import { createClient } from '@supabase/supabase-js';
import '../styles/globals.css'

const supabaseUrl = 'https://xvupdpyrhxklhnuouotb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dXBkcHlyaHhrbGhudW91b3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNDI3NTMsImV4cCI6MjAzMDgxODc1M30.M7vHG3h65drHjW00LmeZ-HbFV-kNuZySIc3W8RKSmds';

export const supabase = createClient(supabaseUrl, supabaseKey);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    );
}

export default MyApp;