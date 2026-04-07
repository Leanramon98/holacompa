import Link from "next/link";
import { PawPrint, Instagram, Twitter, MessageCircle, Heart, Store, Compass, LayoutGrid } from "lucide-react";

const footerLinks = {
  explorar: [
    { label: "Mascotas", href: "/descubrir" },
    { label: "Refugios", href: "/refugios" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Cómo funciona", href: "/#como-funciona" },
  ],
  comunidad: [
    { label: "Sobre nosotros", href: "/acerca" },
    { label: "Testimonios", href: "/blog" },
    { label: "Alianzas", href: "/contacto" },
    { label: "Ayuda", href: "/faq" },
  ],
  legal: [
    { label: "Privacidad", href: "/privacidad" },
    { label: "Términos", href: "/terminos" },
    { label: "Seguridad", href: "/seguridad" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-on-surface text-background mt-40">
      {/* Editorial Slogan Curve */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-background organic-clip -translate-y-full pointer-events-none" />
      
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="inline-block group">
              <span className="text-4xl font-black text-primary font-plus-jakarta tracking-tighter group-hover:scale-105 transition-transform inline-block">
                Hola Compa
              </span>
            </Link>
            <p className="text-background/60 text-lg md:text-xl font-medium leading-relaxed max-w-sm">
              La estancia digital donde cada "Compa" encuentra su lugar en el mundo. Curación premium de adopciones seguras.
            </p>
            <div className="flex gap-6">
              {[Instagram, Twitter, MessageCircle].map((Icon, i) => (
                <Link key={i} href="#" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all hover:scale-110 active:scale-95 shadow-xl">
                  <Icon className="h-6 w-6 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { title: "Explorar", links: footerLinks.explorar },
              { title: "Comunidad", links: footerLinks.comunidad },
              { title: "Legal", links: footerLinks.legal },
            ].map((section) => (
              <div key={section.title} className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white opacity-40">{section.title}</h4>
                <ul className="space-y-6">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-lg font-black tracking-tight text-white/70 hover:text-primary transition-colors hover:translate-x-1 inline-block">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter / CTA Small */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white opacity-40">Newsletter Premium</h4>
            <div className="space-y-6">
              <p className="text-background/60 text-sm font-black uppercase tracking-widest leading-loose">
                Anuncios exclusivos, guías de cuidado y mucho más.
              </p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Tu email..." 
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-full px-6 text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary focus:outline-none transition-all text-lg"
                />
                <button className="absolute right-2 top-2 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 active:scale-95 shadow-lg">
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <p className="text-sm font-black uppercase tracking-[0.1em] text-white/40">
            © 2024 Hola Compa — Diseñado con amor por los animales 🐾
          </p>
          <p className="text-sm font-black uppercase tracking-[0.1em] text-primary/60 italic font-serif">
            Una Experiencia PetCurator
          </p>
        </div>
      </div>

      {/* Organic Shapes Background Decor */}
      <div className="absolute top-1/2 left-[5%] w-96 h-96 bg-primary/20 rounded-full blur-[160px] opacity-20 -z-10" />
      <div className="absolute bottom-0 right-[5%] w-80 h-80 bg-secondary/20 rounded-full blur-[140px] opacity-10 -z-10" />
    </footer>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
