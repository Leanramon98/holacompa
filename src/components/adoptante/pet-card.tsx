"use client";

import Image from "next/image";
import { Pet } from "@/types";
import { ShieldCheck, MapPin, Heart, ArrowUp, X, Sparkles, Undo2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPetAge, getPetTags } from "@/lib/utils/pet-helpers";

interface PetCardProps {
  pet: Pet;
  showProfile?: () => void;
}

export function PetCard({ pet, showProfile }: PetCardProps) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl bg-white select-none">
      {/* Main Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={pet.photos[0]}
          alt={pet.name}
          fill
          className="object-cover"
          priority
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-marron/90 via-marron/20 to-transparent" />
      </div>

      {/* Basic Info (Overlay) */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <Badge className="bg-primary/95 text-white border-none rounded-lg px-2 h-6 font-bold text-[10px] uppercase tracking-wider">
            {pet.pet_type}
          </Badge>
          <div className="flex items-center gap-1 text-white/60 text-xs font-bold">
            <MapPin className="h-3 w-3" />
            <span>a 3.2 km de vos</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            {pet.name}, <span className="font-medium opacity-80">{formatPetAge(pet.estimated_age_months)}</span>
          </h2>
        </div>

        <p className="text-white/70 font-semibold line-clamp-1 mb-2">
          {pet.breed || "Mestizo/a"} • {pet.estimated_size} • {pet.sex}
        </p>

        {/* Action Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {getPetTags(pet).slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="bg-white/10 text-white/90 border-white/20 backdrop-blur-md rounded-full px-3 font-bold text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button 
          variant="ghost" 
          onClick={showProfile}
          className="w-full h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/30 backdrop-blur-sm transition-all"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Ver perfil completo
        </Button>
      </div>
    </div>
  );
}
