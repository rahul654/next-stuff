'use client';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux"
import store from '../redux/store';
import "./styles/common.css"
import { Navbar } from "@/nihon/app/components/navbar/NavigationBar";

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

// not allowed in use client
// export const metadata: Metadata = {
//   title: "Rahul's Next Stuff",
//   description: "Rahul's Next Stuff",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Rahul's Next Stuff</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} no-select antialiased mt-[60px]`}
      >
        <Navbar />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
