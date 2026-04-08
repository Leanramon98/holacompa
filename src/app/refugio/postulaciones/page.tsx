"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  MessageSquare, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Calendar,
  Filter,
  Users,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const applications = [
  { 
    id: 1, 
    applicant: "Julieta Marcone", 
    pet: "Barnaby", 
    date: "7 de Abr, 2024", 
    status: "Nueva", 
    score: 95,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
    petThumb: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2588&auto=format&fit=crop"
  },
  { 
    id: 2, 
    applicant: "Marcos Ruiz", 
    pet: "Mochi", 
    date: "6 de Abr, 2024", 
    status: "Entrevista", 
    score: 82,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
    petThumb: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2686&auto=format&fit=crop"
  },
  { 
    id: 3, 
    applicant: "Lorena Paz", 
    pet: "Luna", 
    date: "5 de Abr, 2024", 
    status: "Rechazada", 
    score: 45,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2570&auto=format&fit=crop",
    petThumb: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2424&auto=format&fit=crop"
  },
  { 
    id: 4, 
    applicant: "Gastón Olivera", 
    pet: "Ghost", 
    date: "4 de Abr, 2024", 
    status: "Aceptada", 
    score: 100,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2570&auto=format&fit=crop",
    petThumb: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop"
  },
];

export default function ShelterApplicationsPage() {
  const [filter, setFilter] = useState("todos");

  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <Link href="/refugio/dashboard" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
                <ArrowLeft className="h-5 w-5" />
             </Link>
             <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface uppercase">Postulaciones</h1>
          </div>
          <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all relative">
             <Bell className="h-5 w-5 text-on-surface-variant" />
             <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 space-y-12 max-w-5xl">
        
        {/* Stats Summary */}
        <section className="bg-white p-10 rounded-[60px] border border-outline-variant/10 shadow-sm flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-outline-variant/10">
           <div className="flex-1 pb-6 md:pb-0 md:pr-10 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Total este mes</span>
              <p className="text-5xl font-black text-on-surface tracking-tighter">482</p>
           </div>
           <div className="flex-1 py-6 md:py-0 md:px-10 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Nuevas Hoy</span>
              <p className="text-5xl font-black text-primary tracking-tighter">12</p>
           </div>
           <div className="flex-1 pt-6 md:pt-0 md:pl-10 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Aceptadas</span>
              <p className="text-5xl font-black text-secondary tracking-tighter">15</p>
           </div>
        </section>

        {/* Filter Chips */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
           {["todos", "nuevas", "en revisión", "entrevista", "finalizadas"].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f)}
               className={cn(
                 "px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                 filter === f 
                   ? "bg-on-surface text-background shadow-xl" 
                   : "bg-surface-container-high/40 text-on-surface-variant/60 hover:bg-white border border-transparent hover:border-outline-variant/10"
               )}
             >
               {f}
             </button>
           ))}
        </div>

        {/* Applications List */}
        <section className="space-y-6">
           {applications.map((app) => (
             <div key={app.id} className="bg-white p-8 rounded-[48px] border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 group flex flex-col lg:flex-row lg:items-center gap-10">
                
                {/* Applicant Profile */}
                <div className="flex items-center gap-6 lg:w-1/3">
                   <div className="w-20 h-20 rounded-[24px] overflow-hidden shadow-sm relative shrink-0">
                      <Image src={app.avatar} alt={app.applicant} fill className="object-cover" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-plus-jakarta font-black text-2xl tracking-tight text-on-surface">{app.applicant}</h4>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                          app.status === "Nueva" ? "bg-primary-container text-on-primary-container" : 
                          app.status === "Aceptada" ? "bg-secondary-container text-on-secondary-container" :
                          app.status === "Rechazada" ? "bg-error/10 text-error" :
                          "bg-surface-container-high text-on-surface-variant/60"
                        )}>
                          {app.status}
                        </span>
                      </div>
                   </div>
                </div>

                {/* Pet Context */}
                <div className="flex items-center gap-6 flex-1 bg-surface-container-low/30 p-6 rounded-[32px] border border-black/[0.02]">
                   <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm relative shrink-0">
                      <Image src={app.petThumb} alt={app.pet} fill className="object-cover" />
                   </div>
                   <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Postulante por</span>
                      <p className="font-bold text-on-surface">{app.pet}</p>
                   </div>
                   <div className="ml-auto flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Compa Score</span>
                        <div className="flex items-center gap-2">
                           <div className="h-1.5 w-16 bg-surface-container-highest rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${app.score}%` }} />
                           </div>
                           <span className="text-xs font-black text-on-surface">{app.score}%</span>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 lg:w-40 justify-end">
                   <button className="w-14 h-14 rounded-full bg-surface-container-high/40 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                      <MessageSquare className="h-5 w-5" />
                   </button>
                   <Link href={`/refugio/postulaciones/${app.id}`} className="flex-1 lg:flex-none px-6 py-4 bg-on-surface text-background rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all">
                      Detalles
                      <ChevronRight className="h-4 w-4" />
                   </Link>
                </div>

             </div>
           ))}
        </section>

      </main>
    </div>
  );
}
