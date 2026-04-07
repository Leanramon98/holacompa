"use client";

import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { PetType } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const species = [
  { value: "perro", label: "Perros" },
  { value: "gato", label: "Gatos" },
  { value: "otros", label: "Otros" },
];

const ages = [
  { value: "cachorro", label: "Cachorro (0-1 año)" },
  { value: "adulto", label: "Adulto (1-7 años)" },
  { value: "senior", label: "Senior (7+ años)" },
];

export function FilterSection() {
  const { filters, setFilters } = useAdoptionStore();

  return (
    <div className="space-y-12">
      {/* Species */}
      <div>
        <span className="font-black text-[10px] uppercase tracking-[0.3em] text-primary block mb-6 opacity-60">Especie Curada</span>
        <div className="flex flex-wrap gap-3">
          {species.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilters({ pet_type: s.value as any })}
              className={cn(
                "px-6 py-3 rounded-2xl text-sm font-black transition-all border shadow-sm uppercase tracking-widest",
                filters.pet_type === s.value 
                  ? "bg-primary text-on-primary border-primary shadow-primary/20" 
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border-outline-variant/10"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age Selection (Custom Editorial Design) */}
      <div>
        <span className="font-black text-[10px] uppercase tracking-[0.3em] text-primary block mb-6 opacity-60">Etapa de Vida</span>
        <div className="space-y-4">
          {ages.map((age) => (
            <label 
              key={age.value} 
              className="flex items-center gap-5 cursor-pointer group select-none transition-transform hover:translate-x-1"
              onClick={() => setFilters({ age: age.value as any })}
            >
              <div className={cn(
                "w-7 h-7 rounded-lg border-2 transition-all flex items-center justify-center shadow-sm",
                filters.age === age.value 
                  ? "bg-primary border-primary" 
                  : "bg-white border-outline-variant/20 group-hover:border-primary"
              )}>
                {filters.age === age.value && <Check className="w-5 h-5 text-white" strokeWidth={5} />}
              </div>
              <span className={cn(
                "text-lg font-black tracking-tight transition-colors",
                filters.age === age.value ? "text-on-surface" : "text-on-surface/40 group-hover:text-on-surface"
              )}>
                {age.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Selector with Organic Styling */}
      <div>
        <span className="font-black text-[10px] uppercase tracking-[0.3em] text-primary block mb-6 opacity-60">Escala de Porte</span>
        <div className="relative group">
          <select 
            className="w-full bg-surface-container-highest border-none rounded-3xl focus:ring-4 focus:ring-primary-container text-lg font-black p-6 appearance-none cursor-pointer text-on-surface uppercase tracking-widest shadow-inner"
            value={filters.size}
            onChange={(e) => setFilters({ size: e.target.value as any })}
          >
            <option value="todos">Todos los tamaños</option>
            <option value="pequeño">Porte Pequeño</option>
            <option value="mediano">Porte Mediano</option>
            <option value="grande">Porte Grande</option>
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Energy Level Visualizator */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <span className="font-black text-[10px] uppercase tracking-[0.3em] text-primary block opacity-60">Nivel de Energía</span>
          <span className="text-[10px] font-black uppercase text-secondary tracking-widest bg-secondary-container/20 px-3 py-1 rounded-full">{filters.energy_level}</span>
        </div>
        <div className="flex gap-2 h-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step}
              className={cn(
                "flex-1 rounded-full transition-all duration-700",
                step <= (filters.energy_level === "alto" ? 5 : filters.energy_level === "medio" ? 3 : 1)
                  ? "bg-primary shadow-[0_0_12px_rgba(131,84,0,0.3)]" 
                  : "bg-surface-container-highest opacity-50"
              )}
            />
          ))}
        </div>
        <p className="text-[11px] mt-6 text-on-surface-variant font-black leading-relaxed opacity-50 flex gap-2 items-center italic uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
          Ideal para vida urbana y outdoor
        </p>
      </div>
    </div>
  );
}
