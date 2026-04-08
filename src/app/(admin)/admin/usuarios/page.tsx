"use client";

import { motion } from "framer-motion";
import { Users, Search, Filter, MoreVertical, ShieldCheck, Mail, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers = [
  { id: "U-101", name: "Lea Super", role: "SuperAdmin", email: "lea@holacompa.com", status: "Activo", date: "01/01/2024" },
  { id: "U-102", name: "Refugio Patitas", role: "Refugio", email: "contacto@patitas.org", status: "Verificado", date: "15/02/2024" },
  { id: "U-103", name: "Juan Vendedor", role: "Vendedor", email: "juan@petshop.com", status: "Pendiente", date: "10/03/2024" },
  { id: "U-104", name: "Julieta Marcone", role: "Adoptante", email: "juli@gmail.com", status: "Activo", date: "05/04/2024" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Usuarios</h1>
           <p className="text-on-surface-variant/60 font-medium">Gestión integral de todos los perfiles registrados.</p>
        </div>
        <button className="bg-primary text-white p-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
           <Users className="h-6 w-6" />
        </button>
      </div>

      <div className="bg-white rounded-[48px] border border-black/5 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-black/5 flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="relative w-full md:max-w-md group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
               <input type="text" placeholder="Buscar usuario..." className="w-full pl-16 pr-6 py-4 bg-surface-container-low/40 rounded-2xl outline-none border border-transparent focus:border-primary/20 transition-all font-medium" />
            </div>
            <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
               {["Todos", "Admin", "Adoptantes", "Refugios", "Vendedores"].map((f, i) => (
                 <button key={f} className={cn(
                   "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                   i === 0 ? "bg-on-surface text-white" : "bg-surface-container-high/40 text-on-surface-variant/60"
                 )}>{f}</button>
               ))}
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-surface-container-low/30">
                     {["Usuario", "Rol", "Contacto", "Registro", "Estado", ""].map((header) => (
                       <th key={header} className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{header}</th>
                     ))}
                  </tr>
               </thead>
               <tbody className="divide-y divide-black/5">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-surface-container-low transition-colors">
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center font-black text-primary">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-on-surface">{user.name}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/30">{user.id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                            user.role === "SuperAdmin" ? "bg-purple-100 text-purple-600" :
                            user.role === "Refugio" ? "bg-orange-100 text-orange-600" :
                            user.role === "Vendedor" ? "bg-green-100 text-green-600" :
                            "bg-blue-100 text-blue-600"
                          )}>
                             {user.role}
                          </span>
                       </td>
                       <td className="px-10 py-6">
                          <div className="space-y-1">
                             <p className="text-sm font-medium flex items-center gap-2 text-on-surface-variant/60">
                                <Mail className="h-3 w-3" /> {user.email}
                             </p>
                          </div>
                       </td>
                       <td className="px-10 py-6 text-sm text-on-surface-variant/40 font-medium">{user.date}</td>
                       <td className="px-10 py-6">
                          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
                             <ShieldCheck className="h-4 w-4" />
                             {user.status}
                          </span>
                       </td>
                       <td className="px-10 py-6 text-right">
                          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
                             <MoreVertical className="h-5 w-5 text-on-surface-variant/40" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
