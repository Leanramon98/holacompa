import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PetType, PetSize, EnergyLevel } from "@/types";

export interface AdoptionFilters {
  pet_type?: PetType | "todos";
  sex?: "macho" | "hembra" | "todos";
  size?: PetSize | "todos";
  energy_level?: EnergyLevel | "todos";
  max_distance?: number;
  characteristics?: {
    neutered?: boolean;
    vaccines?: boolean;
    children?: boolean;
    apartment?: boolean;
  };
  searchQuery?: string;
}

interface AdoptionState {
  // Configuración de vista
  viewMode: "deck" | "grid";
  setViewMode: (mode: "deck" | "grid") => void;

  // Filtros
  filters: AdoptionFilters;
  setFilters: (filters: Partial<AdoptionFilters>) => void;
  resetFilters: () => void;

  // Favoritos (IDs de mascotas)
  favorites: string[];
  toggleFavorite: (petId: string) => void;

  // Historial para el Deck (Swipe)
  seenHistory: string[]; // IDs de mascotas que ya pasaron
  addToHistory: (petId: string) => void;
  popFromHistory: () => string | undefined;

  // Mascotas "descartadas" temporalmente en la sesión para el deck
  skippedPets: string[];
  addToSkipped: (petId: string) => void;
  clearSessionData: () => void;
}

export const useAdoptionStore = create<AdoptionState>()(
  persist(
    (set, get) => ({
      viewMode: "deck",
      setViewMode: (mode) => set({ viewMode: mode }),

      filters: {
        pet_type: "todos",
        sex: "todos",
        size: "todos",
        energy_level: "todos",
        max_distance: 50,
        characteristics: {},
        searchQuery: "",
      },
      setFilters: (newFilters) => 
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      resetFilters: () => set({
        filters: {
          pet_type: "todos",
          sex: "todos",
          size: "todos",
          energy_level: "todos",
          max_distance: 50,
          characteristics: {},
          searchQuery: "",
        }
      }),

      favorites: [],
      toggleFavorite: (petId) => set((state) => ({
        favorites: state.favorites.includes(petId)
          ? state.favorites.filter((id) => id !== petId)
          : [...state.favorites, petId],
      })),

      seenHistory: [],
      addToHistory: (petId) => set((state) => {
        const newHistory = [...state.seenHistory, petId];
        // Mantener historial de máximo 10
        if (newHistory.length > 10) newHistory.shift();
        return { seenHistory: newHistory };
      }),
      popFromHistory: () => {
        const history = get().seenHistory;
        if (history.length === 0) return undefined;
        const lastId = history[history.length - 1];
        set({ seenHistory: history.slice(0, -1) });
        return lastId;
      },

      skippedPets: [],
      addToSkipped: (petId) => set((state) => ({
        skippedPets: [...state.skippedPets, petId]
      })),
      clearSessionData: () => set({ seenHistory: [], skippedPets: [] }),
    }),
    {
      name: "holacompa-adoption-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        viewMode: state.viewMode, 
        favorites: state.favorites,
        filters: state.filters 
      }), // Solo persistimos lo importante a largo plazo
    }
  )
);
