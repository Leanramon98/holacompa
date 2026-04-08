import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Pet, PetType, PetSize, EnergyLevel } from "@/types";

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

  // Feed de mascotas
  pets: Pet[];
  setPets: (pets: Pet[]) => void;
  currentIndex: number;
  setIndex: (index: number) => void;

  // Mascotas "descartadas" temporalmente en la sesión para el deck
  skippedPets: string[];
  addToSkipped: (petId: string) => void;
  clearSessionData: () => void;
}

export const useAdoptionStore = create<AdoptionState>()(
  persist(
    (set, get) => ({
      viewMode: "deck",
      setViewMode: (mode: "deck" | "grid") => set({ viewMode: mode }),

      filters: {
        pet_type: "todos",
        sex: "todos",
        size: "todos",
        energy_level: "todos",
        max_distance: 50,
        characteristics: {},
        searchQuery: "",
      },
      setFilters: (newFilters: Partial<AdoptionFilters>) => 
        set((state: AdoptionState) => ({ filters: { ...state.filters, ...newFilters } })),
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
      toggleFavorite: (petId: string) => set((state: AdoptionState) => ({
        favorites: state.favorites.includes(petId)
          ? state.favorites.filter((id) => id !== petId)
          : [...state.favorites, petId],
      })),

      seenHistory: [],
      addToHistory: (petId: string) => set((state: AdoptionState) => {
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

      pets: [],
      setPets: (pets: Pet[]) => set({ pets }),
      currentIndex: 0,
      setIndex: (currentIndex: number) => set({ currentIndex }),

      skippedPets: [],
      addToSkipped: (petId: string) => set((state: AdoptionState) => ({
        skippedPets: [...state.skippedPets, petId]
      })),
      clearSessionData: () => set({ seenHistory: [], skippedPets: [] }),
    }),
    {
      name: "holacompa-adoption-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AdoptionState) => ({ 
        viewMode: state.viewMode, 
        favorites: state.favorites,
        filters: state.filters,
        currentIndex: state.currentIndex
      }), // Solo persistimos lo importante a largo plazo
    }
  )
);
