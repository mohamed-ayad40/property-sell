import React from "react";
import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import 'photoswipe/dist/photoswipe.css'
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";

export const metadata = {
  title: "PropertyPulse | Find the perfect rental",
  description: "Find your dream rental proprety",
  keywords: "rental, find rentals, find properties",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <GlobalProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  );
};

export default MainLayout;
