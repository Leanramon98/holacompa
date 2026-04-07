import { getPets } from "@/lib/data/pets";
import { SwipeDeck } from "@/components/adoptante/swipe-deck";
import { ModeToggle } from "@/components/adoptante/mode-toggle";
import { FilterSection } from "@/components/adoptante/filter-section";

export default async function DescubrirPage() {
  const pets = await getPets({ status: "disponible" });

  return (
    <div className="min-h-screen bg-crema pb-32">
      {/* Header Interactivo */}
      <div className="sticky top-16 z-40 bg-crema/80 backdrop-blur-md border-b border-marron/5 py-4 px-4 sm:px-6 lg:px-8 space-y-4">
        <ModeToggle />
      </div>

      <main className="container mx-auto px-4 pt-12 flex flex-col items-center">
        {/* Intro */}
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-3xl font-extrabold text-marron tracking-tight">Hacé match con tu compa</h1>
          <p className="text-marron/60 font-medium">Swipe a la derecha para flecharte con un nuevo amigo.</p>
        </div>

        {/* Swipe Deck */}
        <div className="w-full flex justify-center">
          <SwipeDeck pets={pets} />
        </div>
      </main>
    </div>
  );
}
