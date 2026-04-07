"use client";

import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { PetType } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-10">
      {/* Species */}
      <div>
        <span className="font-bold text-xs uppercase tracking-[0.2em] text-secondary block mb-4">Especie</span>
        <div className="flex flex-wrap gap-2">
          {species.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilters({ pet_type: s.value as any })}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-bold transition-all border shadow-sm",
                filters.pet_type === s.value 
                  ? "bg-primary text-white border-primary shadow-primary/20" 
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high border-transparent"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age Range */}
      <div>
        <span className="font-bold text-xs uppercase tracking-[0.2em] text-secondary block mb-4">Edad</span>
        <div className="space-y-4">
          {ages.map((age) => (
            <label 
              key={age.value} 
              className="flex items-center gap-4 cursor-pointer group select-none"
              onClick={() => setFilters({ age: age.value as any })}
            >
              <div className={cn(
                "w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center",
                filters.age === age.value 
                  ? "bg-primary border-primary" 
                  : "border-outline-variant group-hover:border-primary"
              )}>
                {filters.age === age.value && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
              </div>
              <span className={cn(
                "text-lg font-medium transition-colors",
                filters.age === age.value ? "text-on-surface" : "text-on-surface/50 group-hover:text-on-surface"
              )}>
                {age.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <span className="font-bold text-xs uppercase tracking-[0.2em] text-secondary block mb-4">Tamaño</span>
        <select 
          className="w-full bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-lg font-bold p-4 appearance-none cursor-pointer text-on-surface"
          value={filters.size}
          onChange={(e) => setFilters({ size: e.target.value as any })}
        >
          <option value="todos">Todos los tamaños</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      {/* Energy Level */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <span className="font-bold text-xs uppercase tracking-[0.2em] text-secondary block">Nivel de Energía</span>
          <span className="text-[10px] font-black uppercase text-primary tracking-widest">{filters.energy_level}</span>
        </div>
        <div className="flex gap-1.5 h-2.5">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step}
              className={cn(
                "flex-1 rounded-full transition-all duration-500",
                step <= (filters.energy_level === "alto" ? 5 : filters.energy_level === "medio" ? 3 : 1)
                  ? "bg-primary shadow-[0_0_8px_rgba(0,103,126,0.3)]" 
                  : "bg-surface-container-highest"
              )}
            />
          ))}
        </div>
        <p className="text-[11px] mt-4 text-on-surface-variant font-bold leading-relaxed opacity-60 flex gap-2 items-center italic">
          <span className="w-1 h-1 rounded-full bg-secondary" />
          Ideal para departamentos y vida urbana
        </p>
      </div>
    </div>
  );
}
