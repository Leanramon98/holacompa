"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Pet } from "@/types";
import { PetCard } from "./pet-card";
import { Button } from "@/components/ui/button";
import { Undo2, X, Heart, Star, Sparkles } from "lucide-react";
import { useAdoptionStore } from "@/stores/useAdoptionStore";

interface SwipeDeckProps {
  pets: Pet[];
}

export function SwipeDeck({ pets }: SwipeDeckProps) {
  const { addToHistory, popFromHistory, toggleFavorite } = useAdoptionStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | undefined>();

  const currentPet = useMemo(() => pets[currentIndex], [pets, currentIndex]);
  const nextPet = useMemo(() => pets[currentIndex + 1], [pets, currentIndex]);

  // Gestos
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up') => {
    if (currentIndex >= pets.length) return;
    
    setLastDirection(direction);
    addToHistory(pets[currentIndex].id);
    
    if (direction === 'right') {
      console.log("Favorito:", pets[currentIndex].name);
      toggleFavorite(pets[currentIndex].id);
    } else if (direction === 'up') {
      console.log("Postulado a:", pets[currentIndex].name);
    } else {
      console.log("Pasado:", pets[currentIndex].name);
    }

    setCurrentIndex(prev => prev + 1);
    x.set(0);
    y.set(0);
  }, [currentIndex, pets, addToHistory, toggleFavorite, x, y]);

  const handleUndo = useCallback(() => {
    const lastId = popFromHistory();
    if (lastId && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setLastDirection(undefined);
    }
  }, [popFromHistory, currentIndex]);

  if (currentIndex >= pets.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="h-40 w-40 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 animate-pulse">
          <Sparkles className="h-16 w-16" />
        </div>
        <h2 className="text-3xl font-extrabold text-marron mb-4 tracking-tight">
          ¡Viste a todos los compas por hoy!
        </h2>
        <p className="text-marron/60 max-w-md mx-auto leading-relaxed mb-10">
          Por ahora viste todas las mascotas que matchean. Volvé pronto, siempre llegan compas nuevos buscando un hogar.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setCurrentIndex(0)}
          className="rounded-full border-primary/20 text-primary font-bold px-8 h-12"
        >
          Volver a empezar
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px] flex flex-col gap-10">
      {/* The Cards Stack */}
      <div className="relative flex-grow pointer-events-none">
        <AnimatePresence mode="popLayout">
          {/* Base Card (Looking from behind) */}
          {nextPet && (
            <div className="absolute inset-0 scale-[0.92] blur-[1px] opacity-40 translate-y-2 origin-bottom">
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
              const swipeThreshold = 100;
              if (info.offset.x > swipeThreshold) handleSwipe('right');
              else if (info.offset.x < -swipeThreshold) handleSwipe('left');
              else if (info.offset.y < -swipeThreshold) handleSwipe('up');
            }}
            whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute inset-0 pointer-events-auto z-10"
          >
            <PetCard pet={currentPet} />
            
            {/* Visual Indicators while swiping */}
            {x.get() > 50 && (
              <motion.div 
                style={{ opacity: useTransform(x, [50, 150], [0, 1]) }}
                className="absolute inset-x-0 top-10 flex justify-center z-20 pointer-events-none"
              >
                <div className="bg-primary/90 text-white font-black text-4xl px-8 py-3 rounded-2xl rotate-12 shadow-xl border-4 border-white/20">
                  FAVORITO
                </div>
              </motion.div>
            )}
            {x.get() < -50 && (
              <motion.div 
                style={{ opacity: useTransform(x, [-50, -150], [0, 1]) }}
                className="absolute inset-x-0 top-10 flex justify-center z-20 pointer-events-none"
              >
                <div className="bg-marron/90 text-white font-black text-4xl px-8 py-3 rounded-2xl -rotate-12 shadow-xl border-4 border-white/20">
                  PASAR
                </div>
              </motion.div>
            )}
            {y.get() < -50 && (
              <motion.div 
                style={{ opacity: useTransform(y, [-50, -150], [0, 1]) }}
                className="absolute inset-x-0 top-10 flex justify-center z-20 pointer-events-none"
              >
                <div className="bg-marron-dark text-white font-black text-4xl px-8 py-3 rounded-2xl shadow-xl border-4 border-white/20">
                  QUIERO ADOPTAR
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleUndo}
          className="h-14 w-14 rounded-full border-marron/5 bg-white shadow-lg text-marron hover:bg-marron/5 hover:text-primary transition-all group"
        >
          <Undo2 className="h-6 w-6 group-active:-rotate-90 transition-transform" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSwipe('left')}
          className="h-16 w-16 rounded-full border-marron/5 bg-white shadow-lg text-marron/40 hover:bg-marron/5 hover:text-marron transition-all"
        >
          <X className="h-8 w-8" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSwipe('right')}
          className="h-20 w-20 rounded-full border-primary/5 bg-white shadow-xl text-primary hover:bg-primary/5 hover:scale-110 active:scale-95 transition-all"
        >
          <Heart className="h-10 w-10 fill-primary/10" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSwipe('up')}
          className="h-20 w-20 rounded-full border-marron/5 bg-white shadow-xl text-marron hover:bg-marron/5 hover:scale-110 active:scale-95 transition-all"
        >
          <Star className="h-10 w-10 text-marron fill-marron/10" />
        </Button>
      </div>
    </div>
  );
}
