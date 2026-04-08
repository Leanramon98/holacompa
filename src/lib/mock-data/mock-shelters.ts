import { Shelter } from "@/types";

export const mockShelters: Shelter[] = [
  {
    profile_id: "shelter-1",
    shelter_name: "Refugio Patitas del Sur",
    shelter_type: "ong",
    cuit: "30-12345678-9",
    description: "Rescatamos perros en situación de calle en la zona sur de GBA. Tenemos más de 10 años de experiencia.",
    founded_year: 2014,
    approximate_rescues_per_year: 150,
    website: "https://patitasdelsur.org",
    social_media: {
      instagram: "@patitasdelsur",
      facebook: "Refugio Patitas del Sur"
    },
    verification_status: "approved",
    verified_at: "2024-01-15T10:00:00Z",
    premium_plan: true,
    photos: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"],
  },
  {
    profile_id: "shelter-2",
    shelter_name: "Asociación Manada Libre",
    shelter_type: "ong",
    description: "Ubicados en zona norte, nos enfocamos en el rescate y rehabilitación de perros de razas grandes y PPP.",
    founded_year: 2018,
    approximate_rescues_per_year: 80,
    verification_status: "approved",
    verified_at: "2024-02-20T14:30:00Z",
    premium_plan: false,
    photos: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"],
  },
  {
    profile_id: "shelter-3",
    shelter_name: "Rescatados del Oeste",
    shelter_type: "grupo_informal",
    description: "Red de hogares de tránsito de la zona oeste especializados en gatitos recién nacidos.",
    verification_status: "approved",
    verified_at: "2024-03-05T09:15:00Z",
    premium_plan: false,
    photos: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"],
  },
  {
    profile_id: "shelter-4",
    shelter_name: "El Campito de San Telmo",
    shelter_type: "rescatista",
    description: "Rescatista independiente en CABA. Pequeño refugio urbano enfocado en perros senior.",
    verification_status: "approved",
    verified_at: "2024-03-25T17:45:00Z",
    premium_plan: false,
    photos: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"],
  },
  {
    profile_id: "shelter-5",
    shelter_name: "Peludos de Lanús",
    shelter_type: "ong",
    description: "Refugio municipal con gestión externa de voluntarios. Trabajamos por el bienestar animal en Lanús.",
    verification_status: "pending",
    premium_plan: true,
    photos: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"],
  }
];

export const getShelters = async () => mockShelters;
export const getShelterById = async (id: string) => mockShelters.find(s => s.profile_id === id);
export const getShelterBySlug = async (slug: string) => {
  // En este mock simple, convertimos el nombre a slug
  return mockShelters.find(s => 
    s.shelter_name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "") === slug
  );
};
