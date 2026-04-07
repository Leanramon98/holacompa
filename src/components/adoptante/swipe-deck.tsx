"use client";

import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { PetCard } from "./pet-card";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Heart, Star, History, Zap, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export function SwipeDeck() {
  const { pets, currentIndex, setIndex, filters } = useAdoptionStore();
  const [direction, setDirection] = useState<"left" | "right" | "up" | null>(null);

  const filteredPets = useMemo(() => {
    return pets.filter(p => {
      if (filters.pet_type && p.pet_type !== filters.pet_type) return false;
      if (filters.age && p.age !== filters.age) return false;
      if (filters.size !== "todos" && p.size !== filters.size) return false;
      return true;
    });
  }, [pets, filters]);

  const currentPet = filteredPets[currentIndex];

  const handleSwipe = (dir: "left" | "right" | "up") => {
    setDirection(dir);
    setTimeout(() => {
      setDirection(null);
      setIndex((currentIndex + 1) % filteredPets.length);
    }, 400);
  };

  if (!currentPet) return (
    <div className="flex flex-col items-center justify-center p-20 text-center space-y-8 animate-in fade-in zoom-in duration-1000">
      <div className="w-40 h-40 bg-surface-container-low rounded-full flex items-center justify-center border-2 border-outline-variant/10">
        <Rocket className="h-20 w-20 text-primary opacity-30 animate-pulse" />
      </div>
      <h2 className="text-4xl font-black font-plus-jakarta tracking-tight">No hay más "Compas" cerca</h2>
      <p className="text-on-surface-variant/60 font-medium max-w-sm text-lg">Ajustá tus filtros para seguir descubriendo nuevas historias.</p>
      <Button 
        onClick={() => setIndex(0)} 
        className="bg-primary text-on-primary rounded-full px-12 py-8 font-black uppercase tracking-widest text-lg shadow-2xl hover:scale-105 transition-all h-auto border-none"
      >
        Volver a empezar
      </Button>
    </div>
  );

  return (
    <div className="w-full max-w-lg aspect-[3/4] relative mx-auto group">
      {/* Visual Depth Stacks */}
      <div className="absolute inset-0 translate-y-6 scale-90 bg-surface-container-high rounded-[40px] -rotate-3 opacity-40 -z-10 shadow-lg" />
      <div className="absolute inset-0 translate-y-3 scale-95 bg-surface-container rounded-[40px] rotate-2 opacity-60 -z-10 shadow-lg" />
      
      {/* Active Pet Card */}
      <div className={cn(
          "transition-all duration-500 ease-out h-full w-full",
          direction === "left" && "-translate-x-[200%] -rotate-12 opacity-0",
          direction === "right" && "translate-x-[200%] rotate-12 opacity-0",
          direction === "up" && "-translate-y-[200%] scale-110 opacity-0"
        )}>
        <PetCard pet={currentPet} active={!direction} />
      </div>

      {/* Floating Iconic Buttons */}
      <div className="absolute -bottom-32 left-0 right-0 flex items-center justify-center gap-6 px-10 animate-in slide-in-from-bottom-20 duration-1000">
        {/* Rewind */}
        <button 
          onClick={() => setIndex(Math.max(0, currentIndex - 1))}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-[0_16px_32px_rgba(0,0,0,0.06)] border border-outline-variant/10 hover:scale-125 active:scale-90 transition-all group"
        >
          <History className="h-6 w-6 group-hover:rotate-[-45deg] transition-transform" />
        </button>

        {/* Pass (X) */}
        <button 
          onClick={() => handleSwipe("left")}
          className="w-20 h-20 flex items-center justify-center rounded-full bg-white text-error shadow-[0_24px_48px_rgba(186,26,26,0.15)] border border-error/5 hover:scale-110 active:scale-90 transition-all hover:bg-error hover:text-white"
        >
          <X className="h-10 w-10 stroke-[3px]" />
        </button>

        {/* Super Like (Star) */}
        <button 
          onClick={() => handleSwipe("up")}
          className="w-18 h-18 flex items-center justify-center rounded-full bg-surface-container-lowest text-tertiary shadow-[0_16px_32px_rgba(139,61,155,0.1)] border border-tertiary/10 hover:scale-110 active:scale-90 transition-all hover:bg-tertiary hover:text-white"
        >
          <Star className="h-8 w-8 fill-current" />
        </button>

        {/* Like (Heart) */}
        <button 
          onClick={() => handleSwipe("right")}
          className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_24px_48px_rgba(131,84,0,0.2)] hover:scale-110 active:scale-90 transition-all group border-none"
        >
          <Heart className="h-10 w-10 fill-current group-hover:scale-125 transition-transform" />
        </button>

        {/* Boost (Bolt) */}
        <button className="w-14 h-14 flex items-center justify-center rounded-full bg-surface-container-lowest text-secondary shadow-[0_16px_32px_rgba(0,0,0,0.06)] border border-outline-variant/10 hover:scale-125 active:scale-90 transition-all">
          <Zap className="h-6 w-6 fill-current" />
        </button>
      </div>

      {/* Decorative Textures */}
      <div className="fixed top-[20%] -left-20 w-80 h-80 bg-tertiary-container/10 rounded-full blur-[120px] -z-20 animate-pulse" />
      <div className="fixed bottom-[10%] -right-20 w-96 h-96 bg-primary-container/20 rounded-full blur-[140px] -z-20 animate-pulse" />
    </div>
  );
}
