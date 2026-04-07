import { Pet } from "@/types";

export function formatPetAge(months: number): string {
  if (months < 12) {
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }
  return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
}

export function getPetTags(pet: Pet): string[] {
  const tags: string[] = [];
  
  if (pet.is_neutered) tags.push("Castrado/a");
  if (pet.vaccines_up_to_date) tags.push("Vacunas al día");
  if (pet.good_with_children) tags.push("Niños SI");
  if (pet.apt_for_apartment) tags.push("Apto depto");
  if (pet.energy_level === "bajo") tags.push("Tranquilo/a");
  if (pet.energy_level === "alto") tags.push("Activo/a");
  
  return tags;
}
