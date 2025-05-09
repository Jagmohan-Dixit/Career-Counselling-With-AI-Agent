"use client"

import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from '@/store/store';
import LayoutInitializer from "./LayoutInitializer"

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children, showFooter = true }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#BCBCBC]`}>
        <Provider store={store}>
          <LayoutInitializer />
          <Navbar />
          <main className='pt-10 bg-white'>
            {children}
            <Toaster />
          </main>
          {showFooter && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
