"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search as SearchIcon, 
  Bell, 
  MapPin as MapPinIcon, 
  Heart, 
  Dog, 
  Cat, 
  Bird, 
  Rabbit, 
  Fish,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlatformStore } from "@/lib/store/usePlatformStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";

export default function AdopterFeedPage() {
  const { pets, currentUser } = usePlatformStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga para animación
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { name: "Perros", icon: <Dog className="h-5 w-5" />, active: true },
    { name: "Gatos", icon: <Cat className="h-5 w-5" /> },
    { name: "Aves", icon: <Bird className="h-5 w-5" /> },
    { name: "Conejos", icon: <Rabbit className="h-5 w-5" /> },
    { name: "Otros", icon: <Fish className="h-5 w-5" /> },
  ];

  const userPets = pets.slice(0, 6);

  return (
    <HydrationZustand>
      <div className="bg-background text-on-background font-be-vietnam min-h-screen pb-32">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 h-20 shadow-[0_8px_30px_rgba(32,27,15,0.04)] border-b border-outline-variant/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-md relative">
              <Image 
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop"} 
                alt="User" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/60 leading-none mb-1">Tu manada</p>
              <h2 className="font-plus-jakarta font-black text-primary tracking-tighter text-xl leading-none">Hola, {currentUser?.name.split(' ')[0] || "Compa"}!</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-11 h-11 rounded-full flex items-center justify-center text-primary hover:bg-primary/5 transition-all active:scale-90 border border-transparent hover:border-primary/10">
              <SearchIcon className="h-5 w-5" />
            </button>
            <button className="w-11 h-11 rounded-full flex items-center justify-center text-primary hover:bg-primary/5 transition-all active:scale-90 relative border border-transparent hover:border-primary/10">
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-error rounded-full border-2 border-background animate-pulse" />
            </button>
          </div>
        </header>

        <main className="pt-28 px-6 max-w-2xl mx-auto">
          {/* Hero Search Area */}
          <section className="mb-10 space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="font-plus-jakarta text-4xl font-black text-on-background leading-[0.9] tracking-tighter">
              Encontrá a tu nuevo <br/> <span className="text-primary italic font-medium">mejor amigo</span> hoy
            </h1>
          </section>

          {/* Category Chips */}
          <section className="mb-12 -mx-6 overflow-x-auto no-scrollbar animate-in fade-in duration-1000 slide-in-from-left-4">
            <div className="flex gap-3 px-6 pb-2">
              {categories.map((cat, idx) => (
                <button 
                  key={idx}
                  className={cn(
                    "flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg transition-all active:scale-95 whitespace-nowrap border-2",
                    cat.active 
                      ? "bg-primary text-white border-primary shadow-primary/30" 
                      : "bg-surface-container-high text-on-surface-variant border-transparent hover:bg-white hover:border-outline-variant/30"
                  )}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </section>

          {/* Featured Section Headline */}
          <div className="flex items-center justify-between mb-8 px-1">
            <h3 className="font-plus-jakarta text-2xl font-black text-on-background tracking-tighter">Compañeros Cercanos</h3>
            <Link href="/explorar" className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] hover:gap-3 transition-all pr-4 underline underline-offset-4 decoration-2">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Bento/Asymmetric Pet Grid */}
          <section className="grid grid-cols-2 gap-6 pb-12">
            {loading ? (
               <div className="col-span-2 py-20 text-center opacity-20">Analizando el match perfecto...</div>
            ) : (
              <>
                {userPets.map((pet, idx) => (
                  <div 
                    key={pet.id}
                    className={cn(
                      "bg-white rounded-[40px] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(32,27,15,0.08)] border border-outline-variant/5 group animate-in fade-in slide-in-from-bottom-8 duration-700",
                      idx === 0 ? "col-span-1 row-span-2" : "col-span-1"
                    )}
                  >
                    <Link href={`/mascota/${pet.id}`} className={cn("relative overflow-hidden", idx === 0 ? "h-[400px]" : "h-[220px]")}>
                      <Image 
                        src={pet.photos[0]} 
                        alt={pet.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                      />
                      <div className="absolute top-6 right-6">
                        <button className="w-10 h-10 bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center text-error shadow-xl hover:scale-110 active:scale-90 transition-all border border-white/40">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </Link>
                    <div className={cn("p-6", idx === 0 ? "p-8" : "p-6")}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={cn("font-plus-jakarta font-black text-on-background tracking-tighter", idx === 0 ? "text-2xl" : "text-xl")}>{pet.name}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant font-bold text-[10px] uppercase tracking-widest opacity-60">
                        <MapPinIcon className="h-3 w-3" /> 
                        <span>Cerca de ti</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Horizontal Full-Width Card (Callout) */}
                <div className="col-span-2 bg-[#ffddb5]/20 rounded-[48px] p-10 flex items-center justify-between border-2 border-dashed border-primary/20 overflow-hidden relative group animate-in fade-in zoom-in-95 duration-1000 delay-200">
                  <div className="z-10 relative space-y-4 max-w-[60%]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      Tip del día
                    </div>
                    <h4 className="font-plus-jakarta text-3xl font-black text-primary tracking-tighter leading-none">¿Sabías qué?</h4>
                    <p className="text-primary/70 text-sm font-medium leading-relaxed">Adoptar un perro adulto es la mejor forma de asegurar un compañero tranquilo y agradecido.</p>
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </HydrationZustand>
  );
}
