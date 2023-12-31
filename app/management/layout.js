import { Inter } from 'next/font/google';
//import Providers from './providers';
import '@app/globals.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import AdminsNavbar from '@app/components/AdminsNavbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>       
          <AdminsNavbar />
          {children}
      </body>
    </html>
  );
};
