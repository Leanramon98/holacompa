"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  CreditCard, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Mail, 
  Smartphone,
  ChevronRight,
  Plus,
  Save,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

const settingGroups = [
  {
    title: "Plataforma",
    settings: [
      { name: "General", desc: "Nombre de la app, dominio y logos", icon: Globe },
      { name: "Categorías", desc: "Gestión de razas, especies y tipos de productos", icon: Database },
      { name: "Donaciones & Comisiones", desc: "Configuración de fees para refugios y vendedores", icon: CreditCard },
    ]
  },
  {
    title: "Comunicaciones",
    settings: [
      { name: "Email Marketing", desc: "Plantillas de correos y servidores SMTP", icon: Mail },
      { name: "Notificaciones Push", desc: "Configuración de Firebase Cloud Messaging", icon: Smartphone },
      { name: "Alertas del Sistema", desc: "Logs y monitoreo de errores en tiempo real", icon: Bell },
    ]
  },
  {
    title: "Seguridad & Roles",
    settings: [
      { name: "Permisos SuperAdmin", desc: "Gestión de otros administradores", icon: Shield },
      { name: "Políticas de Privacidad", desc: "Términos y condiciones legales", icon: Shield },
    ]
  }
];

export default function AdminSettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Configuración Global</h1>
           <p className="text-on-surface-variant/60 font-medium">Control total sobre los parámetros y el comportamiento de Hola Compa.</p>
        </div>
        <button className="flex items-center gap-3 bg-on-surface text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all">
           <Save className="h-4 w-4" />
           Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Navigation Sidebar */}
         <div className="lg:col-span-4 space-y-10">
            {settingGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/30 ml-4">{group.title}</h3>
                 <div className="space-y-2">
                    {group.settings.map((s) => (
                      <div key={s.name} className="group p-5 bg-white border border-black/5 rounded-[32px] hover:bg-on-surface hover:text-white transition-all duration-500 cursor-pointer shadow-sm flex items-center gap-4">
                         <div className="w-10 h-10 bg-surface-container-high rounded-xl flex items-center justify-center text-on-surface group-hover:bg-white/10 group-hover:text-white transition-colors">
                            <s.icon className="h-5 w-5" />
                         </div>
                         <div className="flex-1">
                            <p className="font-bold text-sm tracking-tight">{s.name}</p>
                            <p className="text-[10px] font-medium opacity-60 line-clamp-1">{s.desc}</p>
                         </div>
                         <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                      </div>
                    ))}
                 </div>
              </div>
            ))}
         </div>

         {/* Content Area - Managing Categories example */}
         <div className="lg:col-span-8 bg-white rounded-[56px] border border-black/5 p-10 space-y-10 shadow-sm">
            <div className="flex justify-between items-center">
               <div className="space-y-1">
                  <h2 className="font-plus-jakarta text-3xl font-black tracking-tight">Gestión de Categorías</h2>
                  <p className="text-on-surface-variant/60 font-medium text-sm">Agregá o editá las opciones disponibles en la plataforma.</p>
               </div>
               <button className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-inner">
                  <Plus className="h-6 w-6" />
               </button>
            </div>

            <div className="space-y-12">
               {/* Product Categories */}
               <section className="space-y-6">
                  <h4 className="font-bold text-lg tracking-tight border-l-4 border-primary pl-4">Marketplace: Categorías</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {["Alimento Pro", "Juguetes Sustentables", "Accesorios Cuero", "Camas Premium", "Salud y Bienestar"].map((cat) => (
                       <div key={cat} className="flex items-center justify-between p-4 bg-surface-container-low/30 border border-black/[0.02] rounded-2xl group hover:border-primary/20 transition-all">
                          <span className="font-bold text-sm text-on-surface-variant">{cat}</span>
                          <div className="flex gap-2 scale-90 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                                <Settings className="h-3.5 w-3.5" />
                             </button>
                             <button className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-on-surface-variant hover:text-error transition-colors">
                                <Trash2 className="h-3.5 w-3.5" />
                             </button>
                          </div>
                       </div>
                     ))}
                  </div>
               </section>

               {/* Fee Configuration */}
               <section className="p-8 bg-primary-container/20 rounded-[40px] space-y-8">
                  <h4 className="font-plus-jakarta text-xl font-black text-on-primary-container flex items-center gap-3 tracking-tight">
                     <CreditCard className="h-5 w-5" />
                     Comisiones & Fees
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Fee Marketplace (%)</label>
                        <input type="number" defaultValue="15" className="w-full px-6 py-4 bg-white border border-black/5 rounded-2xl font-black text-on-surface text-xl focus:ring-4 focus:ring-primary/10 outline-none" />
                        <p className="text-[10px] font-medium text-on-surface-variant/40">Porcentaje que retiene la plataforma por cada venta.</p>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Fee Donaciones (%)</label>
                        <input type="number" defaultValue="2.5" className="w-full px-6 py-4 bg-white border border-black/5 rounded-2xl font-black text-on-surface text-xl focus:ring-4 focus:ring-primary/10 outline-none" />
                        <p className="text-[10px] font-medium text-on-surface-variant/40">Costo de procesamiento para las donaciones directas.</p>
                     </div>
                  </div>
               </section>

               {/* Global Status */}
               <section className="space-y-4">
                  <div className="flex items-center justify-between p-6 bg-secondary-container/10 border border-secondary/10 rounded-[32px]">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                           <Shield className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="font-bold text-sm tracking-tight">Modo Mantenimiento</p>
                           <p className="text-[10px] font-medium opacity-60">Pone la plataforma en modo lectura.</p>
                        </div>
                     </div>
                     <button className="w-14 h-8 bg-surface-container rounded-full relative p-1 group">
                        <div className="w-6 h-6 bg-white rounded-full shadow-md group-hover:translate-x-6 transition-transform" />
                     </button>
                  </div>
               </section>
            </div>
         </div>

      </div>
    </div>
  );
}
