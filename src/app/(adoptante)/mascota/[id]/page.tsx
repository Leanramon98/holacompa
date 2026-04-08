import Image from "next/image";
import Link from "next/link";
import { mockPets } from "@/lib/mock-data/mock-pets";

export async function generateStaticParams() {
  return mockPets.map((pet) => ({
    id: pet.id,
  }));
}

import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Quote, 
  MessageSquare, 
  Share2, 
  CheckCircle2,
  Trophy,
  Activity,
  History
} from "lucide-react";
import { getPetById } from "@/lib/data/pets";
import { getShelterById } from "@/lib/data/shelters";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

export default async function PetProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pet = await getPetById(id);
  if (!pet) notFound();

  const currentPet = pet!;
  const shelter = await getShelterById(currentPet.shelter_id);

  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-40">
      
      {/* Dynamic Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/explorar" className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container active:scale-90 transition-all">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-plus-jakarta font-black text-xl tracking-tighter text-on-surface">Detalle del Compa</h1>
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container active:scale-90 transition-all text-error">
            <Heart className="h-5 w-5 fill-error" />
          </button>
        </div>
      </header>

      <main className="relative">
        
        {/* Hero Gallery Section */}
        <section className="relative h-[550px] w-full overflow-hidden">
          <Image 
            src={currentPet.photos[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2574&auto=format&fit=crop"} 
            alt={currentPet.name}
            fill
            className="object-cover animate-in zoom-in-105 duration-[2s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
          
          {/* Status Badge */}
          <div className="absolute top-28 left-8 z-10">
            <span className="bg-secondary-container/90 backdrop-blur-xl text-on-secondary-container px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-secondary/20 shadow-xl shadow-secondary/10">
              Disponible para Adopción
            </span>
          </div>
        </section>

        {/* Profile Overlap Card */}
        <section className="container mx-auto px-6 -mt-40 relative z-10 max-w-4xl">
          <div className="bg-white rounded-[60px] p-12 shadow-2xl shadow-primary/5 border border-outline-variant/5">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
              <div className="space-y-2">
                <h2 className="font-plus-jakarta text-6xl md:text-7xl font-black text-on-surface tracking-tighter leading-none">
                  {currentPet.name}
                </h2>
                <div className="flex items-center gap-3 text-on-surface-variant font-bold text-lg opacity-60">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>A {Math.floor(Math.random() * 10) + 1} km de distancia</span>
                </div>
              </div>
              <div className="bg-primary-container/30 w-24 h-24 rounded-[32px] flex items-center justify-center text-primary shadow-inner">
                <Trophy className="h-10 w-10 fill-primary/10" />
              </div>
            </div>

            {/* Chips Grid Bento Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary-container/20 p-6 rounded-[32px] flex flex-col items-center gap-2 border border-secondary-container/10 group hover:bg-secondary-container/40 transition-colors">
                <Calendar className="h-6 w-6 text-on-secondary-container opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-secondary-variant/40">Edad</span>
                <p className="font-black text-on-secondary-container text-sm">{Math.floor(currentPet.estimated_age_months / 12)} Años</p>
              </div>
              <div className="bg-tertiary-container/20 p-6 rounded-[32px] flex flex-col items-center gap-2 border border-tertiary-container/10 group hover:bg-tertiary-container/40 transition-colors">
                <Activity className="h-6 w-6 text-on-tertiary-container opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-tertiary-variant/40">Sexo</span>
                <p className="font-black text-on-tertiary-container text-sm">Macho</p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-[32px] flex flex-col items-center gap-2 border border-outline-variant/10 group hover:bg-white hover:shadow-xl transition-all">
                <ShieldCheck className="h-6 w-6 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Salud</span>
                <p className="font-black text-on-surface text-sm">Vacunado</p>
              </div>
              <div className="bg-primary-container/20 p-6 rounded-[32px] flex flex-col items-center gap-2 border border-primary-container/10 group hover:bg-primary-container/40 transition-colors">
                <History className="h-6 w-6 text-on-primary-container opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-primary-variant/40">Raza</span>
                <p className="font-black text-on-primary-container text-sm">{currentPet.breed}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Details & Shelter Section */}
        <section className="container mx-auto px-6 mt-16 max-w-4xl space-y-12">
          
          {/* About Me */}
          <div className="space-y-6">
            <h3 className="font-plus-jakarta text-3xl font-black text-on-surface tracking-tight">Sobre mi historia</h3>
            <div className="prose prose-stone prose-xl max-w-none">
              <p className="text-on-surface-variant leading-relaxed font-medium opacity-80">
                {currentPet.description || `¡Hola! Soy ${currentPet.name}. Soy un experto en mover la cola y me encanta dormir la siesta bajo el sol. Busco una familia que me quiera acompañar en mis caminatas diarias y que tenga un lugarcito en el sillón para acurrucarnos.`}
              </p>
            </div>
          </div>

          {/* Shelter Card */}
          <div className="p-10 bg-surface-container-lowest rounded-[48px] flex items-center justify-between border border-outline-variant/10 shadow-sm group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative group-hover:scale-110 transition-transform duration-700">
                <Image 
                  src={shelter?.photos[0] || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"} 
                  alt={shelter?.shelter_name || "Shelter"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-plus-jakarta font-black text-2xl tracking-tight">{shelter?.shelter_name || "Refugio Amigo"}</h4>
                  <CheckCircle2 className="h-5 w-5 text-secondary fill-secondary/10" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Refugio de Mascotas • ONG Verificada</p>
              </div>
            </div>
            <Link href={`/refugio/${shelter?.shelter_name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "")}`} className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xl shadow-primary/5">
              <MessageSquare className="h-6 w-6" />
            </Link>
          </div>

          {/* Moments Gallery */}
          <div className="space-y-8">
            <h3 className="font-plus-jakarta text-3xl font-black text-on-surface tracking-tight">Mis Momentos</h3>
            <div className="grid grid-cols-2 md:grid-cols-12 gap-6 h-[400px]">
              <div className="md:col-span-8 rounded-[40px] overflow-hidden relative group">
                <Image 
                  src={currentPet.photos[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2574&auto=format&fit=crop"} 
                  alt="Momento 1"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[3s]"
                />
              </div>
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="flex-1 rounded-[32px] overflow-hidden relative group">
                  <Image src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2588&auto=format&fit=crop" alt="Momento 2" fill className="object-cover group-hover:rotate-3 transition-transform" />
                </div>
                <div className="flex-1 rounded-[32px] overflow-hidden relative group">
                  <Image src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2686&auto=format&fit=crop" alt="Momento 3" fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-8 flex justify-center items-center pointer-events-none">
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-3xl rounded-[40px] p-3 shadow-2xl shadow-primary/20 border border-white/50 flex items-center gap-3 pointer-events-auto animate-in slide-in-from-bottom-12 duration-[1s]">
          <Link 
            href={`/postular/${currentPet.id}`}
            className="flex-1 bg-gradient-to-br from-primary to-primary-fixed-dim text-white py-5 rounded-[32px] flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Postular Ahora
            <Heart className="h-5 w-5 fill-white/20" />
          </Link>
          <button className="w-16 h-16 rounded-[32px] bg-primary-container/20 flex items-center justify-center text-primary hover:bg-primary-container/40 transition-all active:scale-90">
            <Share2 className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
