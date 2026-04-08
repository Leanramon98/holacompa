"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  BarChart3, 
  Users, 
  Heart, 
  PlusCircle, 
  Bell, 
  Search, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Mascotas Albergadas", value: "42", icon: <Heart className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
  { label: "Postulaciones Pendientes", value: "18", icon: <Clock className="h-5 w-5" />, color: "bg-secondary-container/50 text-on-secondary-container" },
  { label: "Adoptados este mes", value: "12", icon: <TrendingUp className="h-5 w-5" />, color: "bg-tertiary-container/50 text-on-tertiary-container" },
  { label: "Donaciones (ARS)", value: "245k", icon: <BarChart3 className="h-5 w-5" />, color: "bg-surface-container-highest/50 text-on-surface" },
];

const pendingApplications = [
  { id: 1, applicant: "Julieta Marcone", pet: "Barnaby", date: "Hace 2 horas", status: "Nueva", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop" },
  { id: 2, applicant: "Marcos Ruiz", pet: "Mochi", date: "Hoy, 10:30", status: "Nueva", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop" },
  { id: 3, applicant: "Lorena Paz", pet: "Luna", date: "Ayer", status: "En Revisión", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2570&auto=format&fit=crop" },
];

export default function ShelterDashboardPage() {
  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Layers className="text-white h-5 w-5" />
            </div>
            <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface uppercase">Dashboard Refugio</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all relative">
              <Bell className="h-5 w-5 text-on-surface-variant" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-error rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10">
              <Image 
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2680&auto=format&fit=crop" 
                alt="Shelter Admin" 
                width={40} 
                height={40} 
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 space-y-12 max-w-6xl">
        
        {/* Intro Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
           <div className="space-y-1">
              <h2 className="font-plus-jakarta text-5xl font-black tracking-tighter text-on-surface">¡Hola, Santuario!</h2>
              <p className="text-on-surface-variant font-medium opacity-60">Esto es lo que está pasando hoy en el refugio.</p>
           </div>
           <Link href="/refugio/mascotas/publicar" className="px-8 py-4 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              <PlusCircle className="h-4 w-4" />
              Nueva Publicación
           </Link>
        </section>

        {/* Stats Grid Bento Style */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat) => (
             <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-outline-variant/10 shadow-sm space-y-4 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3", stat.color)}>
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black text-on-surface tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{stat.label}</p>
                </div>
             </div>
           ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Pending Applications Column */}
           <section className="lg:col-span-8 space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="font-plus-jakarta text-3xl font-black text-on-surface tracking-tight">Postulaciones Recientes</h3>
                <Link href="/refugio/postulaciones" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-8">Ver Todas</Link>
              </div>

              <div className="space-y-4">
                 {pendingApplications.map((app) => (
                   <div key={app.id} className="bg-white p-6 rounded-[32px] border border-outline-variant/10 shadow-sm flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                         <Image src={app.image} alt={app.applicant} width={64} height={64} className="object-cover h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                           <h4 className="font-bold text-on-surface text-lg tracking-tight truncate">{app.applicant}</h4>
                           <span className={cn(
                             "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                             app.status === "Nueva" ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant"
                           )}>
                             {app.status}
                           </span>
                        </div>
                        <p className="text-on-surface-variant/60 font-medium text-sm">Postulante para {app.pet} • {app.date}</p>
                      </div>
                      <button className="w-12 h-12 bg-surface-container-high/40 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                         <ChevronRight className="h-5 w-5" />
                      </button>
                   </div>
                 ))}
              </div>
           </section>

           {/* Quick Actions / Activity Feed */}
           <section className="lg:col-span-4 space-y-8">
              <h3 className="font-plus-jakarta text-2xl font-black text-on-surface tracking-tight">Accesos Rápidos</h3>
              <div className="grid grid-cols-1 gap-4">
                 {[
                   { label: "Gestionar Mascotas", icon: <Heart className="h-5 w-5" />, href: "/refugio/mascotas" },
                   { label: "Ver Donaciones", icon: <TrendingUp className="h-5 w-5" />, href: "/refugio/donaciones" },
                   { label: "Configurar Perfil", icon: <Settings className="h-5 w-5" />, href: "/refugio/perfil" },
                 ].map((action) => (
                   <Link 
                     key={action.label} 
                     href={action.href}
                     className="bg-surface-container-low/40 p-6 rounded-[32px] border border-transparent hover:border-primary/20 hover:bg-white transition-all flex items-center justify-between group"
                   >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[14px] bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          {action.icon}
                        </div>
                        <span className="font-bold text-on-surface-variant">{action.label}</span>
                     </div>
                     <ChevronRight className="h-5 w-5 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary" />
                   </Link>
                 ))}
              </div>

              {/* Weekly Insight Card */}
              <div className="bg-primary p-10 rounded-[48px] text-white space-y-6 shadow-2xl shadow-primary/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                 <CheckCircle2 className="h-10 w-10 opacity-40" />
                 <div className="space-y-2">
                    <h4 className="font-plus-jakarta text-2xl font-black leading-tight tracking-tight">¡Gran impacto!</h4>
                    <p className="text-sm font-medium opacity-80 leading-relaxed">Esta semana lograste un 20% más de visitas en los perfiles de tus mascotas.</p>
                 </div>
                 <button className="w-full bg-white text-primary py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                    Ver reporte semanal
                 </button>
              </div>
           </section>

        </div>

      </main>
    </div>
  );
}
