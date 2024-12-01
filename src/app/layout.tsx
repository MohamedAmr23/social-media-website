'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import {Roboto} from 'next/font/google'
import theme from "@/Theme";
import Navbar from "./_Components/Navbar/page.tsx";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../redux/store.ts";
import { Toaster } from "react-hot-toast";


const roboto = Roboto({
 weight: ['300', '400', '500', '700'],
 subsets: ['latin'],
 display: 'swap',
 variable: '--font-roboto',
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({children}:{children:ReactNode}){
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Navbar/>
              <Container maxWidth={'sm'} sx={{pt:10}}>
                {children}
              </Container>
              <Toaster/>
          </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
};

 

