
'use client'
import { useEffect, useState } from "react";



import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { getCookie } from "cookies-next";
// import { useState } from "react";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Minzo Africa - Healthcare Directory",
//   description: "Find trusted healthcare",
// };
// const queryClient = new QueryClient();
// const queryCache = new QueryCache();

export default function RootLayout({ children }: LayoutProps<"/">) {
  const queryClient = new QueryClient();
  // const [isAuthenticated, setIsAuthenticated] = useState< boolean | null >(null);
  // useEffect(() => {
  //   const token = getCookie("minzo_token");
  //   if
  //   setIsAuthenticated(!!token);
  // }, []);
  // if(isAuthenticated === null) return null;
  return (
    <html
      lang="en"
      className={`${arimo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryClientProvider client={queryClient} >
          <Navbar />   
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer/>
        </QueryClientProvider>
      </body>
    </html>
  );
}

