import './globals.css';

export const metadata = {
  title: 'Mimos y Regalos',
  description: 'Cestas y regalos personalizados',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-800">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pink-100 px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-lg font-semibold text-pink-700">
            Mimos y Regalos
          </a>

          <nav className="flex items-center gap-4 text-sm">
            <a href="/catalog" className="hover:text-pink-600">Catálogo</a>
            <a href="/cart" className="hover:text-pink-600">Carrito</a>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-white border-t border-pink-100 text-center py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Mimos y Regalos — Hecho con cariño
        </footer>
      </body>
    </html>
  );
}