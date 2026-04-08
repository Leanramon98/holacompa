import { Product, ProductStatus, PetType } from "@/types";
import { mockProducts } from "@/lib/mock-data/mock-products";

export interface ProductFilters {
  category_id?: string;
  vendor_id?: string;
  pet_type?: PetType;
  status?: ProductStatus;
  min_price?: number;
  max_price?: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  await delay(600);
  
  let result = [...mockProducts];
  
  if (filters) {
    if (filters.category_id) {
      result = result.filter(p => p.category_id === filters.category_id);
    }
    if (filters.vendor_id) {
      result = result.filter(p => p.vendor_id === filters.vendor_id);
    }
    if (filters.pet_type) {
      result = result.filter(p => p.pet_types.includes(filters.pet_type!));
    }
    if (filters.status) {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters.min_price !== undefined) {
      result = result.filter(p => (p.promo_price || p.price) >= filters.min_price!);
    }
    if (filters.max_price !== undefined) {
      result = result.filter(p => (p.promo_price || p.price) <= filters.max_price!);
    }
  }
  
  return result;
}

export async function getProductById(id: string): Promise<Product | null> {
  await delay(300);
  const product = mockProducts.find(p => p.id === id);
  return product || null;
}

export async function getProductsByVendorId(id: string): Promise<Product[]> {
  await delay(300);
  return mockProducts.filter(p => p.vendor_id === id);
}
