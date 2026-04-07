import { getPets } from "@/lib/data/pets";
import { PetGrid } from "@/components/adoptante/pet-grid";
import { FilterSection } from "@/components/adoptante/filter-section";
import { ModeToggle } from "@/components/adoptante/mode-toggle";

export default async function ExplorarPage() {
  const pets = await getPets({ status: "disponible" });

  return (
    <div className="min-h-screen bg-crema">
      {/* Header Interactivo */}
      <div className="sticky top-16 z-40 bg-crema/80 backdrop-blur-md border-b border-marron/5 py-4 px-4 sm:px-6 lg:px-8 space-y-4">
        <ModeToggle />
      </div>

      <main className="container mx-auto px-4 pt-12 space-y-12">
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-marron tracking-tight">Explorá a todos los compas</h1>
            <p className="text-marron/60 font-medium">Buscá y filtrá para encontrar a tu compañero ideal en toda la red.</p>
          </div>
        </div>

        {/* Filters */}
        <FilterSection />

        {/* Grid Results */}
        <PetGrid initialPets={pets} />
      </main>
    </div>
  );
}
