import { create } from "zustand";

interface MarketplaceFilter {
  category: string | null;
  priceRange: [number, number];
  petType: string | null;
  vendorId: string | null;
  sortBy: "relevance" | "price_asc" | "price_desc" | "best_seller";
  searchQuery: string;
}

interface MarketplaceState {
  filters: MarketplaceFilter;
  setFilter: (key: keyof MarketplaceFilter, value: any) => void;
  resetFilters: () => void;
  isFilterDrawerOpen: boolean;
  toggleFilterDrawer: (open?: boolean) => void;
}

const initialFilters: MarketplaceFilter = {
  category: null,
  priceRange: [0, 500000],
  petType: null,
  vendorId: null,
  sortBy: "relevance",
  searchQuery: "",
};

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  filters: initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: initialFilters }),
  isFilterDrawerOpen: false,
  toggleFilterDrawer: (open) =>
    set((state) => ({
      isFilterDrawerOpen: open ?? !state.isFilterDrawerOpen,
    })),
}));
