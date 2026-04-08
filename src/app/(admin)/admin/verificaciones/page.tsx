"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Store, 
  Dog, 
  Check, 
  X, 
  Eye, 
  FileText,
  Search,
  Filter,
  ArrowRight,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { usePlatformStore } from "@/lib/store/usePlatformStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";
import { Shelter, Vendor } from "@/types";

export default function VerificationsPage() {
  const { shelters, vendors, verifyEntity } = usePlatformStore();

  // Para el demo, mostramos tanto los que están en la DB mock como los del store
  // Filtramos los que NO están aprobados para la cola de pendientes
  const pendingShelters = (shelters as Shelter[]).filter(s => s.verification_status !== 'approved');
  const pendingVendors = (vendors as Vendor[]).filter(v => v.verification_status !== 'approved');

  const combinedQueue = [
    ...pendingShelters.map(s => ({
      id: s.profile_id,
      name: s.shelter_name,
      type: "Refugio" as const,
      date: "Recibido hoy",
      documents: 3,
      risk: "Bajo",
      avatar: s.photos[0] || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"
    })),
    ...pendingVendors.map(v => ({
      id: v.profile_id,
      name: v.business_name,
      type: "Vendedor" as const,
      date: "Recibido hoy",
      documents: 5,
      risk: "Medio",
      avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2588&auto=format&fit=crop"
    }))
  ];

  const handleApprove = (id: string, type: "Refugio" | "Vendedor") => {
    verifyEntity(id, type === "Refugio" ? "refugio" : "vendedor", "approved");
    alert(`${type} aprobado con éxito. Los cambios se verán reflejados en la webapp.`);
  };

  const handleReject = (id: string, type: "Refugio" | "Vendedor") => {
    verifyEntity(id, type === "Refugio" ? "refugio" : "vendedor", "rejected");
  };

  return (
    <HydrationZustand>
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Cola de Verificación</h1>
            <p className="text-on-surface-variant/60 font-medium">Revisá y aprobá perfiles comerciales para mantener la calidad de la plataforma.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex p-1 bg-surface-container rounded-2xl border border-black/5">
              <button className="px-6 py-2.5 bg-white shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-primary transition-all">
                Pendientes ({combinedQueue.length})
              </button>
              <button className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 hover:text-on-surface transition-all">Aprobados</button>
              <button className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 hover:text-on-surface transition-all">Rechazados</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {combinedQueue.length === 0 ? (
            <div className="py-20 text-center bg-surface-container-low rounded-[48px] border-2 border-dashed border-outline-variant/30">
               <ShieldCheck className="h-16 w-16 text-primary/20 mx-auto mb-4" />
               <p className="font-plus-jakarta font-black text-on-surface-variant/40 uppercase tracking-widest">No hay verificaciones pendientes</p>
            </div>
          ) : (
            combinedQueue.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 md:p-10 rounded-[48px] border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 group flex flex-col lg:flex-row items-center justify-between gap-10"
              >
                <div className="flex items-center gap-8 w-full lg:w-auto">
                  <div className="w-24 h-24 rounded-[32px] overflow-hidden shadow-xl border-4 border-surface-container relative shrink-0">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-plus-jakarta text-2xl font-black tracking-tight">{item.name}</h3>
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2",
                        item.type === "Refugio" ? "bg-secondary-container/20 text-secondary" : "bg-primary-container/20 text-primary"
                      )}>
                        {item.type === "Refugio" ? <Dog className="h-3 w-3" /> : <Store className="h-3 w-3" />}
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-on-surface-variant/40 font-bold text-sm">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-2 text-primary font-black">
                        <FileText className="h-4 w-4" />
                        {item.documents} docs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full lg:w-auto lg:px-10 border-t lg:border-t-0 lg:border-l border-black/5 pt-10 lg:pt-0">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">ID de Solicitud</p>
                      <p className="font-bold text-on-surface font-mono text-sm">{item.id.slice(0, 8)}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Nivel de Riesgo</p>
                      <p className={cn(
                        "font-black text-sm uppercase tracking-tight",
                        item.risk === "Bajo" ? "text-secondary" : "text-error"
                      )}>{item.risk}</p>
                   </div>
                   <div className="col-span-2 flex gap-4 mt-auto">
                      <button className="flex-1 lg:w-16 h-16 rounded-[28px] bg-surface-container-high/40 text-on-surface-variant flex items-center justify-center hover:bg-white hover:shadow-xl transition-all active:scale-95 group/btn">
                         <Eye className="h-6 w-6 group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleReject(item.id, item.type)}
                        className="flex-1 lg:w-16 h-16 rounded-[28px] bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all active:scale-95 group/btn"
                      >
                         <X className="h-6 w-6 group-hover/btn:rotate-90 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleApprove(item.id, item.type)}
                        className="flex-3 lg:px-8 h-16 rounded-[28px] bg-on-surface text-white flex items-center justify-center gap-4 font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl group/btn"
                      >
                         Aprobar
                         <Check className="h-5 w-5 text-secondary group-hover/btn:scale-125 transition-transform" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </HydrationZustand>
  );
}
