
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './context/Providers';
import './layout.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vendofy - Tienda Online',
  description: 'Un sistema de ventas hecho con Next.js y LocalStorage',
};

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2025 Vendofy. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} main-body`}>
        <Providers>
          <main className="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
