"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Eye, 
  Trash2,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ChevronRight,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const myPets = [
  { id: 1, name: "Barnaby", breed: "Beagle", status: "Disponible", applications: 8, visits: 245, image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2588&auto=format&fit=crop" },
  { id: 2, name: "Mochi", breed: "Persa Mix", status: "En Proceso", applications: 12, visits: 189, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2686&auto=format&fit=crop" },
  { id: 3, name: "Luna", breed: "Golden Retriever", status: "Adoptado", applications: 45, visits: 1200, image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2424&auto=format&fit=crop" },
  { id: 4, name: "Coco", breed: "Boxer", status: "Pausado", applications: 2, visits: 45, image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2669&auto=format&fit=crop" },
];

export default function ShelterPetsPage() {
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
             <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface uppercase">Mis Mascotas</h1>
          </div>
          <Link href="/refugio/mascotas/publicar" className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
             <Plus className="h-6 w-6" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 space-y-10 max-w-6xl">
        
        {/* Search & Filter Bar */}
        <section className="flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar por nombre o raza..." 
                className="w-full pl-16 pr-6 py-5 bg-white border border-outline-variant/10 rounded-[28px] focus:ring-4 focus:ring-primary/5 outline-none font-medium text-lg placeholder:text-on-surface-variant/20 shadow-sm"
              />
           </div>
           
           <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
              {["todos", "disponibles", "adoptados"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                    filter === f 
                      ? "bg-on-surface text-background shadow-lg" 
                      : "bg-surface-container-high/40 text-on-surface-variant/60 hover:bg-white border border-transparent hover:border-outline-variant/10"
                  )}
                >
                  {f}
                </button>
              ))}
           </div>
        </section>

        {/* Pets Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {myPets.map((pet) => (
             <div key={pet.id} className="bg-white rounded-[40px] p-4 border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 group overflow-hidden">
                <div className="flex gap-6 items-start">
                   <div className="w-40 h-40 rounded-[32px] overflow-hidden relative shadow-lg shadow-black/5 shrink-0">
                      <Image src={pet.image} alt={pet.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                   </div>
                   
                   <div className="flex-1 py-2 space-y-4">
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <h3 className="font-plus-jakarta text-2xl font-black text-on-surface tracking-tighter">{pet.name}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{pet.breed}</p>
                         </div>
                         <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
                            <MoreVertical className="h-5 w-5 text-outline-variant" />
                         </button>
                      </div>

                      <div className="flex items-center gap-3">
                         <span className={cn(
                           "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                           pet.status === "Disponible" ? "bg-secondary-container text-on-secondary-container" : 
                           pet.status === "Adoptado" ? "bg-surface-container-highest text-on-surface-variant/40" :
                           "bg-primary-container text-on-primary-container"
                         )}>
                           {pet.status}
                         </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/10 pt-4">
                         <div className="space-y-1">
                            <div className="flex items-center gap-2 text-on-surface-variant/40">
                               <Users className="h-3 w-3" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Postulas</span>
                            </div>
                            <p className="font-black text-on-surface text-sm">{pet.applications}</p>
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center gap-2 text-on-surface-variant/40">
                               <Eye className="h-3 w-3" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Vistas</span>
                            </div>
                            <p className="font-black text-on-surface text-sm">{pet.visits}</p>
                          </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                   <button className="flex items-center justify-center gap-2 py-4 rounded-[24px] bg-secondary-container/10 text-on-secondary-container hover:bg-secondary-container transition-all font-black uppercase tracking-widest text-[9px]">
                      <Edit2 className="h-3 w-3" />
                      Editar
                   </button>
                   <button className="flex items-center justify-center gap-2 py-4 rounded-[24px] bg-primary-container/10 text-on-primary-container hover:bg-primary-container transition-all font-black uppercase tracking-widest text-[9px]">
                      <Plus className="h-3 w-3" />
                      Social
                   </button>
                   <button className="flex items-center justify-center gap-2 py-4 rounded-[24px] bg-surface-container-high/40 text-on-surface-variant/60 hover:bg-error/10 hover:text-error transition-all font-black uppercase tracking-widest text-[9px]">
                      <Trash2 className="h-3 w-3" />
                      Ocultar
                   </button>
                </div>
             </div>
           ))}
        </section>

      </main>
    </div>
  );
}
