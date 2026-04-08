"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  Home, 
  Briefcase, 
  Heart,
  MoreVertical,
  Calendar,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ApplicationDetailClient({ id }: { id: string }) {
  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-40">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <Link href="/refugio/postulaciones" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
                <ArrowLeft className="h-5 w-5" />
             </Link>
             <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface uppercase">Detalle Postulación</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
            <MoreVertical className="h-5 w-5 text-on-surface-variant" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Left Column: Applicant Profile Summary */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-10 rounded-[60px] border border-outline-variant/10 shadow-sm text-center space-y-6">
                 <div className="mx-auto w-40 h-40 rounded-[48px] overflow-hidden shadow-2xl relative">
                    <Image 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop" 
                      alt="Julieta Marcone" 
                      fill 
                      className="object-cover" 
                    />
                 </div>
                 <div className="space-y-1">
                    <h2 className="font-plus-jakarta text-3xl font-black text-on-surface tracking-tight">Julieta Marcone</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Postulante Top Match (95%)</p>
                 </div>
                 <div className="flex justify-center gap-3">
                    <span className="px-5 py-2 bg-secondary-container rounded-full text-[9px] font-black uppercase tracking-widest text-on-secondary-container">Nueva</span>
                    <span className="px-5 py-2 bg-surface-container-high rounded-full text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 italic">2h atrás</span>
                 </div>
              </div>

              {/* Contact Info Bento */}
              <div className="bg-surface-container-low/40 p-8 rounded-[48px] border border-black/[0.02] space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-2">Datos de Contacto</h3>
                 <div className="space-y-4">
                    {[
                      { icon: <Phone className="h-4 w-4" />, text: "+54 11 4839 2039" },
                      { icon: <Mail className="h-4 w-4" />, text: "julieta@example.com" },
                      { icon: <MapPin className="h-4 w-4" />, text: "Palermo, CABA" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-black/[0.01]">
                         <div className="text-primary/40">{item.icon}</div>
                         <span className="font-bold text-on-surface-variant text-sm">{item.text}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Column: Detailed Questions & Context */}
           <div className="lg:col-span-8 space-y-10">
              
              {/* Target Pet Context Banner */}
              <div className="bg-on-surface p-10 rounded-[56px] text-background flex items-center justify-between group overflow-hidden relative shadow-2xl shadow-on-surface/10">
                 <div className="space-y-2 relative z-10">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Mascota Seleccionada</p>
                    <h3 className="font-plus-jakarta text-4xl font-black tracking-tight flex items-center gap-4">
                       Barnaby
                       <Heart className="h-6 w-6 fill-primary text-primary" />
                    </h3>
                 </div>
                 <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl rotate-3 relative z-10 shrink-0">
                    <Image src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2588&auto=format&fit=crop" alt="Barnaby" fill className="object-cover" />
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl" />
              </div>

              {/* Questionnaire Section */}
              <section className="space-y-8">
                 <h3 className="font-plus-jakarta text-3xl font-black text-on-surface tracking-tight">Cuestionario de Adopción</h3>
                 
                 <div className="grid grid-cols-1 gap-6">
                    {[
                      { 
                        q: "¿Por qué quieres adoptar a Barnaby?", 
                        a: "Busco un compañero para mis caminatas diarias. Barnaby tiene la energía perfecta y vivo cerca de una plaza donde puede correr libremente.",
                        icon: <Heart className="h-6 w-6" />
                      },
                      { 
                        q: "¿Cómo es el ambiente en tu hogar?", 
                        a: "Vivo sola en un departamento amplio de 3 ambientes con balcón aterrazado con red de seguridad. Trabajo remoto 4 veces por semana.",
                        icon: <Home className="h-6 w-6" />
                      },
                      { 
                        q: "¿Tienes otras mascotas actualmente?", 
                        a: "No, actualmente no tengo otras mascotas, lo que me permite darle toda mi atención a Barnaby en su etapa de adaptación.",
                        icon: <User className="h-6 w-6" />
                      },
                      { 
                        q: "Situación Laboral / Estabilidad", 
                        a: "Diseñadora Senior UX en empresa de tecnología con contrato permanente y flexibilidad horaria.",
                        icon: <Briefcase className="h-6 w-6" />
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-10 rounded-[48px] border border-outline-variant/10 shadow-sm space-y-4 hover:shadow-xl transition-all group">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                               {item.icon}
                            </div>
                            <h4 className="font-bold text-on-surface text-lg">{item.q}</h4>
                         </div>
                         <p className="text-on-surface-variant font-medium leading-relaxed opacity-60 ml-16">
                            "{item.a}"
                         </p>
                      </div>
                    ))}
                 </div>
              </section>

              {/* History / Internal Notes */}
              <section className="bg-secondary-container/10 p-10 rounded-[56px] border border-secondary/10 space-y-6">
                 <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-on-secondary-container" />
                    <h3 className="font-plus-jakarta text-2xl font-black text-on-secondary-container tracking-tight">Seguimiento Interno</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="bg-white/60 p-6 rounded-[32px] border border-white space-y-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Hoy, 14:30 • Sistema</p>
                       <p className="font-medium text-on-surface-variant">Postulación creada con puntuación técnica de 95/100.</p>
                    </div>
                 </div>
              </section>

           </div>
        </div>

      </main>

      {/* Floating Decisions Footer */}
      <div className="fixed bottom-0 left-0 w-full p-8 z-50 flex justify-center">
         <div className="w-full max-w-2xl bg-white/90 backdrop-blur-3xl rounded-[40px] p-4 shadow-2xl shadow-primary/20 border border-white flex items-center gap-4">
            <button className="w-16 h-16 rounded-[32px] bg-error/10 flex items-center justify-center text-error hover:bg-error hover:text-white transition-all active:scale-95 shadow-sm">
               <XCircle className="h-6 w-6" />
            </button>
            <button className="flex-1 bg-surface-container-high/40 text-primary py-5 rounded-[32px] flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[9px] active:scale-95 transition-all">
               <MessageSquare className="h-5 w-5" />
               Mensaje
            </button>
            <button className="flex-2 px-10 bg-on-surface text-background py-5 rounded-[32px] flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-all group">
               Aceptar Adopción
               <CheckCircle2 className="h-5 w-5 text-secondary group-hover:scale-125 transition-transform" />
            </button>
         </div>
      </div>
    </div>
  );
}
