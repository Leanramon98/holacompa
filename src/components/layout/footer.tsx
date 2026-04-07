import Link from "next/link";
import { Facebook, Instagram, Mail, Send, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-container-low py-16 px-4 md:px-8 mt-20 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="text-2xl font-bold text-primary tracking-tighter">Hola Compa</div>
          <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">
            Conectando mascotas con sus humanos definitivos mediante tecnología y empatía. La estancia digital de mascotas líder en Argentina.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-secondary mb-8">Navegación</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/guia-adoptante" className="text-on-surface-variant hover:text-primary transition-colors">Guía del Adoptante</Link></li>
            <li><Link href="/sumar-refugio" className="text-on-surface-variant hover:text-primary transition-colors">Sumar mi Refugio</Link></li>
            <li><Link href="/comunidad" className="text-on-surface-variant hover:text-primary transition-colors">Blog de Crianza</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-secondary mb-8">Legal</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/terminos" className="text-on-surface-variant hover:text-primary transition-colors">Términos AFIP</Link></li>
            <li><Link href="/privacidad" className="text-on-surface-variant hover:text-primary transition-colors">Políticas de Privacidad</Link></li>
            <li><Link href="/cookies" className="text-on-surface-variant hover:text-primary transition-colors">Uso de Cookies</Link></li>
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-secondary mb-8">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-white border-none rounded-xl text-sm flex-1 px-4 h-12 focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-primary text-white p-3 rounded-xl hover:opacity-90 transition-opacity">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-secondary mb-6">Seguinos</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer border border-outline-variant/10">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer border border-outline-variant/10">
                <Facebook className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer border border-outline-variant/10">
                <Mail className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-40 text-center md:text-left">
          © 2024 Hola Compa - La Estancia Digital de Mascotas. CUIT: 30-XXXXXXXX-X
        </p>
        <div className="flex gap-6 opacity-40">
           <Share2 className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
}
