
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './context/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vendofy - Tienda Online',
  description: 'Un sistema de ventas hecho con Next.js y LocalStorage',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
