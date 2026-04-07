"use client";

import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { PetType } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, X, Dog, Cat, Rabbit, HelpCircle, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const types: { value: PetType | "todos"; label: string; icon: any }[] = [
  { value: "todos", label: "Todos", icon: HelpCircle },
  { value: "perro", label: "Perros", icon: Dog },
  { value: "gato", label: "Gatos", icon: Cat },
  { value: "conejo", label: "Conejos", icon: Rabbit },
];

export function FilterSection() {
  const { filters, setFilters, resetFilters } = useAdoptionStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-6">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-marron/30 group-focus-within:text-primary transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o raza..."
          value={filters.searchQuery || ""}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          className="w-full h-14 pl-12 pr-4 rounded-3xl bg-white border border-marron/10 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-marron font-medium"
        />
        {filters.searchQuery && (
          <button 
            onClick={() => setFilters({ searchQuery: "" })}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-marron/30 hover:text-marron/60"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main Categories (Pet Types) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {types.map((type) => {
          const Icon = type.icon;
          const isActive = filters.pet_type === type.value;
          return (
            <button
              key={type.value}
              onClick={() => setFilters({ pet_type: type.value })}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full border font-bold text-sm whitespace-nowrap transition-all shadow-sm",
                isActive 
                  ? "bg-primary text-white border-primary-dark" 
                  : "bg-white text-marron/70 border-marron/10 hover:border-primary/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Detailed Filters (Collapsible) */}
      <div className="w-full bg-white rounded-3xl border border-marron/10 overflow-hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-marron/5 transition-colors"
        >
          <div className="flex items-center gap-2 font-extrabold text-marron">
            <Filter className="h-4 w-4" />
            <span>Filtros avanzados</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4 text-marron/40" /> : <ChevronDown className="h-4 w-4 text-marron/40" />}
        </button>

        {isOpen && (
          <div className="px-6 pb-6 pt-2 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Sizing & Age (simplified for now) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <p className="text-sm font-extrabold uppercase tracking-widest text-marron/40">Tamaño</p>
                <div className="flex flex-wrap gap-2">
                  {["todos", "chico", "mediano", "grande"].map((size) => (
                    <Button
                      key={size}
                      variant="ghost"
                      onClick={() => setFilters({ size: size as any })}
                      className={cn(
                        "rounded-xl h-9 px-4 font-bold border",
                        filters.size === size 
                          ? "bg-primary/10 text-primary border-primary/20" 
                          : "border-marron/5 text-marron/60 hover:bg-marron/5"
                      )}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-extrabold uppercase tracking-widest text-marron/40">Energía</p>
                <div className="flex flex-wrap gap-2">
                  {["todos", "bajo", "medio", "alto"].map((lvl) => (
                    <Button
                      key={lvl}
                      variant="ghost"
                      onClick={() => setFilters({ energy_level: lvl as any })}
                      className={cn(
                        "rounded-xl h-9 px-4 font-bold border",
                        filters.energy_level === lvl 
                          ? "bg-primary/10 text-primary border-primary/20" 
                          : "border-marron/5 text-marron/60 hover:bg-marron/5"
                      )}
                    >
                      {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Distance Slider (Simplified visual) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-extrabold uppercase tracking-widest text-marron/40">Distancia máxima</p>
                <span className="text-sm font-bold text-primary">{filters.max_distance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={filters.max_distance}
                onChange={(e) => setFilters({ max_distance: parseInt(e.target.value) })}
                className="w-full accent-primary cursor-pointer border-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-end">
              <Button 
                variant="ghost" 
                onClick={resetFilters}
                className="text-marron/40 hover:text-primary font-bold text-sm"
              >
                Limpiar todos los filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
