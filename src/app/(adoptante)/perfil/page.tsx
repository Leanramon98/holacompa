"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Edit3, 
  Settings, 
  Bell, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  Heart,
  Dog,
  CheckCircle2,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MiPerfilPage() {
  const user = {
    name: "Eleanor Whisker",
    email: "eleanor.w@nurture.pet",
    location: "Portland, Oregon",
    memberSince: "2022",
    occupation: "Diseñadora de Paisajes",
    bio: "Vivo en una casa espaciosa con un gran patio cercado. Crecí con perros y gatos toda mi vida. Busco un compañero mediano que ame las caminatas al aire libre y los mimos nocturnos.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop"
  };

  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Settings className="text-white h-5 w-5" />
            </div>
            <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface">Mi Perfil</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
              <Bell className="h-5 w-5 text-on-surface-variant" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 space-y-12 max-w-5xl">
        
        {/* Profile Hero */}
        <section className="relative flex flex-col md:flex-row items-center md:items-end gap-10 bg-surface-container-low p-12 rounded-[60px] border border-outline-variant/10 shadow-sm overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative shrink-0">
             <div className="w-56 h-56 rounded-[48px] overflow-hidden border-8 border-white shadow-2xl rotate-[-2deg] group-hover:rotate-0 transition-transform duration-700">
                <Image src={user.avatar} alt={user.name} fill className="object-cover" />
             </div>
             <button className="absolute -bottom-4 -right-4 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                <Edit3 className="h-6 w-6" />
             </button>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
             <div className="flex flex-col md:flex-row items-center gap-4">
                <h2 className="font-plus-jakarta text-5xl font-black tracking-tighter text-on-surface">{user.name}</h2>
                <span className="bg-secondary-container text-on-secondary-container px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  Adoptante Verificado
                </span>
             </div>
             <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-on-surface-variant/60 font-bold text-sm tracking-tight">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {user.location}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-outline-variant/30" />
                <span>Miembro desde {user.memberSince}</span>
             </div>
          </div>
        </section>

        {/* Bento Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Info Card */}
          <div className="md:col-span-8 bg-white rounded-[48px] p-12 border border-outline-variant/10 shadow-xl shadow-black/5 space-y-10">
             <div className="flex justify-between items-center">
                <h3 className="font-plus-jakarta text-3xl font-black tracking-tight text-on-surface">Información Personal</h3>
                <button className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline underline-offset-8 transition-all">Editar Todo</button>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Correo Electrónico</span>
                  <p className="text-xl font-bold text-on-surface">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Profesión</span>
                  <p className="text-xl font-bold text-on-surface">{user.occupation}</p>
                </div>
             </div>

             <div className="pt-10 border-t border-outline-variant/10 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Bio y Estilo de Vida</span>
                <p className="text-on-surface-variant font-medium text-lg leading-relaxed opacity-80">{user.bio}</p>
             </div>
          </div>

          {/* Side Column */}
          <div className="md:col-span-4 flex flex-col gap-8">
             {/* Match Settings */}
             <div className="bg-surface-container-highest/20 rounded-[40px] p-10 border border-outline-variant/10 shadow-sm flex flex-col gap-8">
                <h3 className="font-plus-jakarta text-2xl font-black text-on-surface tracking-tight">Preferencias</h3>
                <div className="space-y-6">
                   {[
                     { label: "Matches Nuevos", icon: <Bell className="h-4 w-4" />, active: true },
                     { label: "Perfil Público", icon: <Home className="h-4 w-4" />, active: false }
                   ].map((item) => (
                     <div key={item.label} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                              {item.icon}
                           </div>
                           <span className="font-bold text-on-surface-variant">{item.label}</span>
                        </div>
                        <div className={cn(
                          "w-12 h-6 rounded-full relative transition-colors duration-500",
                          item.active ? "bg-primary" : "bg-outline-variant/30"
                        )}>
                          <div className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                            item.active ? "right-1" : "left-1"
                          )} />
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-8 border-t border-outline-variant/10 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Buscando</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: <Dog className="h-3 w-3" />, label: "Perros" },
                      { icon: <CheckCircle2 className="h-3 w-3" />, label: "Seniors" },
                      { icon: <Home className="h-3 w-3" />, label: "Entrenados" }
                    ].map((tag) => (
                      <span key={tag.label} className="bg-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-black/5">
                        {tag.icon}
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
             </div>

             {/* Sign Out Card */}
             <button className="bg-error/5 group flex items-center justify-between p-8 rounded-[40px] border border-error/10 hover:bg-error hover:text-white transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-error group-hover:bg-white/20 group-hover:text-white transition-all">
                    <LogOut className="h-6 w-6" />
                  </div>
                  <span className="font-black uppercase tracking-[0.2em] text-xs">Cerrar Sesión</span>
                </div>
                <ChevronRight className="h-6 w-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
             </button>
          </div>

          {/* Account Settings Bento */}
          <div className="md:col-span-12 bg-surface-container-low rounded-[48px] p-12 border border-outline-variant/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { icon: <Lock className="h-6 w-6" />, label: "Seguridad y Clave" },
               { icon: <CreditCard className="h-6 w-6" />, label: "Historial de Donaciones" },
               { icon: <ShieldCheck className="h-6 w-6" />, label: "Verificación de Identidad" }
             ].map((item) => (
               <button key={item.label} className="bg-white p-8 rounded-[32px] flex items-center justify-between group hover:shadow-2xl hover:shadow-primary/5 hover:translate-y-[-4px] transition-all border border-black/5">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-[20px] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                       {item.icon}
                    </div>
                    <span className="font-plus-jakarta font-black tracking-tight text-on-surface">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-outline-variant group-hover:text-primary group-hover:translate-x-2 transition-all" />
               </button>
             ))}
          </div>

        </div>

      </main>
    </div>
  );
}
