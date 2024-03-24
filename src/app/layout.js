// import poppins fonts from fonts.js to use them in our app (poppins by default)
import { poppins } from './fonts';
import "./globals.css";


import Header from "../components/Header";
// import Footer from "../components/Footer";

import StoreProvider from '.\storeProvider.jsx'

export const metadata = {
  title: "Group Travel",
  description: "Planification de votre voyage entre amis",
};

export default function RootLayout({ children }) {
  return (
      <html lang="fr">
      <body className={poppins.className}>
        <div className='bodybackground'></div>
      <StoreProvider>
        <Header />
        {children}
        {/*<Footer />*/}
        </StoreProvider>
      </body>
      </html>  
  );
}
