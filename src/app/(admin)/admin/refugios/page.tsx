"use client";

import { motion } from "framer-motion";
import { Dog, Search, MapPin, CheckCircle2, MoreVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const mockShelters = [
  { id: "S-01", name: "Patitas del Sur", city: "Lanús, GBA", pets: 45, status: "Verificado", plan: "Premium", avatar: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop" },
  { id: "S-02", name: "Manada Libre", city: "Pilar, GBA", pets: 82, status: "Verificado", plan: "Basic", avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2588&auto=format&fit=crop" },
  { id: "S-03", name: "Rescatados Oeste", city: "Morón, GBA", pets: 12, status: "Pendiente", plan: "Basic", avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2686&auto=format&fit=crop" },
];

export default function AdminSheltersPage() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Refugios</h1>
           <p className="text-on-surface-variant/60 font-medium">Administración de ONGs y rescatistas independientes.</p>
        </div>
        <button className="flex items-center gap-3 bg-on-surface text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">
           <Plus className="h-4 w-4" />
           Registrar Refugio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {mockShelters.map((shelter, idx) => (
           <motion.div 
             key={shelter.id}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: idx * 0.1 }}
             className="bg-white p-8 rounded-[48px] border border-black/5 shadow-sm space-y-6 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700"
           >
              <div className="flex justify-between items-start">
                 <div className="w-20 h-20 rounded-[28px] overflow-hidden relative shadow-lg group-hover:scale-110 transition-transform duration-700">
                    <Image src={shelter.avatar} alt={shelter.name} fill className="object-cover" />
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                      shelter.plan === "Premium" ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant/40"
                    )}>{shelter.plan}</span>
                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-secondary">
                       <CheckCircle2 className="h-3 w-3" />
                       {shelter.status}
                    </span>
                 </div>
              </div>
              <div className="space-y-2">
                 <h3 className="font-plus-jakarta text-2xl font-black tracking-tight">{shelter.name}</h3>
                 <p className="flex items-center gap-2 text-on-surface-variant/40 font-bold text-sm">
                    <MapPin className="h-4 w-4" />
                    {shelter.city}
                 </p>
              </div>
              <div className="pt-6 border-t border-black/5 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <Dog className="h-5 w-5 text-primary" />
                    <span className="font-black text-on-surface text-lg">{shelter.pets}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Mascotas</span>
                 </div>
                 <button className="w-10 h-10 rounded-xl bg-surface-container-high/40 flex items-center justify-center hover:bg-on-surface hover:text-white transition-all">
                    <MoreVertical className="h-5 w-5" />
                 </button>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
