"use client";

import Image from "next/image";
import { Pet } from "@/types";
import { MapPin, ShieldCheck, CheckCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPetAge, getPetTags } from "@/lib/utils/pet-helpers";
import { cn } from "@/lib/utils";

interface PetCardProps {
  pet: Pet;
  className?: string;
}

export function PetCard({ pet, className }: PetCardProps) {
  const tags = getPetTags(pet);

  return (
    <div className={cn(
      "bg-surface-container-low rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 w-full h-full flex flex-col",
      className
    )}>
      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-y-auto no-scrollbar">
        {/* Main Pet Card Header */}
        <div className="relative h-[600px] w-full shrink-0">
          <Image
            src={pet.photos[0]}
            alt={pet.name}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
                  {pet.name}, {formatPetAge(pet.estimated_age_months)}
                </h1>
                <div className="flex items-center gap-2 opacity-90">
                  <MapPin className="w-4 h-4" />
                  <span className="text-base md:text-lg font-medium">Palermo, CABA (a 2.4 km)</span>
                </div>
              </div>
              <div className="bg-primary-container text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 self-start md:self-auto shadow-lg">
                <ShieldCheck className="w-4 h-4 fill-current" />
                REFUGIO PATITAS
              </div>
            </div>
            
            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {tags.slice(0, 3).map(tag => (
                <span key={tag} className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pet History / Description (Editorial Layout) */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/50 backdrop-blur-sm">
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-label text-xs font-black uppercase tracking-[0.2em] text-secondary">Mi Historia</h3>
            <p className="text-lg leading-relaxed text-on-surface/80 font-medium">
              {pet.story || "Milo fue rescatado de una obra en construcción. Es un compañero sumamente leal que disfruta de las caminatas tranquilas y las tardes de sol. Buscamos una familia que le brinde el tiempo y amor que merece."}
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="font-label text-xs font-black uppercase tracking-[0.2em] text-secondary">Salud</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-on-surface/70">Desparasitado</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-on-surface/70">V6 / Rabia OK</span>
              </div>
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-secondary opacity-40" />
                <span className="text-sm font-bold text-on-surface/70">Sin condiciones previas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
