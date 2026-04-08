"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  ArrowRight, 
  Heart, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePlatformStore } from "@/lib/store/usePlatformStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";

export default function AdminApplicationsPage() {
  const { applications, pets, shelters, updateApplicationStatus } = usePlatformStore();

  const handleStatusChange = (id: string, newStatus: any) => {
    updateApplicationStatus(id, newStatus);
  };

  return (
    <HydrationZustand>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Gestión de Postulaciones</h1>
            <p className="text-on-surface-variant/60 font-medium">Monitoreo global de los procesos de adopción en toda la plataforma.</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl border border-black/5 shadow-sm">
            <div className="px-6 py-3 border-r border-black/5 text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Total Pendientes</p>
                <p className="font-plus-jakarta font-black text-xl">{applications.filter(a => a.status === 'pendiente').length}</p>
            </div>
            <div className="px-6 py-3 text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-secondary">Aprobadas</p>
                <p className="font-plus-jakarta font-black text-xl text-secondary">{applications.filter(a => a.status === 'aprobada').length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar por adoptante, mascota o refugio..." 
                className="w-full pl-16 pr-6 py-5 bg-white border border-black/5 rounded-3xl outline-none font-medium focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
              />
          </div>
          <div className="flex gap-4 col-span-1 lg:col-span-2 overflow-x-auto no-scrollbar">
              {["Todas", "Pendientes", "En Revisión", "Aceptadas", "Rechazadas"].map((f, i) => (
                <button key={f} className={cn(
                  "px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                  i === 0 ? "bg-on-surface text-white shadow-xl shadow-black/10" : "bg-white border border-black/5 text-on-surface-variant/60 hover:bg-surface-container"
                )}>
                  {f}
                </button>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-[56px] border border-black/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                    <tr className="bg-surface-container-low/30">
                      {["Mascota", "Adoptante", "Refugio", "Fecha", "Estado", "Acciones"].map((header) => (
                          <th key={header} className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{header}</th>
                      ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                    {applications.map((app, idx) => {
                      const pet = pets.find(p => p.id === app.pet_id);
                      const shelter = shelters.find(s => s.profile_id === app.shelter_id);
                      
                      return (
                        <motion.tr 
                          key={app.id} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group hover:bg-surface-container-low/50 transition-colors"
                        >
                          <td className="px-10 py-8">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-3xl overflow-hidden relative shadow-md">
                                    <Image src={pet?.photos[0] || "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2588&auto=format&fit=crop"} alt={pet?.name || "Mascota"} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-plus-jakarta font-black text-lg tracking-tight">{pet?.name || "Sin Nombre"}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">ID: {app.id}</p>
                                </div>
                              </div>
                          </td>
                          <td className="px-10 py-8">
                              <p className="font-bold text-on-surface">Usuario {app.adopter_id}</p>
                              <p className="text-xs text-on-surface-variant/60">{app.reason_to_adopt.substring(0, 30)}...</p>
                          </td>
                          <td className="px-10 py-8 font-medium text-on-surface-variant">{shelter?.shelter_name || "Desconocido"}</td>
                          <td className="px-10 py-8 text-sm text-on-surface-variant/60">
                              {new Date(app.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-10 py-8">
                              <span className={cn(
                                "px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit",
                                app.status === "aprobada" ? "bg-secondary-container text-on-secondary-container" :
                                app.status === "pendiente" ? "bg-primary-container text-on-primary-container" :
                                "bg-surface-container-highest text-on-surface-variant/40"
                              )}>
                                {app.status === "aprobada" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                                {app.status}
                              </span>
                          </td>
                          <td className="px-10 py-8">
                              <div className="flex gap-2">
                                {app.status === 'pendiente' && (
                                  <>
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'aprobada')}
                                      className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center hover:scale-110 transition-all shadow-md shadow-secondary/20"
                                    >
                                      <CheckCircle2 className="h-5 w-5" />
                                    </button>
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'rechazada')}
                                      className="w-10 h-10 rounded-xl bg-error text-white flex items-center justify-center hover:scale-110 transition-all shadow-md shadow-error/20"
                                    >
                                      <XCircle className="h-5 w-5" />
                                    </button>
                                  </>
                                )}
                                <button className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center hover:bg-surface-container transition-all">
                                    <MessageSquare className="h-5 w-5 text-on-surface-variant" />
                                </button>
                              </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </HydrationZustand>
  );
}
