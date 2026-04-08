"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Heart, 
  Star, 
  ArrowRight,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Quote,
  AlertCircle
} from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Pet, Shelter } from "@/types";
import { usePlatformStore } from "@/lib/store/usePlatformStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";
import { useMemo } from "react";

export default function RefugioProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { shelters, pets } = usePlatformStore();

  const shelter = useMemo(() => {
    return shelters.find(s => 
      s.shelter_name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "") === slug
    );
  }, [shelters, slug]);

  if (!shelter) return null; // HydrationZustand will handle the wait

  const shelterPets = pets.filter((p: Pet) => p.shelter_id === shelter.profile_id);
  const isVerified = shelter.verification_status === 'approved';

  return (
    <HydrationZustand>
      <div className="min-h-screen bg-background font-be-vietnam pb-24">
        {/* Hero Shelter Section */}
        <section className="relative group">
          <div className="h-[300px] md:h-[500px] w-full relative overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop" 
              alt={shelter.shelter_name}
              fill
              className="object-cover animate-in zoom-in-105 duration-[1s] transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          <div className="container mx-auto px-6 relative z-10 -mt-24 md:-mt-32">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              {/* Logo */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-[40px] border-[12px] border-background bg-surface-container-lowest shadow-2xl overflow-hidden relative group/logo">
                <Image 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2680&auto=format&fit=crop" 
                  alt="Logo"
                  fill
                  className="object-cover group-hover/logo:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="mb-4 flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-6xl font-plus-jakarta font-black text-on-surface tracking-tighter leading-none">
                    {shelter.shelter_name}
                  </h1>
                  {isVerified ? (
                    <CheckCircle2 className="text-primary h-8 w-8 fill-primary/10" />
                  ) : (
                    <AlertCircle className="text-on-surface-variant/20 h-8 w-8" title="Pendiente de verificación" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-bold uppercase tracking-widest text-xs opacity-60">
                  <MapPin className="h-4 w-4" />
                  <span>{shelter.city || "Ciudad de México"}, ARG</span>
                  {!isVerified && (
                    <span className="ml-4 bg-surface-container-highest px-3 py-1 rounded-full text-[8px] text-on-surface-variant">
                      VERIFICACIÓN EN PROCESO
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Desktop */}
              <div className="hidden md:flex gap-4 mb-4">
                <button className="bg-surface-container-highest/50 backdrop-blur-xl text-primary px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary/10 transition-all border border-primary/10 active:scale-95">
                  <MessageSquare className="h-4 w-4" />
                  Mensaje
                </button>
                <button className="bg-gradient-to-br from-primary to-primary-fixed-dim text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 flex items-center gap-2 hover:scale-[1.02] transition-all active:scale-95">
                  <Heart className="h-4 w-4 fill-white" />
                  Donar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-low p-10 rounded-[40px] text-center border border-outline-variant/10 shadow-sm group hover:bg-white transition-colors duration-500">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              <div className="text-4xl font-plus-jakarta font-black text-primary mb-1 tracking-tighter">500+</div>
              <div className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Adopciones</div>
            </div>
            <div className="bg-surface-container-low p-10 rounded-[40px] text-center border border-outline-variant/10 shadow-sm group hover:bg-white transition-colors duration-500">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Star className="h-8 w-8 text-primary fill-primary group-hover:scale-110 transition-all" />
              </div>
              <div className="text-4xl font-plus-jakarta font-black text-primary mb-1 tracking-tighter">4.9</div>
              <div className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Rating</div>
            </div>
            <div className="bg-surface-container-low p-10 rounded-[40px] text-center border border-outline-variant/10 shadow-sm group hover:bg-white transition-colors duration-500">
              <ShieldCheck className={cn("h-8 w-8 mx-auto mb-4 transition-all", isVerified ? "text-primary opacity-100 scale-110" : "text-on-surface-variant opacity-20")} />
              <div className="text-4xl font-plus-jakarta font-black text-primary mb-1 tracking-tighter">{isVerified ? "100%" : "0%"}</div>
              <div className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Verificado</div>
            </div>
            <div className="bg-primary/5 p-10 rounded-[40px] text-center border-2 border-dashed border-primary/20 flex flex-col justify-center items-center group hover:bg-primary/10 transition-all">
              <Heart className="h-8 w-8 text-primary mb-4 animate-pulse" />
              <div className="text-xs font-black text-primary uppercase tracking-widest leading-tight">Apoyar al <br/> refugio</div>
            </div>
          </div>
        </section>

        {/* About & Featured Story */}
        <section className="container mx-auto px-6 mt-24">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-8">
              <h3 className="text-4xl font-plus-jakarta font-black text-on-surface tracking-tighter">Nuestra Misión</h3>
              <div className="prose prose-stone prose-xl max-w-none">
                <p className="font-medium text-on-surface-variant leading-relaxed opacity-80">
                  {shelter.description || "En Happy Paws Shelter, creemos que cada cola que se menea y cada ronroneo suave merece un hogar para siempre."}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-primary-container/30 p-12 rounded-[48px] relative overflow-hidden group shadow-sm border border-primary/5">
                <Quote className="absolute -top-6 -right-6 text-9xl text-primary/5 rotate-12 group-hover:scale-110 transition-transform duration-1000" />
                <h4 className="font-plus-jakarta font-black text-2xl text-primary mb-6 tracking-tight">Historias de Éxito</h4>
                <p className="italic text-primary font-medium text-lg leading-relaxed mb-8 relative z-10">
                  "Adoptar a Luna de Happy Paws fue la mejor decisión de mi vida. ¡Realmente se preocupan por los animales!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/10 flex items-center justify-center font-black text-primary">
                    MG
                  </div>
                  <div>
                    <span className="font-black text-xs uppercase tracking-widest text-primary">— Maria G.</span>
                    <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest mt-0.5">Adoptante de Luna</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Residents Bento Grid */}
        <section className="container mx-auto px-6 mt-32">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
            <div>
              <h3 className="text-5xl font-plus-jakarta font-black text-on-surface tracking-tighter">Nuestros Residentes</h3>
              <p className="text-on-surface-variant font-medium text-lg opacity-60 mt-1">Buscando su hogar definitivo</p>
            </div>
            <Link href="/explorar" className="group flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all pr-4">
              Ver todos los {shelterPets.length} compañeros
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {shelterPets.slice(0, 4).map((pet: Pet, idx: number) => (
              <div 
                key={pet.id} 
                className={cn(
                  "group relative rounded-[40px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700",
                  idx === 0 ? "md:col-span-8 h-[500px]" : "md:col-span-4 h-[500px]"
                )}
              >
                <Image 
                  src={pet.photos[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2574&auto=format&fit=crop"} 
                  alt={pet.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-10 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-5 py-1.5 bg-white/20 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                      {pet.estimated_size}
                    </span>
                  </div>
                  <h4 className="text-4xl font-plus-jakarta font-black tracking-tighter mb-2">{pet.name}</h4>
                  <div className="flex items-center gap-4 opacity-60 font-black text-[10px] uppercase tracking-widest">
                    <span>{pet.pet_type}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>{Math.floor(pet.estimated_age_months / 12)} años</span>
                  </div>
                  <Link href={`/mascota/${pet.id}`} className="mt-8 inline-flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] bg-white text-black px-8 py-4 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-100">
                    Conocer a {pet.name}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </HydrationZustand>
  );
}
