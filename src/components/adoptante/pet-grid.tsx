"use client";

import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { Pet } from "@/types";
import { PetGridItem } from "./pet-grid-item";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchX, FilterIcon } from "lucide-react";

interface PetGridProps {
  initialPets: Pet[];
}

export function PetGrid({ initialPets }: PetGridProps) {
  const { filters, resetFilters } = useAdoptionStore();
  const [displayCount, setDisplayCount] = useState(8);

  const filteredPets = useMemo(() => {
    return initialPets.filter(pet => {
      // Filtro de tipo
      if (filters.pet_type && filters.pet_type !== 'todos' && pet.pet_type !== filters.pet_type) {
        return false;
      }
      
      // Filtro de tamaño
      if (filters.size && filters.size !== 'todos' && pet.estimated_size !== filters.size) {
        return false;
      }

      // Filtro de energía
      if (filters.energy_level && filters.energy_level !== 'todos' && pet.energy_level !== filters.energy_level) {
        return false;
      }

      // Filtro de búsqueda (nombre o raza)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          pet.name.toLowerCase().includes(query) || 
          pet.breed.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [initialPets, filters]);

  const visiblePets = filteredPets.slice(0, displayCount);

  if (filteredPets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <SearchX className="h-20 w-20 text-marron/20 mb-6" />
        <h2 className="text-2xl font-extrabold text-marron mb-4 tracking-tight">No encontramos mascotas con esos filtros</h2>
        <p className="text-marron/40 max-w-sm mx-auto mb-10">Probá ajustando algo para ver más resultados. A veces menos filtros es más compas.</p>
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="rounded-full border-primary/20 text-primary font-bold px-8 h-12"
        >
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visiblePets.map((pet) => (
          <PetGridItem key={pet.id} pet={pet} />
        ))}
      </div>

      {/* Infinite Scroll Simulation */}
      {displayCount < filteredPets.length && (
        <div className="flex justify-center pb-20">
          <Button 
            onClick={() => setDisplayCount(prev => prev + 8)}
            className="rounded-full bg-white text-primary border-primary/20 border hover:bg-primary hover:text-white font-bold h-12 px-10 transition-all shadow-sm"
          >
            Cargar más mascotas
          </Button>
        </div>
      )}
    </div>
  );
}
