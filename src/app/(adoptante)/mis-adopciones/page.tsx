"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Search, 
  Bell, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Stethoscope, 
  Utensils, 
  Calendar,
  ArrowRight,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MisAdopcionesPage() {
  const [activeTab, setActiveTab] = useState("postulaciones");

  const tabs = [
    { id: "postulaciones", label: "Postulaciones" },
    { id: "favoritos", label: "Favoritos" },
    { id: "manada", label: "Mi Manada" },
  ];

  const applications = [
    {
      id: 1,
      petName: "Barnaby",
      breed: "Beagle",
      age: "4 Meses",
      status: "En Revisión",
      progress: 65,
      steps: ["Enviado", "Visita", "Entrevista"],
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2588&auto=format&fit=crop"
    },
    {
      id: 2,
      petName: "Mochi",
      breed: "Persa Mix",
      age: "2 Años",
      status: "Entrevista",
      progress: 85,
      steps: ["Enviado", "Visita", "Contrato"],
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2686&auto=format&fit=crop"
    }
  ];

  const favorites = [
    { id: 1, name: "Luna", age: "Senior", breed: "Golden Retriever", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2424&auto=format&fit=crop", featured: true },
    { id: 2, name: "Socks", age: "Joven", breed: "Gato Tuxedo", image: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=80&w=2520&auto=format&fit=crop", featured: false },
    { id: 3, name: "Ghost", age: "Cachorro", breed: "Samoyedo", image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop", featured: false },
  ];

  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Heart className="text-white h-5 w-5 fill-white" />
            </div>
            <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface">Mi Camino</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all relative">
              <Bell className="h-5 w-5 text-on-surface-variant" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-error rounded-full border-2 border-background" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10">
              <Image 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop"
                alt="Profile"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 space-y-12 max-w-5xl">
        
        {/* Hero */}
        <section className="space-y-2">
          <h2 className="font-plus-jakarta text-5xl font-black tracking-tighter text-on-surface">Mi Historia</h2>
          <p className="text-on-surface-variant font-medium text-lg opacity-60">Seguí tu camino para convertirte en el mejor compa.</p>
        </section>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-4 border-b border-outline-variant/10 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-8 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all relative",
                activeTab === tab.id 
                  ? "text-primary" 
                  : "text-on-surface-variant opacity-40 hover:opacity-100"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full scale-x-100 transition-transform" />
              )}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="space-y-12">
          {activeTab === "postulaciones" && (
            <section className="space-y-8 animate-in fade-in duration-700">
              <div className="flex justify-between items-end">
                <h3 className="font-plus-jakarta text-3xl font-black tracking-tight">Postulaciones Activas</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                  {applications.length} EN TOTAL
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {applications.map((app) => (
                  <div key={app.id} className="bg-white rounded-[40px] p-8 border border-outline-variant/10 shadow-xl shadow-black/5 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg shadow-black/5">
                        <Image src={app.image} alt={app.petName} width={96} height={96} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-plus-jakarta font-black text-2xl tracking-tight">{app.petName}</h4>
                          <span className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                            app.status === "En Revisión" ? "bg-secondary-container text-on-secondary-container" : "bg-primary-container text-on-primary-container"
                          )}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-on-surface-variant font-medium opacity-60 uppercase text-xs tracking-widest">{app.breed} • {app.age}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 w-full bg-surface-container-highest/20 rounded-full overflow-hidden p-0.5 border border-outline-variant/10">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-fixed-dim rounded-full transition-all duration-1000 delay-300 shadow-sm" 
                          style={{ width: `${app.progress}%` }} 
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">
                        <span className={cn(app.progress >= 33 && "text-primary opacity-100")}>{app.steps[0]}</span>
                        <span className={cn(app.progress >= 66 && "text-primary opacity-100")}>{app.steps[1]}</span>
                        <span className={cn(app.progress >= 100 && "text-primary opacity-100")}>{app.steps[2]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "favoritos" && (
            <section className="space-y-8 animate-in fade-in duration-700">
               <div className="flex justify-between items-end">
                <h3 className="font-plus-jakarta text-3xl font-black tracking-tight">Corazones Curados</h3>
                <button className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline underline-offset-8">Limpiar Favoritos</button>
              </div>
              <div className="grid grid-cols-12 gap-8 auto-rows-[300px]">
                {/* Large Bento Item */}
                <div className="col-span-12 md:col-span-7 relative group rounded-[48px] overflow-hidden shadow-2xl shadow-primary/5">
                  <Image src={favorites[0].image} alt={favorites[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 space-y-4">
                    <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[40px] space-y-4 shadow-2xl">
                      <div className="space-y-1">
                        <h4 className="font-plus-jakarta font-black text-3xl tracking-tighter text-on-surface">{favorites[0].name}</h4>
                        <p className="text-on-surface-variant font-medium uppercase tracking-widest text-[10px] opacity-60">{favorites[0].age} • {favorites[0].breed}</p>
                      </div>
                      <button className="w-full bg-primary text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl shadow-primary/20">
                        Postular Ahora
                      </button>
                    </div>
                  </div>
                  <button className="absolute top-10 right-10 w-14 h-14 bg-white rounded-full flex items-center justify-center text-error shadow-2xl active:scale-90 transition-all">
                    <Heart className="h-6 w-6 fill-error" />
                  </button>
                </div>

                {/* Medium Bento Item */}
                <div className="col-span-12 md:col-span-5 relative group rounded-[48px] overflow-hidden shadow-xl shadow-black/5">
                   <Image src={favorites[1].image} alt={favorites[1].name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-8 left-8">
                     <h4 className="font-plus-jakarta font-black text-2xl text-white tracking-tight">{favorites[1].name}</h4>
                   </div>
                </div>

                {/* Info Item */}
                <div className="col-span-12 bg-surface-container-low rounded-[48px] p-10 flex flex-col md:flex-row items-center gap-10 border border-outline-variant/10">
                   <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl relative shrink-0">
                      <Image src={favorites[2].image} alt={favorites[2].name} fill className="object-cover" />
                   </div>
                   <div className="flex-1 space-y-4 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <h4 className="font-plus-jakarta font-black text-4xl tracking-tighter">{favorites[2].name}</h4>
                        <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Compromiso Eco</span>
                      </div>
                      <p className="text-on-surface-variant font-medium text-lg opacity-60 max-w-md">Ghost es un samoyedo lleno de energía esperando una manada activa en Buenos Aires.</p>
                      <button className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-[10px] group mx-auto md:mx-0">
                        Agendar Encuentro
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:translate-x-2 transition-all">
                          <Plus className="h-4 w-4" />
                        </div>
                      </button>
                   </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "manada" && (
            <section className="space-y-12 animate-in fade-in duration-700 max-w-3xl mx-auto">
               <div className="flex flex-col items-center gap-6 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-plus-jakarta text-4xl font-black tracking-tight">Hogar para Siempre</h3>
                    <p className="text-on-surface-variant font-medium opacity-60">Tu manada está segura y feliz.</p>
                  </div>
               </div>

               <div className="bg-white rounded-[60px] p-16 editorial-shadow text-center flex flex-col items-center border border-outline-variant/10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary-fixed-dim to-primary" />
                  
                  <div className="relative w-48 h-48 mb-8">
                    <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
                    <div className="absolute inset-4 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                      <Image 
                        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"
                        alt="My Pet"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-[4s]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-12">
                    <h4 className="font-plus-jakarta text-5xl font-black tracking-tighter">Oliver & Penny</h4>
                    <p className="text-on-surface-variant font-medium italic opacity-40">Parte de la manada desde Agosto, 2023</p>
                  </div>

                  <div className="grid grid-cols-3 gap-12 w-full max-w-2xl border-t border-outline-variant/10 pt-12">
                    <div className="space-y-3 group/stat cursor-pointer">
                      <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover/stat:bg-primary group-hover/stat:text-white transition-all shadow-sm">
                        <Stethoscope className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Salud</span>
                        <p className="text-sm font-black text-on-surface tracking-tight">Perfecta</p>
                      </div>
                    </div>
                    <div className="space-y-3 group/stat cursor-pointer">
                       <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover/stat:bg-primary group-hover/stat:text-white transition-all shadow-sm">
                        <Utensils className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Dieta</span>
                        <p className="text-sm font-black text-on-surface tracking-tight">Mix Senior</p>
                      </div>
                    </div>
                    <div className="space-y-3 group/stat cursor-pointer">
                       <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover/stat:bg-primary group-hover/stat:text-white transition-all shadow-sm">
                        <Calendar className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Próx. Vacuna</span>
                        <p className="text-sm font-black text-on-surface tracking-tight">12 Nov</p>
                      </div>
                    </div>
                  </div>

                  <button className="mt-16 flex items-center gap-4 text-primary font-black uppercase tracking-widest text-xs hover:gap-6 transition-all">
                    Ver bitácora completa
                    <ArrowRight className="h-5 w-5" />
                  </button>
               </div>
            </section>
          )}
        </div>

      </main>
    </div>
  );
}
