"use client";

import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { Pet } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, X, Star, History, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface PetCardProps {
  pet: Pet;
  active?: boolean;
}

export function PetCard({ pet, active }: PetCardProps) {
  return (
    <div className={cn(
      "absolute inset-0 bg-surface-container-lowest rounded-[40px] shadow-[0_32px_64px_-16px_rgba(32,27,15,0.2)] overflow-hidden transform transition-all duration-700",
      active ? "rotate-0 scale-100 opacity-100" : "rotate-2 scale-[0.98] opacity-0"
    )}>
      <div className="relative h-full w-full">
        <Image
          src={pet.photos[0]}
          alt={pet.name}
          fill
          className={cn(
            "object-cover transition-transform duration-[2000ms]",
            active ? "scale-100" : "scale-110"
          )}
        />
        
        {/* Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-8 right-8 animate-in fade-in zoom-in duration-700 delay-300">
          <div className="bg-secondary-container/90 backdrop-blur-md text-on-secondary-container px-6 py-2 rounded-full flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-xl">
            <ShieldCheck className="h-4 w-4" />
            {pet.pet_type === "perro" ? "CANINO" : "FELINO"}
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-10 text-white space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <h1 className="font-plus-jakarta font-black text-5xl md:text-6xl tracking-tighter leading-none">{pet.name}</h1>
              <span className="font-be-vietnam text-2xl font-medium opacity-80">
                {Math.floor(pet.estimated_age_months / 12) > 0 
                  ? `${Math.floor(pet.estimated_age_months / 12)} años` 
                  : `${pet.estimated_age_months} meses`}
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-black uppercase tracking-widest">{pet.breed || "Mestizo"} • 1.5 km</span>
            </div>
          </div>
          
          <p className="font-be-vietnam text-lg leading-relaxed opacity-90 max-w-[90%] font-medium line-clamp-3">
            {pet.story || pet.personality || "Soy un compañero ideal buscando un hogar para llenar de alegría y juegos infinitos."}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[pet.personality, pet.sex, pet.estimated_size].filter(Boolean).map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
