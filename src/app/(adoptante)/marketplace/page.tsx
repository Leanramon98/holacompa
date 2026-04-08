"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  ShoppingBag, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Zap,
  ShoppingBasket,
  Gift,
  Stethoscope,
  ArrowRight,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { usePlatformStore } from "@/lib/store/usePlatformStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";

export default function MarketplacePage() {
  const { products } = usePlatformStore();
  
  const categories = [
    { name: "Alimento", icon: <ShoppingBasket className="h-6 w-6" />, color: "bg-primary-container", textColor: "text-on-primary-container" },
    { name: "Juguetes", icon: <Zap className="h-6 w-6" />, color: "bg-secondary-container", textColor: "text-on-secondary-container" },
    { name: "Accesorios", icon: <Gift className="h-6 w-6" />, color: "bg-tertiary-container", textColor: "text-on-tertiary-container" },
    { name: "Salud", icon: <Stethoscope className="h-6 w-6" />, color: "bg-surface-container-high", textColor: "text-on-surface-variant" },
  ];

  const deals = products.slice(0, 3);
  const featured = products.slice(3, 10);

  return (
    <HydrationZustand>
      <div className="min-h-screen bg-background font-be-vietnam pb-32">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
          <div className="container mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <ShoppingBag className="text-white h-5 w-5" />
              </div>
              <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface">Marketplace</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
                <Search className="h-5 w-5 text-on-surface-variant" />
              </button>
              <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary/10">
                <Image 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 pt-28 space-y-16">
          {/* Banner Hero */}
          <section className="relative h-[450px] w-full rounded-[48px] overflow-hidden group shadow-2xl shadow-primary/5">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2680&auto=format&fit=crop"
              alt="Hero"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[3s]"
            />
            <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl space-y-6">
              <span className="text-white/80 font-black uppercase tracking-[0.3em] text-[10px] bg-white/10 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-white/20">
                Descubrimiento Curado
              </span>
              <h2 className="text-white font-plus-jakarta text-5xl md:text-7xl font-black leading-none tracking-tighter">
                El placer de <br/> <span className="italic text-primary-container">jugar.</span>
              </h2>
              <p className="text-white/80 font-medium text-lg leading-relaxed max-w-md">
                Descubrí nuestra colección exclusiva de juguetes sustentables diseñados para la durabilidad.
              </p>
              <div className="pt-4">
                <button className="bg-white text-primary px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-orange-50 transition-all active:scale-95">
                  Ver Colección
                </button>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-plus-jakarta text-3xl font-black tracking-tight">Categorías Curadas</h3>
                <p className="text-on-surface-variant font-medium opacity-60">Explorá lo mejor para tu compa</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div key={cat.name} className={cn(
                  "group p-8 rounded-[40px] flex flex-col items-center text-center space-y-4 transition-all hover:translate-y-[-8px] cursor-pointer border border-outline-variant/10 shadow-sm",
                  cat.color
                )}>
                  <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <div className={cat.textColor}>{cat.icon}</div>
                  </div>
                  <span className="font-plus-jakarta font-black text-on-surface tracking-tight">{cat.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Bento Deals */}
          <section className="space-y-8">
            <h3 className="font-plus-jakarta text-3xl font-black tracking-tight">Ofertas de Temporada</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {deals[0] && (
                <div className="md:col-span-8 relative group overflow-hidden rounded-[48px] bg-primary-container/30 min-h-[400px] border border-primary/5 flex items-center">
                  <div className="p-12 space-y-6 relative z-10 max-w-md">
                    <span className="bg-error text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking_widest shadow-xl shadow-error/20">
                      OFERTA
                    </span>
                    <h4 className="font-plus-jakarta text-4xl font-black text-on-primary-container tracking-tighter leading-none">
                      {deals[0].title}
                    </h4>
                    <button className="bg-primary text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95">
                      Aprovechar
                    </button>
                  </div>
                  <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
                    <Image 
                      src={deals[0].photos[0] || "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=2671&auto=format&fit=crop"} 
                      alt={deals[0].title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[2s] origin-center opacity-80 md:opacity-100"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Featured Slider */}
          <section className="space-y-8">
            <h3 className="font-plus-jakarta text-3xl font-black tracking-tight">Esenciales Destacados</h3>
            <div className="flex flex-nowrap overflow-x-auto gap-10 pb-8 no-scrollbar -mx-6 px-6">
              {featured.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/producto/${item.id}`}
                  className="flex-shrink-0 w-80 group space-y-5"
                >
                  <div className="aspect-[4/5] bg-surface-container-highest rounded-[48px] overflow-hidden relative shadow-lg shadow-black/5">
                    <Image 
                      src={item.photos[0] || "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2671&auto=format&fit=crop"} 
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                    />
                  </div>
                  <div className="space-y-2 px-2">
                    <div className="flex justify-between items-start">
                      <h5 className="font-plus-jakarta font-black text-xl tracking-tight text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h5>
                      <p className="font-plus-jakarta font-extrabold text-primary text-xl tracking-tight">${item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </HydrationZustand>
  );
}
