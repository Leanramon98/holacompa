import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  ShieldCheck, 
  Syringe, 
  Stethoscope, 
  Baby, 
  Dog, 
  Cat, 
  Building2,
  Check,
  X,
  Calendar,
  Info
} from "lucide-react";

import { mockPets } from "@/lib/mock-data/mock-pets";
import { mockShelters } from "@/lib/mock-data/mock-shelters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PetGallery } from "@/components/adoptante/pet-gallery";

interface PetPageProps {
  params: {
    id: string;
  };
}


export async function generateStaticParams() {
  return mockPets.map((pet) => ({ id: pet.id }));
}

export async function generateMetadata({ params }: PetPageProps): Promise<Metadata> {
  const pet = mockPets.find((p) => p.id === params.id);
  if (!pet) return { title: "Mascota no encontrada | Hola Compa" };

  return {
    title: `${pet.name} en adopción | Hola Compa`,
    description: `Conocé a ${pet.name}, ${pet.pet_type === "perro" ? "un perrazo" : "un michi"} que busca hogar. ${pet.personality}`,
  };
}

function formatAge(months: number) {
  if (months < 12) {
    return `${months} ${months === 1 ? "mes" : "meses"}`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? "año" : "años"}`;
  }
  return `${years} ${years === 1 ? "año" : "años"} y ${remainingMonths} ${remainingMonths === 1 ? "mes" : "meses"}`;
}

export default async function PetPage({ params }: PetPageProps) {
  const pet = mockPets.find((p) => p.id === params.id);
  
  if (!pet) {
    return notFound();
  }

  const shelter = mockShelters.find((s) => s.profile_id === pet.shelter_id);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDFB] pb-32">
      {/* Header flotante */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 pointer-events-none sm:p-6">
        <Link 
          href="/descubrir" 
          className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-orange-950/10 pointer-events-auto hover:bg-white transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-6 h-6 text-orange-950 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="flex gap-2 pointer-events-auto">
          <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-orange-950/10 hover:bg-white transition-all active:scale-95 text-orange-950">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-orange-950/10 hover:bg-white transition-all active:scale-95 text-orange-950">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Galería Interactiva */}
      <PetGallery photos={pet.photos} name={pet.name} />

      {/* Contenido Principal */}
      <div className="px-4 -mt-10 relative z-10 sm:px-6 md:max-w-3xl md:mx-auto md:w-full">
        <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-orange-900/10 border border-orange-50 mb-8">
          
          {/* Info Principal */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1 mr-4">
              <h1 className="text-4xl font-extrabold text-orange-950 mb-2 tracking-tight">{pet.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="orange" className="font-bold py-1 px-3">
                  {pet.sex === "macho" ? "Macho" : "Hembra"}
                </Badge>
                <div className="flex items-center gap-1.5 text-orange-800/60 font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{formatAge(pet.estimated_age_months)}</span>
                </div>
              </div>
            </div>
            <div className="w-14 h-14 bg-orange-100/50 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
              {pet.pet_type === "perro" ? (
                <Dog className="w-7 h-7" />
              ) : (
                <Cat className="w-7 h-7" />
              )}
            </div>
          </div>

          {/* Cards de Atributos */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { label: "Tamaño", value: pet.estimated_size },
              { label: "Raza", value: pet.breed || "Mestizo" },
              { label: "Color", value: pet.color },
            ].map((attr) => (
              <div key={attr.label} className="bg-orange-50/40 rounded-3xl p-4 text-center border border-orange-100/50 group hover:bg-orange-100/30 transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-orange-800/40 block mb-1">{attr.label}</span>
                <span className="font-bold text-orange-950 text-sm capitalize truncate block">{attr.value}</span>
              </div>
            ))}
          </div>

          {/* Biografía */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 bg-orange-400 rounded-full" />
              <h2 className="text-2xl font-black text-orange-950 tracking-tight">Sobre {pet.name}</h2>
            </div>
            <div className="space-y-5">
              <p className="text-lg text-orange-900/80 leading-relaxed font-medium italic bg-orange-50/30 p-5 rounded-3xl border-l-[6px] border-orange-200">
                "{pet.personality}"
              </p>
              <p className="text-orange-900/80 leading-relaxed text-[17px]">
                {pet.story}
              </p>
            </div>
          </section>

          {/* Salud */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-orange-950 mb-6 tracking-tight">Estado de salud</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-5 rounded-[28px] bg-white border border-orange-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-orange-900/40 uppercase font-black tracking-widest">Castrado</p>
                  <p className="text-[16px] font-bold text-orange-950">{pet.is_neutered ? "Sí" : "Pendiente"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-[28px] bg-white border border-orange-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <Syringe className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-orange-900/40 uppercase font-black tracking-widest">Vacunas</p>
                  <p className="text-[16px] font-bold text-orange-950">{pet.vaccines_up_to_date ? "Al día" : "Incompletas"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-[28px] bg-white border border-orange-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-orange-900/40 uppercase font-black tracking-widest">Desparasitado</p>
                  <p className="text-[16px] font-bold text-orange-950">{pet.is_dewormed ? "Sí" : "No"}</p>
                </div>
              </div>
              {pet.special_conditions && (
                <div className="flex items-center gap-4 p-5 rounded-[28px] bg-orange-50/50 border border-orange-100 shadow-sm sm:col-span-2">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-orange-900/40 uppercase font-black tracking-widest">Condiciones especiales</p>
                    <p className="text-[16px] font-bold text-orange-950">{pet.special_conditions}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Compatibilidad */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-orange-950 mb-6 tracking-tight">Compatibilidad</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Niños", value: pet.good_with_children, icon: Baby },
                { label: "Perros", value: pet.good_with_dogs, icon: Dog },
                { label: "Gatos", value: pet.good_with_cats, icon: Cat },
                { label: "Departamentos", value: pet.apt_for_apartment, icon: Building2 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-3xl bg-zinc-50/50 border border-zinc-100 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <item.icon className="w-5 h-5 text-orange-950/40" />
                    </div>
                    <span className="text-sm font-bold text-orange-950/70">{item.label}</span>
                  </div>
                  {item.value ? (
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600 stroke-[3px]" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                      <X className="w-4 h-4 text-red-600 stroke-[3px]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Refugio */}
          <section className="mt-16">
            <h2 className="text-2xl font-black text-orange-950 mb-6 tracking-tight">Este compa está en</h2>
            {shelter ? (
              <Card className="border-none bg-orange-50/50 overflow-hidden rounded-[32px] ring-1 ring-orange-100/50 shadow-xl shadow-orange-900/5">
                <CardContent className="p-8">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-3xl font-black text-orange-600 shadow-xl shadow-orange-900/5 border border-orange-100/50 rotate-3 transition-transform hover:rotate-0">
                      {shelter.shelter_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-orange-950 text-xl leading-tight mb-1">{shelter.shelter_name}</h3>
                      <div className="flex items-center gap-1.5 text-orange-800/50 text-sm font-bold">
                        <MapPin className="w-4 h-4" />
                        <span>Resistencia, Chaco</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-orange-900/70 text-[15px] leading-relaxed mb-6">
                    {shelter.description}
                  </p>
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-orange-200 bg-white text-orange-950 font-bold hover:bg-orange-100/30 hover:border-orange-300 transition-all text-base" asChild>
                    <Link href={`/refugio/${shelter.profile_id}`}>Ver información detallada</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <p className="text-orange-900/40 font-medium">Info del refugio no disponible.</p>
            )}
          </section>

          {/* Mapa Mock */}
          <section className="mt-8">
            <div className="w-full h-56 bg-zinc-100 rounded-[32px] relative overflow-hidden group shadow-inner">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-58.42,-34.61,12,0/1200x600?access_token=mock')] bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-orange-100/10 mix-blend-multiply" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-6 bg-orange-500/20 rounded-full animate-ping duration-[3s]" />
                  <div className="relative w-10 h-10 bg-[#FF6B4A] rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wider text-orange-950 flex items-center gap-2 shadow-xl shadow-orange-900/10">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                Ubicación aproximada del refugio
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Fijo Abajo */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 sm:p-6 sm:pb-8 bg-gradient-to-t from-white via-white/95 to-transparent z-[60] flex justify-center">
        <div className="max-w-2xl w-full">
          <Button asChild className="w-full h-16 rounded-3xl text-xl font-black bg-[#FF6B4A] hover:bg-[#D94428] text-white shadow-2xl shadow-orange-400/40 transition-all active:scale-95 border-b-4 border-orange-800/20">
            <Link href={`/postular/${pet.id}`}>
              Quiero adoptar a {pet.name}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
