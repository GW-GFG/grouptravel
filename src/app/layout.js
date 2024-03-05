// import poppins fonts from fonts.js to use them in our app (poppins by default)
import { poppins } from './fonts';
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className={poppins.className}>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
            </StoreProvider>
          </body>
      </html>
  );
}
