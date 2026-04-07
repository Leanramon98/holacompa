import { AdoptionApplication } from "@/types";
import { mockApplications } from "@/lib/mock-data/mock-applications";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getApplicationsByShelter(shelterId: string): Promise<AdoptionApplication[]> {
  await delay(500);
  return mockApplications.filter(a => a.shelter_id === shelterId);
}

export async function getApplicationsByAdopter(adopterId: string): Promise<AdoptionApplication[]> {
  await delay(500);
  return mockApplications.filter(a => a.adopter_id === adopterId);
}

export async function createApplication(data: Partial<AdoptionApplication>): Promise<AdoptionApplication> {
  await delay(800);
  const newApp: AdoptionApplication = {
    id: `app-${Date.now()}`,
    pet_id: data.pet_id || "",
    adopter_id: data.adopter_id || "",
    shelter_id: data.shelter_id || "",
    status: "pendiente",
    reason_to_adopt: data.reason_to_adopt || "",
    daily_hours_alone: data.daily_hours_alone || 0,
    can_afford_vet: data.can_afford_vet || false,
    vet_explanation: data.vet_explanation || "",
    commitment_signed: data.commitment_signed || false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  // En un entorno de producción, aquí guardaríamos en la DB
  console.log("Nueva postulación creada (simulación):", newApp);
  return newApp;
}
