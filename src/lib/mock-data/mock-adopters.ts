import { Adopter, Profile } from "@/types";

export const mockAdopterProfiles: Profile[] = [
  {
    id: "user-1",
    role: "adoptante",
    full_name: "Juan Pérez",
    avatar_url: "https://i.pravatar.cc/150?u=user-1",
    city: "CABA",
    province: "Buenos Aires",
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "user-2",
    role: "adoptante",
    full_name: "María García",
    avatar_url: "https://i.pravatar.cc/150?u=user-2",
    city: "Castelar",
    province: "Buenos Aires",
    created_at: "2024-02-15T10:00:00Z",
    updated_at: "2024-02-15T10:00:00Z",
  },
  {
    id: "user-3",
    role: "adoptante",
    full_name: "Lucas González",
    avatar_url: "https://i.pravatar.cc/150?u=user-3",
    city: "Lanús",
    province: "Buenos Aires",
    created_at: "2024-03-01T10:00:00Z",
    updated_at: "2024-03-01T10:00:00Z",
  }
];

export const mockAdopters: Adopter[] = [
  {
    profile_id: "user-1",
    date_of_birth: "1990-05-15",
    housing_type: "departamento",
    has_yard: false,
    has_other_pets: true,
    has_children: false,
    preferred_pet_types: ["perro", "gato"],
    preferred_sizes: ["chico", "mediano"],
    preferred_ages: ["cachorro", "joven"],
    preferred_energy_levels: ["medio"],
    experience_with_pets: "Tuve perros toda mi vida, actualmente tengo una perra de 5 años.",
  },
  {
    profile_id: "user-2",
    date_of_birth: "1985-11-20",
    housing_type: "casa",
    has_yard: true,
    has_other_pets: false,
    has_children: true,
    preferred_pet_types: ["perro"],
    preferred_sizes: ["grande"],
    preferred_ages: ["adulto"],
    preferred_energy_levels: ["bajo", "medio"],
    experience_with_pets: "Buscamos un perro tranquilo para que crezca con los chicos.",
  },
  {
    profile_id: "user-3",
    date_of_birth: "2000-01-01",
    housing_type: "otro",
    has_yard: true,
    has_other_pets: false,
    has_children: false,
    preferred_pet_types: ["gato"],
    preferred_sizes: ["chico"],
    preferred_ages: ["cachorro"],
    preferred_energy_levels: ["alto"],
    experience_with_pets: "Vivo solo y quiero mi primer gatito.",
  }
];
