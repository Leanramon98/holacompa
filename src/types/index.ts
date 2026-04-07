/**
 * Tipos de usuario de Hola Compa
 */
export type UserRole = "adoptante" | "refugio" | "vendedor" | "admin";

/**
 * Estados de verificación para refugios y vendedores
 */
export type VerificationStatus = "pending" | "approved" | "rejected" | "suspended";

/**
 * Datos básicos del perfil de usuario (extiende auth)
 */
export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  city?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

/**
 * Datos específicos del adoptante
 */
export type HousingType = "casa" | "departamento" | "otro";

export interface Adopter {
  profile_id: string;
  date_of_birth: string;
  housing_type: HousingType;
  has_yard: boolean;
  has_other_pets: boolean;
  has_children: boolean;
  preferred_pet_types: string[];
  preferred_sizes: string[];
  preferred_ages: string[];
  preferred_energy_levels: string[];
  experience_with_pets: string;
}

/**
 * Datos específicos del refugio
 */
export type ShelterType = "ong" | "grupo_informal" | "rescatista";

export interface Shelter {
  profile_id: string;
  shelter_name: string;
  shelter_type: ShelterType;
  cuit?: string;
  description: string;
  founded_year?: number;
  approximate_rescues_per_year?: number;
  website?: string;
  social_media?: Record<string, string>;
  verification_status: VerificationStatus;
  verification_documents?: any;
  verified_at?: string;
  premium_plan: boolean;
}

/**
 * Datos específicos del vendedor
 */
export type BusinessType = "petshop" | "marca" | "emprendedor" | "veterinaria" | "otro";
export type VendorPlan = "basic" | "premium" | "pro";

export interface Vendor {
  profile_id: string;
  business_name: string;
  business_type: BusinessType;
  legal_name?: string;
  cuit: string;
  description: string;
  categories: string[];
  address: string;
  website?: string;
  whatsapp?: string;
  social_media?: Record<string, string>;
  verification_status: VerificationStatus;
  verification_documents?: any;
  verified_at?: string;
  plan: VendorPlan;
  commission_rate: number;
}

/**
 * Mascota en adopción
 */
export type PetType = "perro" | "gato" | "conejo" | "otro";
export type PetSex = "macho" | "hembra";
export type PetSize = "chico" | "mediano" | "grande";
export type EnergyLevel = "bajo" | "medio" | "alto";
export type PetStatus = "disponible" | "en_proceso" | "adoptada";

export interface Pet {
  id: string;
  shelter_id: string;
  name: string;
  pet_type: PetType;
  sex: PetSex;
  estimated_age_months: number;
  estimated_size: PetSize;
  breed?: string;
  color: string;
  is_neutered: boolean;
  vaccines_up_to_date: boolean;
  is_dewormed: boolean;
  special_conditions?: string;
  good_with_children: boolean;
  good_with_dogs: boolean;
  good_with_cats: boolean;
  apt_for_apartment: boolean;
  energy_level: EnergyLevel;
  personality: string;
  story: string;
  adoption_requirements: string;
  photos: string[];
  video_url?: string;
  status: PetStatus;
  views_count: number;
  created_at: string;
  updated_at: string;
  adopted_at?: string;
}

/**
 * Postulaciones
 */
export type ApplicationStatus =
  | "pendiente"
  | "en_revision"
  | "entrevista"
  | "aceptada"
  | "concretada"
  | "rechazada"
  | "cancelada";

export interface AdoptionApplication {
  id: string;
  pet_id: string;
  adopter_id: string;
  shelter_id: string;
  status: ApplicationStatus;
  reason_to_adopt: string;
  daily_hours_alone: number;
  can_afford_vet: boolean;
  vet_explanation: string;
  commitment_signed: boolean;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Producto del marketplace
 */
export type ProductStatus = "activo" | "pausado" | "agotado";

export interface Product {
  id: string;
  vendor_id: string;
  title: string;
  description: string;
  category_id: string;
  brand: string;
  price: number;
  promo_price?: number;
  stock: number;
  sku?: string;
  variants?: any;
  pet_types: PetType[];
  recommended_size?: string;
  recommended_age?: string;
  photos: string[];
  contact_link?: string;
  whatsapp?: string;
  contact_email?: string;
  status: ProductStatus;
  views_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Conversaciones y mensajes
 */
export interface Conversation {
  id: string;
  adopter_id: string;
  shelter_id: string;
  pet_id?: string;
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  attachment_url?: string;
  read_at?: string;
  created_at: string;
}

/**
 * Donaciones
 */
export type PaymentStatus = "pending" | "approved" | "rejected" | "refunded";

export interface Donation {
  id: string;
  donor_id?: string;
  shelter_id: string;
  amount: number;
  platform_fee: number;
  net_amount: number;
  payment_method: string;
  payment_status: PaymentStatus;
  mercado_pago_id: string;
  is_anonymous: boolean;
  message?: string;
  created_at: string;
}

/**
 * Reseñas
 */
export type TargetType = "shelter" | "vendor" | "adopter";

export interface Review {
  id: string;
  author_id: string;
  target_type: TargetType;
  target_id: string;
  rating: number;
  comment: string;
  is_reported: boolean;
  created_at: string;
}

/**
 * Categorías del marketplace
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  parent_id?: string;
  order: number;
}
