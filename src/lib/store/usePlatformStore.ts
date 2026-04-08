"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockPets } from "@/lib/mock-data/mock-pets";
import { mockProducts } from "@/lib/mock-data/mock-products";
import { mockShelters } from "@/lib/mock-data/mock-shelters";
import { mockVendors } from "@/lib/mock-data/mock-vendors";
import { Pet, Product, Shelter, Vendor, AdoptionApplication } from "@/types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'adoptante' | 'refugio' | 'vendedor' | 'superadmin';
  avatar?: string;
  profileId?: string; // Link to shelter or vendor profile
}

interface PlatformState {
  pets: Pet[];
  products: Product[];
  shelters: Shelter[];
  vendors: Vendor[];
  applications: AdoptionApplication[];
  currentUser: User | null;
  
  // Actions for Pets
  addPet: (pet: Pet) => void;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  
  // Actions for Products
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Actions for Applications
  addApplication: (app: AdoptionApplication) => void;
  updateApplicationStatus: (id: string, status: AdoptionApplication['status']) => void;
  
  // Actions for Verifications
  verifyEntity: (id: string, type: 'refugio' | 'vendedor', status: Shelter['verification_status']) => void;
  
  // Auth Actions
  setCurrentUser: (user: User | null) => void;
  registerUser: (name: string, email: string, role: User['role']) => void;
  logout: () => void;

  // Reset
  resetData: () => void;
}

export const usePlatformStore = create<PlatformState>()(
  persist(
    (set) => ({
      pets: mockPets,
      products: mockProducts,
      shelters: mockShelters,
      vendors: mockVendors,
      currentUser: null,
      applications: [],

      addPet: (pet: Pet) => set((state: PlatformState) => ({ pets: [pet, ...state.pets] })),
      updatePet: (id: string, updates: Partial<Pet>) => set((state: PlatformState) => ({
        pets: state.pets.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      deletePet: (id: string) => set((state: PlatformState) => ({
        pets: state.pets.filter(p => p.id !== id)
      })),

      addProduct: (product: Product) => set((state: PlatformState) => ({ products: [product, ...state.products] })),
      updateProduct: (id: string, updates: Partial<Product>) => set((state: PlatformState) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProduct: (id: string) => set((state: PlatformState) => ({
        products: state.products.filter(p => p.id !== id)
      })),

      addApplication: (app: AdoptionApplication) => set((state: PlatformState) => ({ 
        applications: [app, ...state.applications] 
      })),
      
      updateApplicationStatus: (id: string, status: AdoptionApplication['status']) => set((state: PlatformState) => ({
        applications: state.applications.map(a => a.id === id ? { ...a, status } : a)
      })),

      verifyEntity: (id: string, type: 'refugio' | 'vendedor', status: Shelter['verification_status']) => set((state: PlatformState) => {
        if (type === 'refugio') {
          return {
            shelters: state.shelters.map(s => s.profile_id === id ? { ...s, verification_status: status, verified_at: status === 'approved' ? new Date().toISOString() : undefined } : s)
          };
        } else {
          return {
            vendors: state.vendors.map(v => v.profile_id === id ? { ...v, verification_status: status, verified_at: status === 'approved' ? new Date().toISOString() : undefined } : v)
          };
        }
      }),

      setCurrentUser: (user) => set({ currentUser: user }),
      registerUser: (name, email, role) => {
        const newUser: User = {
          id: `u-${Math.random().toString(36).substr(2, 9)}`,
          name,
          email,
          role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        };
        set({ currentUser: newUser });
      },
      logout: () => set({ currentUser: null }),

      resetData: () => set({
        pets: mockPets,
        products: mockProducts,
        shelters: mockShelters,
        vendors: mockVendors,
        applications: [],
        currentUser: null
      })
    }),
    {
      name: "holacompa-platform-storage-v3",
    }
  )
);
