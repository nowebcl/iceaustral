import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ice Austral Congelados | Mariscos y Pescados en Puerto Montt',
  description: 'Mariscos, pescados y productos congelados seleccionados para tu negocio y tu hogar en Puerto Montt y la Región de Los Lagos. Frescura del sur, siempre a tu mesa.',
  keywords: ['Ice Austral', 'congelados Puerto Montt', 'salmon congelado', 'mariscos congelados', 'pescados chiloe', 'piures', 'choritos', 'camarones'],
  openGraph: {
    title: 'Ice Austral Congelados - Puerto Montt',
    description: 'Productos congelados de máxima calidad para tu negocio y hogar.',
    images: ['/IMAGENES/portada.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/IMAGENES/logo.png" />
      </head>
      <body className="antialiased selection:bg-[#0e4da4] selection:text-white">
        {children}
      </body>
    </html>
  );
}
