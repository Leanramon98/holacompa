"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Heart, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainKPIs = [
  { name: "Crecimiento Mensual", value: "+18.4%", trend: "up", label: "Usuarios Activos" },
  { name: "Conversión Adopción", value: "12.2%", trend: "up", label: "Postulación a Éxito" },
  { name: "Ticket Promedio", value: "$4,280", trend: "down", label: "Marketplace" },
  { name: "Retención", value: "64%", trend: "up", label: "Tasa de Retorno" },
];

export default function AdminMetricsPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h1 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Métricas de la Plataforma</h1>
           <p className="text-on-surface-variant/60 font-medium">Análisis detallado del impacto y rendimiento de Hola Compa.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex bg-white p-1.5 rounded-2xl border border-black/5 shadow-sm">
              <button className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 hover:text-on-surface transition-all">7D</button>
              <button className="px-5 py-2.5 bg-on-surface text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">1M</button>
              <button className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 hover:text-on-surface transition-all">1Y</button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {mainKPIs.map((kpi, idx) => (
           <motion.div 
             key={kpi.name}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: idx * 0.1 }}
             className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm space-y-4"
           >
              <div className="flex justify-between items-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{kpi.name}</p>
                 {kpi.trend === "up" ? (
                   <ArrowUpRight className="h-5 w-5 text-secondary" />
                 ) : (
                   <ArrowDownRight className="h-5 w-5 text-error" />
                 )}
              </div>
              <div className="space-y-1">
                 <p className="text-4xl font-plus-jakarta font-black text-on-surface">{kpi.value}</p>
                 <p className="text-xs font-bold text-on-surface-variant/60">{kpi.label}</p>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* Simulated Chart Container */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[56px] border border-black/5 shadow-sm min-h-[500px] flex flex-col">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="font-plus-jakarta text-2xl font-black tracking-tight">Adopciones vs Tiempo</h3>
                  <div className="flex gap-4 items-center">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">2024</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-surface-container-highest" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">2023</span>
                     </div>
                  </div>
               </div>
               
               {/* Visual placeholder for a real chart */}
               <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
                  {[45, 62, 58, 75, 90, 85, 110, 105, 120, 140, 130, 155].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                       <div className="w-full relative flex items-end justify-center">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className="w-full max-w-[40px] bg-primary rounded-t-2xl group-hover:bg-secondary transition-colors cursor-pointer relative"
                          >
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {h}
                             </div>
                          </motion.div>
                       </div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/30">
                          {["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                       </span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-surface-container-low/40 p-10 rounded-[48px] border border-black/[0.02] space-y-6">
                  <h4 className="font-bold text-lg tracking-tight flex items-center gap-3">
                     <Users className="h-5 w-5 text-primary" />
                     Distribución por Rol
                  </h4>
                  <div className="space-y-4">
                     {[
                       { label: "Adoptantes", value: "75%", color: "bg-blue-500" },
                       { label: "Refugios", value: "15%", color: "bg-orange-500" },
                       { label: "Vendedores", value: "10%", color: "bg-purple-500" },
                     ].map((item) => (
                       <div key={item.label} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span>{item.label}</span>
                             <span>{item.value}</span>
                          </div>
                          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                             <div className={cn("h-full", item.color)} style={{ width: item.value }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white p-10 rounded-[48px] border border-black/5 space-y-6 shadow-sm">
                  <h4 className="font-bold text-lg tracking-tight flex items-center gap-3">
                     <TrendingUp className="h-5 w-5 text-secondary" />
                     Meta Semanal
                  </h4>
                  <div className="flex flex-col items-center justify-center space-y-4 py-4">
                     <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                           <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-surface-container" />
                           <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset="100" className="text-secondary" />
                        </svg>
                        <span className="absolute font-plus-jakarta font-black text-2xl tracking-tight text-on-surface">72%</span>
                     </div>
                     <p className="text-xs font-medium text-on-surface-variant/60 text-center px-4">Estás a 28 adopciones de completar la meta semanal.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Transactions / Reports Sidebar */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-on-surface p-10 rounded-[56px] text-white space-y-8 shadow-2xl">
               <div className="flex justify-between items-center">
                  <h3 className="font-plus-jakarta text-2xl font-black tracking-tight">Reportes</h3>
                  <Download className="h-6 w-6 text-primary-container" />
               </div>
               <div className="space-y-4">
                  {[
                    "Resumen de Ingresos Q1.pdf",
                    "Impacto Social Anual.docx",
                    "Auditoría de Refugios.xlsx",
                    "Top 10 Productos Marketplace.pdf"
                  ].map((file) => (
                    <div key={file} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group">
                       <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">{file}</span>
                       <ArrowUpRight className="h-4 w-4 text-primary-container" />
                    </div>
                  ))}
               </div>
               <button className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
                  Generar Nuevo Reporte
               </button>
            </div>

            <div className="bg-white p-10 rounded-[56px] border border-black/5 space-y-8 shadow-sm">
               <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg tracking-tight">Actividad en Vivo</h3>
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
               </div>
               <div className="space-y-6">
                  {[
                    { user: "Martin K.", action: "postuló a Barnaby", time: "ahora" },
                    { user: "Refugio Sur", action: "subió 3 mascotas", time: "2m atrás" },
                    { user: "Ana L.", action: "compró Correa XS", time: "5m atrás" },
                    { user: "PetShop Pro", action: "verificación enviada", time: "8m atrás" },
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-full bg-surface-container-highest shrink-0" />
                       <div className="space-y-0.5">
                          <p className="text-xs font-medium"><span className="font-black text-on-surface">{act.user}</span> {act.action}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/30">{act.time}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
