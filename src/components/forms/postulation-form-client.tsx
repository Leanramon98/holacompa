"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  History, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown,
  Info,
  Heart
} from "lucide-react";
import { getPetById } from "@/lib/data/pets";
import { getShelterById } from "@/lib/data/shelters";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { Pet, Shelter } from "@/types";

import { usePlatformStore } from "@/lib/store/usePlatformStore";
import { useRouter } from "next/navigation";

export function PostulationFormClient({ id }: { id: string }) {
  const router = useRouter();
  const { addApplication } = usePlatformStore();
  const [pet, setPet] = useState<Pet | null>(null);
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const p = await getPetById(id);
      if (p) {
        setPet(p);
        const s = await getShelterById(p.shelter_id);
        if (s) setShelter(s);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pet || !shelter) return;

    addApplication({
      id: `APP-${Math.floor(Math.random() * 10000)}`,
      pet_id: pet.id,
      adopter_id: "USER-123", // Mock current user
      shelter_id: shelter.profile_id,
      status: "pendiente",
      reason_to_adopt: reason,
      daily_hours_alone: 4,
      can_afford_vet: true,
      vet_explanation: "Tengo ahorros",
      commitment_signed: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    alert("¡Postulación enviada con éxito! Ahora el administrador podrá verla en su panel.");
    router.push("/mis-adopciones");
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="font-plus-jakarta font-black uppercase tracking-widest text-[10px] text-primary">Preparando tu postulación...</p>
    </div>
  );
  
  if (!pet) return notFound();

  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-40">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href={`/mascota/${pet.id}`} className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-highest transition-all active:scale-90">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-plus-jakarta font-black text-xl tracking-tighter text-on-surface">Postular para Adopción</h1>
          <div className="w-12" /> {/* Spacer */}
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 max-w-2xl">
        
        {/* Context Card */}
        <section className="relative overflow-hidden bg-surface-container-low rounded-[40px] p-8 flex items-center gap-8 mb-12 border border-outline-variant/10 shadow-sm group">
          <div className="relative w-28 h-28 shrink-0">
            <div className="absolute inset-0 bg-primary-container rounded-[32px] rotate-6 group-hover:rotate-12 transition-transform duration-700" />
            <Image 
              src={pet.photos[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2574&auto=format&fit=crop"} 
              alt={pet.name}
              fill
              className="relative z-10 object-cover rounded-[32px] shadow-xl"
            />
          </div>
          <div className="space-y-1">
            <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] block mb-1">
              Tu futuro compañero
            </span>
            <h2 className="font-plus-jakarta font-black text-5xl text-on-surface tracking-tighter leading-none">
              {pet.name}
            </h2>
            <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs opacity-60">
              <MapPin className="h-4 w-4" />
              <span>{shelter?.shelter_name || "Refugio Local"}</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000">
             <Heart className="w-48 h-48 fill-primary" />
          </div>
        </section>

        {/* Step Indicator */}
        <section className="flex items-center justify-between mb-12 px-2">
          <div className="flex gap-3 items-center">
            <div className={cn("h-2 rounded-full transition-all duration-500", step >= 1 ? "w-16 bg-primary shadow-lg shadow-primary/20" : "w-8 bg-surface-container-highest")} />
            <div className={cn("h-2 rounded-full transition-all duration-500", step >= 2 ? "w-16 bg-primary shadow-lg shadow-primary/20" : "w-8 bg-surface-container-highest")} />
            <div className={cn("h-2 rounded-full transition-all duration-500", step >= 3 ? "w-16 bg-primary shadow-lg shadow-primary/20" : "w-8 bg-surface-container-highest")} />
          </div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Paso {step} de 3</span>
        </section>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Section 1: Información Personal */}
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-container rounded-[20px] flex items-center justify-center text-on-primary-container shadow-lg shadow-primary/5">
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-plus-jakarta font-black text-3xl tracking-tight">Información Personal</h3>
            </div>
            
            <div className="grid gap-8">
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest ml-4 text-on-surface-variant opacity-60">Nombre Completo</label>
                <input 
                  required
                  className="w-full bg-surface-container-lowest border-none rounded-[24px] px-8 py-5 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-outline/30 text-lg font-medium shadow-sm" 
                  placeholder="Ej: Roberto García" 
                  type="text"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase tracking-widest ml-4 text-on-surface-variant opacity-60">Teléfono</label>
                  <input 
                    required
                    className="w-full bg-surface-container-lowest border-none rounded-[24px] px-8 py-5 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-outline/30 text-lg font-medium shadow-sm" 
                    placeholder="+54 9 11 0000 0000" 
                    type="tel"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase tracking-widest ml-4 text-on-surface-variant opacity-60">Tipo de Vivienda</label>
                  <div className="relative group">
                    <select className="w-full bg-surface-container-lowest border-none rounded-[24px] px-8 py-5 focus:ring-4 focus:ring-primary/10 outline-none appearance-none transition-all text-lg font-medium shadow-sm cursor-pointer">
                      <option>Casa con jardín</option>
                      <option>Departamento / Flat</option>
                      <option>Casa sin jardín</option>
                      <option>Rancho o granja</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-outline/50 group-hover:text-primary transition-colors pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Experiencia */}
          <section className="space-y-8 p-10 bg-surface-container-low rounded-[48px] border border-outline-variant/10 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-container rounded-[20px] flex items-center justify-center text-on-secondary-container shadow-lg shadow-secondary/5">
                <History className="h-6 w-6" />
              </div>
              <h3 className="font-plus-jakarta font-black text-3xl tracking-tight">Tu Experiencia</h3>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-widest ml-1 text-on-surface-variant opacity-60">¿Has tenido mascotas antes?</label>
                <div className="flex flex-wrap gap-3">
                  {["Sí, actualmente", "Sí, en el pasado", "Nunca"].map((opt) => (
                    <button 
                      key={opt}
                      type="button"
                      className={cn(
                        "px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transition-all border-2 active:scale-95",
                        opt === "Sí, actualmente" 
                          ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20" 
                          : "bg-surface-container-highest/20 text-on-surface-variant border-transparent hover:border-secondary/20 hover:bg-white"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest ml-1 text-on-surface-variant opacity-60">¿Por qué deseas adoptar a {pet.name}?</label>
                <textarea 
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white border-none rounded-[32px] px-8 py-6 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-outline/30 text-lg font-medium shadow-sm resize-none" 
                  placeholder={`Contanos por qué ${pet.name} es el indicado para tu vida...`} 
                  rows={4}
                />
              </div>
            </div>
          </section>

          {/* Section 3: Compromiso */}
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500 pb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary-container rounded-[20px] flex items-center justify-center text-on-tertiary-container shadow-lg shadow-tertiary/5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-plus-jakarta font-black text-3xl tracking-tight">Compromiso Compa</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "Acepto visitas domiciliarias", desc: `Entiendo que un voluntario de ${shelter?.shelter_name || "el refugio"} puede visitar mi hogar para asegurar un entorno seguro.` },
                { title: "Compromiso de salud", desc: `Me comprometo a mantener al día sus vacunas y controles veterinarios de por vida.` }
              ].map((item, idx) => (
                <label key={idx} className="group flex items-start gap-6 p-8 rounded-[32px] bg-white border border-outline-variant/10 hover:border-primary/20 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/5">
                  <div className="relative flex items-center mt-1">
                    <div className="w-8 h-8 rounded-xl bg-surface-container-highest border-2 border-primary/20 flex items-center justify-center">
                       <input 
                        required
                        className="w-4 h-4 rounded-md border-none text-primary focus:ring-0 cursor-pointer" 
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-plus-jakarta font-black text-on-surface group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-sm font-medium text-on-surface-variant opacity-60 leading-relaxed">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Submission CTA Fixed */}
          <div className="fixed bottom-0 left-0 w-full z-50 bg-background/80 backdrop-blur-3xl border-t border-outline-variant/10 p-8 flex justify-center items-center rounded-t-[60px] shadow-[0_-20px_40px_rgba(32,27,15,0.08)]">
            <button 
              type="submit"
              className="group flex items-center justify-center w-full max-w-lg py-5 bg-gradient-to-br from-primary to-primary-fixed-dim text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 duration-200"
            >
              <CheckCircle2 className="mr-3 h-5 w-5 fill-white/20 group-hover:scale-110 transition-transform" />
              Enviar Postulación Destacada
            </button>
          </div>
        </form>

        {/* Warning Toastish */}
        <div className="mt-8 p-6 bg-primary/5 rounded-[32px] border border-primary/10 flex gap-4 items-center">
          <div className="h-6 w-6 text-primary shrink-0 relative">
             <Info className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold text-primary leading-tight opacity-80 uppercase tracking-widest">
            Tu postulación será revisada por el refugio. Recibirás una respuesta en el chat en un plazo de 48-72hs.
          </p>
        </div>
      </main>
    </div>
  );
}
