import { getPets } from "@/lib/data/pets";
import { SwipeDeck } from "@/components/adoptante/swipe-deck";
import { FilterSection } from "@/components/adoptante/filter-section";
import { ShieldCheck, Info } from "lucide-react";

export default async function DescubrirPage() {
  const pets = await getPets({ status: "disponible" });

  return (
    <div className="bg-surface text-on-surface pt-12 pb-24 min-h-screen">
      <main className="px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Filter Sidebar (Editorial Sidebar) */}
        <aside className="lg:col-span-3 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="bg-surface-container-low p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold mb-8 tracking-tighter text-primary">Filtros</h2>
            <FilterSection />
          </div>

          {/* Trust Badge */}
          <div className="bg-primary/5 p-6 rounded-2xl flex items-center gap-4 border border-primary/10">
            <div className="bg-primary/10 p-3 rounded-full">
               <ShieldCheck className="w-6 h-6 text-primary" strokeWidth={2} />
            </div>
            <div>
              <p className="font-bold text-primary text-sm uppercase tracking-widest">Refugios Verificados</p>
              <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">
                Todos nuestros miembros pasan un proceso de validación manual.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Swipe Area */}
        <section className="lg:col-span-9 flex flex-col items-center">
          <div className="w-full max-w-2xl">
             <SwipeDeck pets={pets} />
             
             {/* Hint Text */}
             <div className="mt-16 text-center space-y-4">
               <p className="text-on-surface-variant font-medium text-xs uppercase tracking-[0.2em] opacity-40 flex items-center justify-center gap-2">
                 <Info className="w-3 h-3" />
                 Usa las flechas del teclado: ← Pasar | ↑ Postular | → Favorito
               </p>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
