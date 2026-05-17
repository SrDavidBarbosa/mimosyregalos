import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mimos y Regalos',
  description: 'Cestas y regalos personalizados',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-800">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pink-100 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-pink-700">
            Mimos y Regalos
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/catalog" className="hover:text-pink-600">
              Catálogo
            </Link>
            <Link href="/cart" className="hover:text-pink-600">
              Carrito
            </Link>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-white border-t border-pink-100 text-center py-6 text-sm text-slate-500">
          © {year} Mimos y Regalos — Hecho con cariño
        </footer>
      </body>
    </html>
  );
}