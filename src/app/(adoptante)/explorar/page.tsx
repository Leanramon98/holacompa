"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Filter, 
  MapPin, 
  ChevronDown, 
  Heart, 
  Dog, 
  Cat, 
  CircleDot, 
  Search,
  ArrowRight,
  Maximize2,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { getPets } from "@/lib/mock-data/mock-pets";
import { Pet } from "@/types";
import { cn } from "@/lib/utils";

export default function AdopterExplorerPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function loadData() {
      const data = await getPets();
      setPets(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filters = [
    { id: "all", name: "Todos", icon: <Filter className="h-4 w-4" /> },
    { id: "perro", name: "Perros", icon: <Dog className="h-4 w-4" /> },
    { id: "gato", name: "Gatos", icon: <Cat className="h-4 w-4" /> },
    { id: "cachorro", name: "Cachorros", icon: <CircleDot className="h-4 w-4" /> },
    { id: "senior", name: "Senior", icon: <CircleDot className="h-4 w-4" /> },
  ];

  return (
    <div className="bg-surface text-on-surface font-be-vietnam selection:bg-primary-container min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center px-6 h-20 shadow-sm">
        <Link href="/feed" className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <Dog className="h-6 w-6" />
          </div>
          <h1 className="font-plus-jakarta font-black text-xl tracking-tighter text-on-surface">PetCurator</h1>
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-surface-container-high rounded-full hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/5 active:scale-90">
            <Search className="h-5 w-5 text-primary" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shadow-md">
            <Image 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop" 
              alt="Profile" 
              width={40} 
              height={40} 
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto">
        {/* Search & Filter Header */}
        <section className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4 max-w-2xl animate-in fade-in slide-in-from-top-4 duration-700">
              <h2 className="text-5xl md:text-7xl font-plus-jakarta font-black tracking-tighter text-on-surface leading-none">
                Encontrá a tu <br/> <span className="text-primary italic font-medium">alma gemela</span>
              </h2>
              <p className="text-on-surface-variant font-medium text-lg leading-relaxed opacity-70">
                Descubre mascotas de refugios verificados y rescatistas amantes de los animales en todo el país.
              </p>
            </div>
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="bg-surface-container-lowest rounded-[24px] px-8 py-4 flex items-center gap-4 shadow-xl shadow-primary/5 border border-outline-variant/10 group cursor-pointer hover:border-primary/30 transition-all active:scale-95">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-black text-xs uppercase tracking-widest text-on-surface">Buenos Aires, ARG</span>
                <ChevronDown className="h-4 w-4 text-outline-variant group-hover:text-primary transition-all" />
              </div>
            </div>
          </div>

          {/* Advanced Filters Pill-Scroller */}
          <div className="flex overflow-x-auto gap-4 hide-scrollbar py-2 -mx-4 px-4 animate-in fade-in duration-1000">
            {filters.map((filter) => (
              <button 
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] whitespace-nowrap transition-all active:scale-95 border-2 shadow-sm",
                  activeFilter === filter.id 
                    ? "bg-primary text-white border-primary shadow-primary/30 scale-105" 
                    : "bg-surface-container-high text-on-surface-variant border-transparent hover:bg-white hover:border-outline-variant/30"
                )}
              >
                {filter.icon}
                {filter.name}
              </button>
            ))}
            <div className="h-10 w-[2px] bg-outline-variant/20 self-center mx-2 shrink-0" />
            <button className="flex items-center gap-3 bg-surface-container-high text-on-surface-variant px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] whitespace-nowrap hover:bg-primary-container hover:text-on-primary-container transition-all border-2 border-transparent">
              Raza: Pointer
            </button>
            <button className="flex items-center gap-3 bg-surface-container-high text-on-surface-variant px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] whitespace-nowrap hover:bg-primary-container hover:text-on-primary-container transition-all border-2 border-transparent">
              Distancia: 25 km
            </button>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 outline-none">
          {loading ? (
             <div className="col-span-full py-40 text-center opacity-20 font-black uppercase tracking-widest">Buscando compañeros...</div>
          ) : (
            <>
              {pets.map((pet: Pet, idx: number) => (
                <Link 
                  href={`/mascota/${pet.id}`}
                  key={pet.id} 
                  className={cn(
                    "group relative bg-white rounded-[40px] overflow-hidden flex flex-col shadow-xl hover:shadow-[0_32px_64px_rgba(32,27,15,0.1)] transition-all duration-700 animate-in fade-in slide-in-from-bottom-8",
                    { "md:col-span-2": idx === 6 } // Let's make an asymmetrical bento in the middle
                  )}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={cn(
                    "relative overflow-hidden",
                    idx === 6 ? "h-[500px]" : "h-80"
                  )}>
                    <Image 
                      src={pet.photos[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2574&auto=format&fit=crop"} 
                      alt={pet.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                    />
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <button className="bg-white/40 backdrop-blur-xl p-3 rounded-full text-white hover:bg-white hover:text-error transition-all border border-white/40 shadow-xl">
                        <Heart className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 flex gap-2">
                       <span className="px-5 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-2xl border border-primary/20">
                          Verificado
                       </span>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-3xl font-plus-jakarta font-black text-on-surface tracking-tighter leading-none group-hover:text-primary transition-colors">
                          {pet.name}
                        </h3>
                        <p className="text-sm font-black text-on-surface-variant/60 uppercase tracking-widest mt-2">
                          {pet.breed || "Mestizo"} • {Math.floor(pet.estimated_age_months / 12)} años
                        </p>
                      </div>
                      <div className="p-3 bg-surface-container-high rounded-2xl group-hover:bg-primary-container duration-500 transition-colors">
                         {pet.sex === "macho" ? <Sparkles className="h-5 w-5 text-primary" /> : <Heart className="h-5 w-5 text-secondary" />}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-on-surface-variant font-bold text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                      <MapPin className="h-3 w-3" />
                      <span>Buenos Aires (2.4 km)</span>
                    </div>

                    <div className="pt-2 group-hover:translate-x-2 transition-transform duration-500">
                       <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary">
                          Conocer más
                          <ArrowRight className="h-4 w-4" />
                       </button>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Bento Special Callout */}
              <div className="sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-primary to-primary-fixed-dim rounded-[48px] p-12 flex flex-col md:flex-row justify-between items-center gap-12 border-none relative overflow-hidden group shadow-2xl shadow-primary/30">
                <div className="relative z-10 space-y-8 order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-white text-primary rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    <ShieldCheck className="h-4 w-4" />
                    Elección PetCurator
                  </div>
                  <h2 className="text-5xl md:text-6xl font-plus-jakarta font-black text-white leading-[0.9] tracking-tighter">
                    ¿No te <br/>decidís por <br/>uno todavía?
                  </h2>
                  <p className="text-white/80 text-xl font-medium leading-relaxed max-w-md opacity-80 group-hover:opacity-100 transition-opacity">
                    Hacé nuestro test de personalidad y encontrá la raza que mejor se adapta a tu estilo de vida.
                  </p>
                  <button className="bg-white text-primary px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-3xl shadow-black/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                    Comenzar Test
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="relative w-full h-[400px] md:h-full md:w-1/2 order-1 md:order-2 overflow-hidden rounded-[40px] shadow-2xl transform md:rotate-6 group-hover:rotate-0 transition-transform duration-1000">
                  <Image 
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2524&auto=format&fit=crop" 
                    alt="Man and Dog" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                </div>
                <div className="absolute -left-20 -top-20 opacity-10 pointer-events-none group-hover:rotate-45 transition-transform duration-[10s]">
                  <Dog className="w-96 h-96 text-white" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Load More Area */}
        {!loading && (
          <div className="mt-32 flex flex-col items-center gap-10 animate-in fade-in duration-1000 slide-in-from-bottom-12">
            <div className="h-[2px] w-24 bg-primary/20" />
            <button className="bg-white text-on-surface px-14 py-6 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl hover:shadow-primary/5 hover:translate-y-[-4px] transition-all flex items-center gap-5 border border-outline-variant/10 active:scale-95 group">
               <Maximize2 className="h-5 w-5 text-primary group-hover:rotate-90 transition-transform duration-500" />
               Descubrir más hermanos
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
