"use client";

import { useState, useEffect } from "react";
import { SwipeDeck } from "@/components/adoptante/swipe-deck";
import { FilterSection } from "@/components/adoptante/filter-section";
import { Search, Compass, Heart, Cat, Bird, Rabbit, Droplets, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { getPets } from "@/lib/data/pets";

const mainCategories = [
  { id: "perro", label: "Perros", icon: <Compass className="h-5 w-5" /> },
  { id: "gato", label: "Gatos", icon: <Cat className="h-5 w-5" /> },
  { id: "ave", label: "Aves", icon: <Bird className="h-5 w-5" /> },
  { id: "roedor", label: "Roedores", icon: <Rabbit className="h-5 w-5" /> },
  { id: "pez", label: "Peces", icon: <Droplets className="h-5 w-5" /> },
];

export default function DescubrirPage() {
  const { filters, setFilters, setPets } = useAdoptionStore();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadPets = async () => {
      const allPets = await getPets();
      setPets(allPets);
    };
    loadPets();
  }, [setPets]);

  return (
    <div className="flex flex-col min-h-screen bg-background font-be-vietnam pb-40">
      <main className="container mx-auto px-6 pt-24 space-y-12">
        
        {/* Editorial Headline & Search */}
        <section className="space-y-10 max-w-2xl">
          <h1 className="font-plus-jakarta text-5xl md:text-7xl font-black text-on-background leading-none tracking-tighter">
            Encontrá a tu <br/> <span className="text-primary italic">mejor amigo</span> hoy
          </h1>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-outline/50 group-focus-within:text-primary transition-colors">
              <Search className="h-6 w-6" />
            </div>
            <input 
              className="w-full h-20 pl-16 pr-8 bg-surface-container-lowest rounded-[32px] border-none shadow-[0_16px_40px_rgba(32,27,15,0.08)] focus:ring-4 focus:ring-primary-container transition-all text-on-background placeholder:text-outline/40 text-xl font-medium" 
              placeholder="Buscá razas, edad o ubicación..." 
              type="text"
            />
          </div>
        </section>

        {/* Dynamic Category Chips */}
        <section className="overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex gap-4 pb-4">
            <button 
              onClick={() => setFilters({ pet_type: undefined })}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all",
                !filters.pet_type 
                  ? "bg-primary text-white shadow-2xl shadow-primary/30" 
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              )}
            >
              <LayoutGrid className="h-5 w-5" />
              Todos
            </button>
            {mainCategories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setFilters({ pet_type: cat.id as any })}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap",
                  filters.pet_type === cat.id 
                    ? "bg-primary text-white shadow-2xl shadow-primary/30" 
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                )}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Discovery Grid: Filter Sidebar + Swipe Deck */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          {/* Filters Sidebar (Sticky for desktop) */}
          <div className="hidden lg:block lg:col-span-3 space-y-12 sticky top-32 h-fit bg-surface-container-low p-10 rounded-[48px] border border-outline-variant/10 shadow-sm">
            <div className="space-y-2">
              <h3 className="font-plus-jakarta font-black text-2xl tracking-tight">Filtros Pro</h3>
              <p className="text-on-surface-variant/60 font-medium text-sm">Personalizá tu búsqueda curada.</p>
            </div>
            <FilterSection />
          </div>

          {/* Swipe Deck Area */}
          <div className="lg:col-span-9 flex flex-col items-center justify-center min-h-[700px] relative">
            <div className="absolute top-0 right-0 hidden lg:flex items-center gap-2 px-6 py-2 bg-secondary-container/20 rounded-full text-secondary font-black text-[10px] uppercase tracking-widest border border-secondary-container/10">
              <Heart className="h-3 w-3 fill-secondary" />
              <span>Matching Inteligente</span>
            </div>
            <SwipeDeck />
          </div>
        </section>
      </main>

      {/* Bottom Nav Highlight Decor */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none -z-10" />
    </div>
  );
}
