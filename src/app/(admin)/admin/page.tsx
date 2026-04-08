"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Dog, 
  Store, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  Download,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { name: "Usuarios Totales", value: "12,480", change: "+12%", icon: Users, color: "bg-blue-500" },
  { name: "Adopciones Exitosas", value: "842", change: "+24%", icon: Dog, color: "bg-orange-500" },
  { name: "Ventas Marketplace", value: "$4.2M", change: "+8%", icon: TrendingUp, color: "bg-green-500" },
  { name: "Tiendas Activas", value: "156", change: "+5%", icon: Store, color: "bg-purple-500" },
];

const pendingVerifications = [
  { id: 1, name: "Refugio Los Amigos", type: "Refugio", date: "2h atrás", status: "Pendiente" },
  { id: 2, name: "PetShop Central", type: "Vendedor", date: "5h atrás", status: "Pendiente" },
  { id: 3, name: "Manadita ONG", type: "Refugio", date: "1 día atrás", status: "Pendiente" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h1 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Panel de Control</h1>
           <p className="text-on-surface-variant/60 font-medium">Bienvenido de nuevo, Lea. Esto es lo que está pasando hoy.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-black/5 rounded-2xl font-bold text-sm hover:bg-surface-container transition-all shadow-sm">
              <Download className="h-4 w-4" />
              Reporte Mensual
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-on-surface text-white rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl">
              <Filter className="h-4 w-4" />
              Filtrar Vista
           </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {stats.map((stat, idx) => (
           <motion.div 
             key={stat.name}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm space-y-4 hover:shadow-xl transition-all duration-500 group"
           >
              <div className="flex justify-between items-start">
                 <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0", stat.color)}>
                    <stat.icon className="h-6 w-6" />
                 </div>
                 <span className="bg-secondary-container/20 text-secondary text-[10px] font-black px-3 py-1.5 rounded-full inline-block">
                    {stat.change}
                 </span>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/30">{stat.name}</p>
                 <p className="text-4xl font-plus-jakarta font-black text-on-surface">{stat.value}</p>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* Pending Verifications Table */}
         <div className="lg:col-span-8 bg-white rounded-[48px] border border-black/5 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-black/5 flex justify-between items-center">
               <h2 className="font-plus-jakarta text-2xl font-black tracking-tight">Verificaciones Pendientes</h2>
               <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline underline-offset-8">Ver Todas</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-surface-container-low/30">
                        {["Nombre", "Tipo", "Fecha", "Estado", ""].map((header) => (
                          <th key={header} className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{header}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                     {pendingVerifications.map((item) => (
                       <tr key={item.id} className="group hover:bg-surface-container-low transition-colors">
                          <td className="px-8 py-6">
                             <p className="font-bold text-on-surface">{item.name}</p>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-sm font-medium text-on-surface-variant">{item.type}</p>
                          </td>
                          <td className="px-8 py-6 text-sm text-on-surface-variant/60">{item.date}</td>
                          <td className="px-8 py-6">
                             <span className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit">
                                <Clock className="h-3 w-3" />
                                {item.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button className="w-10 h-10 rounded-full flex items-center justify-center bg-on-surface text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                                <ArrowRight className="h-4 w-4" />
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Alerts & News Sidebar */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-on-surface p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                     <ShieldAlert className="h-6 w-6 text-primary-container" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-2xl font-plus-jakarta font-black tracking-tight">Alerta de Seguridad</h3>
                     <p className="text-white/60 font-medium text-sm leading-relaxed">Se detectaron múltiples intentos de login fallidos desde una IP no reconocida.</p>
                  </div>
                  <button className="w-full bg-white text-on-surface py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-surface-container transition-all">
                     Revisar Logs
                  </button>
               </div>
               <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />
            </div>

            <div className="bg-surface-container-high/40 p-10 rounded-[48px] border border-black/5 space-y-8">
               <h3 className="font-bold text-lg tracking-tight">Historial Rápido</h3>
               <div className="space-y-6">
                  {[
                    { action: "Usuario nuevo", time: "10m atrás", color: "bg-blue-500" },
                    { action: "Venta Marketplace", time: "25m atrás", color: "bg-green-500" },
                    { action: "Nueva Postulación", time: "1h atrás", color: "bg-orange-500" },
                  ].map((log, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                       <div className={cn("w-2 h-12 rounded-full", log.color)} />
                       <div>
                          <p className="font-bold text-sm tracking-tight">{log.action}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mt-1">{log.time}</p>
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
