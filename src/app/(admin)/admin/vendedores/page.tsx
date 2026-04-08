"use client";

import { motion } from "framer-motion";
import { Store, Search, TrendingUp, CheckCircle2, MoreVertical, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const mockVendors = [
  { id: "V-01", name: "PetShop Nordelta", city: "Tigre, GBA", sales: 1450, rating: 4.9, status: "Verificado", avatar: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2680&auto=format&fit=crop" },
  { id: "V-02", name: "Mundo Canino", city: "Belgrano, CABA", sales: 890, rating: 4.7, status: "Verificado", avatar: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=2671&auto=format&fit=crop" },
  { id: "V-03", name: "Gatomana", city: "Palermo, CABA", sales: 320, rating: 4.5, status: "Pendiente", avatar: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2660&auto=format&fit=crop" },
];

export default function AdminVendorsPage() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Vendedores</h1>
           <p className="text-on-surface-variant/60 font-medium">Control comercial del Marketplace y partners oficiales.</p>
        </div>
        <button className="flex items-center gap-3 bg-on-surface text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">
           <Plus className="h-4 w-4" />
           Nuevo Partner
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
         {mockVendors.map((vendor, idx) => (
           <motion.div 
             key={vendor.id}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             className="bg-white p-6 md:p-8 rounded-[48px] border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 group flex flex-col md:flex-row items-center justify-between gap-8"
           >
              <div className="flex items-center gap-6 w-full md:w-auto">
                 <div className="w-20 h-20 rounded-[28px] overflow-hidden relative shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-700">
                    <Image src={vendor.avatar} alt={vendor.name} fill className="object-cover" />
                 </div>
                 <div className="space-y-1">
                    <div className="flex items-center gap-3">
                       <h3 className="font-plus-jakarta text-2xl font-black tracking-tight">{vendor.name}</h3>
                       <span className={cn(
                         "px-3 py-1 bg-surface-container text-on-surface-variant/40 rounded-lg text-[9px] font-black uppercase tracking-widest",
                         vendor.status === "Verificado" && "bg-secondary-container/20 text-secondary"
                       )}>{vendor.status}</span>
                    </div>
                    <p className="text-on-surface-variant/40 font-bold text-sm">{vendor.city} • ID: {vendor.id}</p>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-12 w-full md:w-auto border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-12">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Ventas</p>
                    <div className="flex items-center gap-2">
                       <TrendingUp className="h-4 w-4 text-secondary" />
                       <p className="font-plus-jakarta font-black text-xl tracking-tight">{vendor.sales}</p>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Rating</p>
                    <div className="flex items-center gap-2">
                       <Star className="h-4 w-4 fill-primary text-primary" />
                       <p className="font-plus-jakarta font-black text-xl tracking-tight">{vendor.rating}</p>
                    </div>
                 </div>
                 <div className="flex items-center justify-end">
                    <button className="w-14 h-14 rounded-2xl bg-surface-container-high/40 flex items-center justify-center hover:bg-on-surface hover:text-white transition-all group/btn">
                       <MoreVertical className="h-6 w-6" />
                    </button>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
