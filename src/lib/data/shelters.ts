import { Shelter } from "@/types";
import { mockShelters } from "@/lib/mock-data/mock-shelters";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getShelters(): Promise<Shelter[]> {
  await delay(400);
  return [...mockShelters];
}

export async function getShelterById(id: string): Promise<Shelter | null> {
  await delay(200);
  const shelter = mockShelters.find(s => s.profile_id === id);
  return shelter || null;
}
