import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Importación correcta de la fuente
import './globals.css';

// Configuración de la fuente Geist
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist', // Permite usarla en CSS/Tailwind si lo necesitas
});

export const metadata: Metadata = {
  title: 'Mi Aplicación',
  description: 'Creado con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}