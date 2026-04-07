import { Vendor } from "@/types";
import { mockVendors } from "@/lib/mock-data/mock-vendors";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getVendors(): Promise<Vendor[]> {
  await delay(400);
  return [...mockVendors];
}

export async function getVendorById(id: string): Promise<Vendor | null> {
  await delay(200);
  const vendor = mockVendors.find(v => v.profile_id === id);
  return vendor || null;
}
