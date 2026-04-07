import { Pet, PetType, PetSize, EnergyLevel, PetStatus } from "@/types";
import { mockPets } from "@/lib/mock-data/mock-pets";

export interface PetFilters {
  pet_type?: PetType;
  sex?: "macho" | "hembra";
  size?: PetSize;
  energy_level?: EnergyLevel;
  status?: PetStatus;
  shelter_id?: string;
}

/**
 * Resumen corto con delay para simular DB real
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getPets(filters?: PetFilters): Promise<Pet[]> {
  await delay(500); // Simular latencia de red
  
  let result = [...mockPets];
  
  if (filters) {
    if (filters.pet_type) {
      result = result.filter(p => p.pet_type === filters.pet_type);
    }
    if (filters.sex) {
      result = result.filter(p => p.sex === filters.sex);
    }
    if (filters.size) {
      result = result.filter(p => p.estimated_size === filters.size);
    }
    if (filters.energy_level) {
      result = result.filter(p => p.energy_level === filters.energy_level);
    }
    if (filters.status) {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters.shelter_id) {
      result = result.filter(p => p.shelter_id === filters.shelter_id);
    }
  }
  
  return result;
}

export async function getPetById(id: string): Promise<Pet | null> {
  await delay(300);
  const pet = mockPets.find(p => p.id === id);
  return pet || null;
}
