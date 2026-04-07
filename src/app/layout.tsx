import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hola Compa 🐾 Encontrá a tu próximo mejor amigo",
  description: "La plataforma de adopción y marketplace para mascotas en Argentina. Conectamos adoptantes con refugios verificados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${nunitoSans.variable} font-sans antialiased bg-crema text-marron min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
