"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Pet } from "@/types";
import { PetCard } from "./pet-card";
import { Button } from "@/components/ui/button";
import { X, Heart, Rocket, Sparkles, Undo2 } from "lucide-react";
import { useAdoptionStore } from "@/stores/useAdoptionStore";

interface SwipeDeckProps {
  pets: Pet[];
}

export function SwipeDeck({ pets }: SwipeDeckProps) {
  const { addToHistory, popFromHistory, toggleFavorite } = useAdoptionStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPet = useMemo(() => pets[currentIndex], [pets, currentIndex]);
  const nextPet = useMemo(() => pets[currentIndex + 1], [pets, currentIndex]);

  // Gestures
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-15, 15]);
  const opacity = useTransform(x, [-300, -200, 0, 200, 300], [0, 1, 1, 1, 0]);
  const favOpacity = useTransform(x, [100, 200], [0, 1]);
  const passOpacity = useTransform(x, [-200, -100], [1, 0]);
  
  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up') => {
    if (currentIndex >= pets.length) return;
    
    addToHistory(pets[currentIndex].id);
    
    if (direction === 'right') {
      toggleFavorite(pets[currentIndex].id);
    } else if (direction === 'up') {
      console.log("Postulado a:", pets[currentIndex].name);
    }

    setCurrentIndex(prev => prev + 1);
    x.set(0);
    y.set(0);
  }, [currentIndex, pets, addToHistory, toggleFavorite, x, y]);

  const handleUndo = useCallback(() => {
    const lastId = popFromHistory();
    if (lastId && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [popFromHistory, currentIndex]);

  if (currentIndex >= pets.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="h-40 w-40 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 animate-pulse">
          <Sparkles className="h-16 w-16" />
        </div>
        <h2 className="text-4xl font-extrabold text-on-surface mb-4 tracking-tighter">
          ¡Terminaste por hoy!
        </h2>
        <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed mb-10 text-lg">
          Viste todas las mascotas que matchean con tu perfil. Volvé pronto que siempre llegan nuevos compas.
        </p>
        <Button 
          onClick={() => setCurrentIndex(0)}
          className="rounded-full editorial-gradient text-white font-bold px-10 h-14 text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          Volver a empezar
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* The Cards Stack */}
      <div className="relative w-full h-[800px] mb-8">
        <AnimatePresence mode="popLayout">
          {/* Base Card (Looking from behind) */}
          {nextPet && (
            <div className="absolute inset-0 scale-[0.98] blur-[1px] opacity-40 translate-y-4 origin-bottom pointer-events-none">
              <PetCard pet={nextPet} />
            </div>
          )}

          {/* Current Card (Interactive) */}
          <motion.div
            key={currentPet.id}
            style={{ x, y, rotate, opacity }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              const swipeThreshold = 150;
              if (info.offset.x > swipeThreshold) handleSwipe('right');
              else if (info.offset.x < -swipeThreshold) handleSwipe('left');
              else if (info.offset.y < -swipeThreshold) handleSwipe('up');
            }}
            whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute inset-0 z-10"
          >
            <PetCard pet={currentPet} />
            
            {/* Visual Indicators while swiping */}
            <motion.div 
              style={{ opacity: favOpacity }}
              className="absolute top-20 right-10 rotate-12 border-4 border-primary text-primary px-8 py-3 rounded-2xl text-4xl font-black uppercase pointer-events-none z-20 shadow-2xl bg-white/10 backdrop-blur-sm"
            >
              FAVORITO
            </motion.div>
            <motion.div 
              style={{ opacity: passOpacity }}
              className="absolute top-20 left-10 -rotate-12 border-4 border-error text-error px-8 py-3 rounded-2xl text-4xl font-black uppercase pointer-events-none z-20 shadow-2xl bg-white/10 backdrop-blur-sm"
            >
              PASAR
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interaction Floating Buttons */}
      <div className="flex justify-center items-center gap-8 -mt-20 relative z-20">
        {/* Undo (Added from previous version, it was useful) */}
        <button 
          onClick={handleUndo}
          className="w-14 h-14 rounded-full bg-white shadow-lg text-on-surface-variant hover:bg-surface-container transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 group/undo border border-outline-variant/10"
        >
          <Undo2 className="w-6 h-6" />
        </button>

        {/* Pass (Left) */}
        <button 
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-white shadow-lg text-error hover:bg-error/5 transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 group/pass border border-outline-variant/10"
        >
          <X className="w-8 h-8" strokeWidth={3} />
        </button>

        {/* Postulate (Center) */}
        <button 
          onClick={() => handleSwipe('up')}
          className="editorial-gradient w-24 h-24 rounded-full shadow-2xl text-white flex flex-col items-center justify-center transform hover:scale-110 active:scale-95 group/postulate animate-bounce-subtle"
        >
          <Rocket className="w-10 h-10 mb-1 fill-white" strokeWidth={2} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">Postular</span>
        </button>

        {/* Favorite (Right) */}
        <button 
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 rounded-full bg-white shadow-lg text-primary hover:bg-primary/5 transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 group/fav border border-outline-variant/10"
        >
          <Heart className="w-8 h-8 fill-primary/10" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
