"use client";

import Image from "next/image";
import Link from "next/link";
import { Pet } from "@/types";
import { Heart, MapPin, ShieldCheck, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { cn } from "@/lib/utils";
import { formatPetAge, getPetTags } from "@/lib/utils/pet-helpers";

interface PetGridItemProps {
  pet: Pet;
}

export function PetGridItem({ pet }: PetGridItemProps) {
  const { favorites, toggleFavorite } = useAdoptionStore();
  const isFavorite = favorites.includes(pet.id);

  return (
    <Card className="rounded-3xl border-none shadow-sm group hover:shadow-xl transition-all overflow-hidden bg-white">
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden m-2">
        <Image
          src={pet.photos[0]}
          alt={pet.name}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
        />
        {/* Favorite Button Overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(pet.id);
          }}
          className={cn(
            "absolute top-3 right-3 p-3 rounded-full backdrop-blur-md transition-all shadow-lg active:scale-90",
            isFavorite 
              ? "bg-primary text-white" 
              : "bg-white/30 text-white hover:bg-white/50"
          )}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
        </button>

        {/* Info Strip (Fixed at bottom of image) */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="flex items-center gap-1.5 text-white/90 font-bold text-xs uppercase tracking-widest">
            <MapPin className="h-3 w-3" />
            <span>a 3 km</span>
          </div>
        </div>
      </div>

      <CardContent className="px-6 py-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-xl font-extrabold text-marron">{pet.name}</h3>
          <span className="text-sm font-bold text-marron/50">{formatPetAge(pet.estimated_age_months)}</span>
        </div>
        <p className="text-sm text-marron/60 font-semibold mb-4 leading-snug">
          {pet.breed} • {pet.estimated_size}
        </p>

        <div className="flex flex-wrap gap-2">
          {getPetTags(pet).slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="bg-marron/5 text-marron/60 border-none rounded-lg px-2 text-[10px] font-bold uppercase tracking-wider">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <Link href={`/mascota/${pet.id}`} className="w-full">
          <Button variant="ghost" className="w-full rounded-2xl bg-crema-dark text-marron font-bold group-hover:bg-primary group-hover:text-white transition-all h-12">
            Ver perfil
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
