"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Camera, 
  ChevronRight, 
  ShieldCheck, 
  Stethoscope, 
  Activity, 
  Info,
  CheckCircle2,
  Trash2,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PublicarMascotaPage() {
  const [step, setStep] = useState(1);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-40">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <Link href="/refugio/mascotas" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
                <ArrowLeft className="h-5 w-5" />
             </Link>
             <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface uppercase">Publicar Mascota</h1>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black tracking-widest text-primary">PASO {step} DE 3</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 space-y-12 max-w-3xl">
        
        {/* Progress Indicator */}
        <div className="flex gap-3 h-1.5 px-10">
           {[1, 2, 3].map((s) => (
             <div key={s} className={cn(
               "flex-1 rounded-full transition-all duration-700",
               step >= s ? "bg-primary shadow-lg shadow-primary/20" : "bg-surface-container-highest"
             )} />
           ))}
        </div>

        {/* Form Steps */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {step === 1 && (
            <div className="space-y-10">
               <div className="space-y-1">
                  <h2 className="font-plus-jakarta text-4xl font-black text-on-surface tracking-tight">Información Básica</h2>
                  <p className="text-on-surface-variant font-medium opacity-60">Cuéntanos quién es este nuevo compa.</p>
               </div>

               <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4">Nombre de la Mascota</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Barnaby" 
                      className="w-full px-8 py-5 bg-white border border-outline-variant/10 rounded-[28px] focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4">Especie</label>
                      <select className="w-full px-8 py-5 bg-white border border-outline-variant/10 rounded-[28px] focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg appearance-none">
                         <option>Perro</option>
                         <option>Gato</option>
                         <option>Otro</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4">Raza</label>
                      <input 
                        type="text" 
                        placeholder="Ej. Beagle" 
                        className="w-full px-8 py-5 bg-white border border-outline-variant/10 rounded-[28px] focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4">Descripción / Biografía</label>
                    <textarea 
                      placeholder="Cuéntanos su historia, personalidad y por qué es especial..." 
                      className="w-full px-8 py-6 bg-white border border-outline-variant/10 rounded-[32px] focus:ring-4 focus:ring-primary/5 outline-none font-medium text-lg min-h-[200px] resize-none"
                    />
                  </div>
               </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
               <div className="space-y-1">
                  <h2 className="font-plus-jakarta text-4xl font-black text-on-surface tracking-tight">Salud y Detalles</h2>
                  <p className="text-on-surface-variant font-medium opacity-60">Datos técnicos importantes para los adoptantes.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Vacunado", icon: <CheckCircle2 className="h-5 w-5" /> },
                    { label: "Desparasitado", icon: <Stethoscope className="h-5 w-5" /> },
                    { label: "Castrado", icon: <ShieldCheck className="h-5 w-5" /> },
                    { label: "Chip de Identificación", icon: <Info className="h-5 w-5" /> }
                  ].map((item) => (
                    <button key={item.label} className="flex items-center justify-between p-8 bg-white rounded-[32px] border border-outline-variant/10 hover:border-primary transition-all group active:scale-95 shadow-sm">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                             {item.icon}
                          </div>
                          <span className="font-bold text-on-surface">{item.label}</span>
                       </div>
                       <div className="w-6 h-6 rounded-full border-2 border-outline-variant group-focus:bg-primary group-focus:border-primary transition-all" />
                    </button>
                  ))}
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4">Necesidades Especiales</label>
                  <textarea 
                    placeholder="Ejem: Dieta especial, alergias, medicación diaria..." 
                    className="w-full px-8 py-6 bg-white border border-outline-variant/10 rounded-[32px] focus:ring-4 focus:ring-primary/5 outline-none font-medium text-lg min-h-[120px] resize-none"
                  />
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 text-center">
               <div className="space-y-1">
                  <h2 className="font-plus-jakarta text-4xl font-black text-on-surface tracking-tight">Fotos del Compa</h2>
                  <p className="text-on-surface-variant font-medium opacity-60">Las fotos son lo más importante para conectar.</p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <button className="aspect-square bg-surface-container-low/40 rounded-[40px] border-4 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-4 hover:bg-white hover:border-primary/20 transition-all group">
                     <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                        <Camera className="h-8 w-8" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Añadir Foto</span>
                  </button>
                  {[
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2574&auto=format&fit=crop"
                  ].map((url, idx) => (
                    <div key={idx} className="aspect-square rounded-[40px] overflow-hidden relative group">
                       <Image src={url} alt="Pet" fill className="object-cover" />
                       <button className="absolute top-4 right-4 w-10 h-10 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-95">
                          <Trash2 className="h-5 w-5" />
                       </button>
                    </div>
                  ))}
               </div>

               <div className="bg-primary/5 p-10 rounded-[48px] border border-primary/10 flex items-center gap-6 text-left">
                  <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <p className="text-on-surface-variant font-medium text-sm leading-relaxed">
                    Asegúrate de que las fotos tengan buena iluminación. Los retratos de cerca ayudan a los adoptantes a enamorarse a primera vista.
                  </p>
               </div>
            </div>
          )}
        </section>

      </main>

      {/* Sticky Navigation Footer */}
      <div className="fixed bottom-0 left-0 w-full p-8 z-50 flex justify-center">
         <div className="w-full max-w-xl bg-white/90 backdrop-blur-3xl rounded-[40px] p-4 shadow-2xl shadow-primary/20 border border-white flex items-center gap-4 animate-in slide-in-from-bottom-12 duration-1000">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="w-16 h-16 rounded-[32px] bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant active:scale-95 transition-all"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            )}
            <button 
              onClick={() => step < 3 ? setStep(step + 1) : null}
              className="flex-1 bg-on-surface text-background py-5 rounded-[32px] flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-all group"
            >
              {step === 3 ? "Publicar Ahora" : "Siguiente Paso"}
              {step < 3 && <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />}
            </button>
         </div>
      </div>
    </div>
  );
}
