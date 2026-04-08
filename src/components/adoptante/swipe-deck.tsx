"use client";

import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { PetCard } from "./pet-card";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Heart, Star, History, Zap, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pet } from "@/types";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";

export function SwipeDeck() {
  const { pets, currentIndex, setIndex, filters, toggleFavorite, favorites } = useAdoptionStore();
  
  const filteredPets = useMemo(() => {
    return pets.filter((p: Pet) => {
      if (filters.pet_type && filters.pet_type !== 'todos' && p.pet_type !== filters.pet_type) return false;
      return true;
    });
  }, [pets, filters]);

  // We only show the current pet and the one below it
  const currentPet = filteredPets[currentIndex];
  const nextPet = filteredPets[currentIndex + 1];

  const handleSwipe = (dir: "left" | "right" | "up") => {
    if (!currentPet) return;

    if (dir === "right" || dir === "up") {
      if (!favorites.includes(currentPet.id)) {
        toggleFavorite(currentPet.id);
      }
    }

    setDirection(dir);
    // Move to next pet after animation
    setTimeout(() => {
       setIndex(currentIndex + 1);
       setDirection(null);
    }, 200);
  };

  const [direction, setDirection] = useState<"left" | "right" | "up" | null>(null);

  if (!currentPet) return (
    <div className="flex flex-col items-center justify-center p-20 text-center space-y-8 animate-in fade-in zoom-in duration-1000">
      <div className="w-40 h-40 bg-surface-container-low rounded-full flex items-center justify-center border-2 border-outline-variant/10">
        <Rocket className="h-20 w-20 text-primary opacity-30 animate-pulse" />
      </div>
      <h2 className="text-4xl font-black font-plus-jakarta tracking-tight">No hay más "Compas" cerca</h2>
      <p className="text-on-surface-variant/60 font-medium max-w-sm text-lg">Ajustá tus filtros para seguir descubriendo.</p>
      <Button 
        onClick={() => setIndex(0)} 
        className="bg-primary text-on-primary rounded-full px-12 py-8 font-black uppercase tracking-widest text-lg shadow-2xl hover:scale-105 transition-all h-auto border-none"
      >
        Volver a empezar
      </Button>
    </div>
  );

  return (
    <div className="w-full max-w-[400px] aspect-[3/4.5] relative mx-auto">
      <AnimatePresence mode="popLayout">
        <DraggableCard 
          key={currentPet.id}
          pet={currentPet} 
          onSwipe={handleSwipe}
          isTop={true} 
        />
        {nextPet && (
          <div key={nextPet.id} className="absolute inset-0 -z-10 scale-95 translate-y-4 opacity-50">
             <PetCard pet={nextPet} active={false} />
          </div>
        )}
      </AnimatePresence>

      {/* Floating Iconic Buttons */}
      <div className="absolute -bottom-36 left-0 right-0 flex items-center justify-center gap-4 px-4">
        <button 
          onClick={() => setIndex(Math.max(0, currentIndex - 1))}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-primary shadow-xl border border-black/5 active:scale-90 transition-all"
        >
          <History className="h-5 w-5" />
        </button>

        <button 
          onClick={() => handleSwipe("left")}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-error shadow-xl border border-error/10 active:scale-90 transition-all hover:bg-error hover:text-white"
        >
          <X className="h-8 w-8 stroke-[3px]" />
        </button>

        <button 
          onClick={() => handleSwipe("up")}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-tertiary shadow-xl border border-tertiary/10 active:scale-90 transition-all hover:bg-tertiary hover:text-white"
        >
          <Star className="h-6 w-6 fill-current" />
        </button>

        <button 
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-xl active:scale-90 transition-all"
        >
          <Heart className="h-8 w-8 fill-current" />
        </button>

        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-secondary shadow-xl border border-black/5 active:scale-90 transition-all">
          <Zap className="h-5 w-5 fill-current" />
        </button>
      </div>
    </div>
  );
}

function DraggableCard({ pet, onSwipe, isTop }: { pet: any, onSwipe: (dir: any) => void, isTop: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-300, -250, 0, 250, 300], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);
  const superLikeOpacity = useTransform(y, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 120;
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    } else if (info.offset.y < -threshold) {
      onSwipe("up");
    }
  };

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
          x: x.get() > 0 ? 500 : x.get() < 0 ? -500 : 0, 
          y: y.get() < -100 ? -500 : 0, 
          opacity: 0,
          rotate: x.get() > 0 ? 45 : -45 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="relative h-full w-full pointer-events-none">
        <PetCard pet={pet} active={true} />
        
        {/* Overlays */}
        <motion.div 
            style={{ opacity: likeOpacity }}
            className="absolute top-10 left-10 border-8 border-primary rounded-2xl px-8 py-4 rotate-[-20deg] z-50 pointer-events-none"
        >
            <span className="text-primary font-black text-6xl uppercase tracking-widest">LIKE</span>
        </motion.div>

        <motion.div 
            style={{ opacity: nopeOpacity }}
            className="absolute top-10 right-10 border-8 border-error rounded-2xl px-8 py-4 rotate-[20deg] z-50 pointer-events-none"
        >
            <span className="text-error font-black text-6xl uppercase tracking-widest">NOPE</span>
        </motion.div>

        <motion.div 
            style={{ opacity: superLikeOpacity }}
            className="absolute bottom-40 left-1/2 -translate-x-1/2 border-8 border-tertiary rounded-2xl px-8 py-4 z-50 pointer-events-none"
        >
            <span className="text-tertiary font-black text-5xl uppercase tracking-widest text-center block">SUPER<br/>LIKE</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
