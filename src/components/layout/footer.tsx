import Link from "next/link";
import { Globe, Heart, Send, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-crema-dark border-t border-marron/10 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-xl font-extrabold text-primary tracking-tight">
              hola compa 🐾
            </span>
            <p className="text-sm text-marron/60 max-w-xs">
              Conectamos el amor con la responsabilidad. Ayudando a que cada mascota en Argentina encuentre el hogar que merece.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-marron">Compañía</h4>
            <Link href="/sobre-nosotros" className="text-sm text-marron/60 hover:text-primary transition-colors">Sobre nosotros</Link>
            <Link href="/contacto" className="text-sm text-marron/60 hover:text-primary transition-colors">Contáctanos</Link>
            <Link href="/blog" className="text-sm text-marron/60 hover:text-primary transition-colors">Blog</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-marron">Legales</h4>
            <Link href="/terminos" className="text-sm text-marron/60 hover:text-primary transition-colors">Términos y condiciones</Link>
            <Link href="/privacidad" className="text-sm text-marron/60 hover:text-primary transition-colors">Políticas de privacidad</Link>
            <Link href="/cookies" className="text-sm text-marron/60 hover:text-primary transition-colors">Cookies</Link>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="font-bold text-marron italic font-nunito-sans">Seguinos en redes</h4>
            <div className="flex items-center gap-4">
              <Link href="https://instagram.com" className="text-marron/60 hover:text-primary transition-colors">
                <Globe className="h-6 w-6" />
              </Link>
              <Link href="https://facebook.com" className="text-marron/60 hover:text-primary transition-colors">
                <Send className="h-6 w-6" />
              </Link>
              <Link href="https://tiktok.com" className="text-marron/60 hover:text-primary transition-colors">
                <MessageCircle className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-marron/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-marron/40 font-medium">
            Hola Compa © 2026 · LESO Tech
          </p>
          <div className="flex items-center gap-1 text-sm text-marron/40">
            Armado con mucho <Heart className="h-3 w-3 text-primary fill-primary" /> en Argentina
          </div>
        </div>
      </div>
    </footer>
  );
}
