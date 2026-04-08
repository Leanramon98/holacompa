"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Store, 
  ChevronRight, 
  Mail, 
  Lock, 
  User as UserIcon,
  ArrowRight,
  ShieldCheck,
  Building
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePlatformStore, User } from "@/lib/store/usePlatformStore";
import { useRouter } from "next/navigation";

type Role = "adoptante" | "refugio" | "vendedor";

export default function RegistroPage() {
  const [selectedRole, setSelectedRole] = useState<Role>("adoptante");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { registerUser } = usePlatformStore();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    registerUser(formData.name, formData.email, selectedRole);
    
    // Redirect based on role
    if (selectedRole === "adoptante") router.push("/feed");
    else if (selectedRole === "refugio") router.push("/refugio/dashboard");
    else router.push("/vendedor/dashboard");
  };

  const roles = [
    { 
      id: "adoptante", 
      label: "Quiero adoptar", 
      desc: "Busco a mi mejor amigo y quiero brindarle un hogar.",
      icon: <Heart className="h-6 w-6" />,
      color: "bg-primary-container text-primary"
    },
    { 
      id: "refugio", 
      label: "Soy un refugio", 
      desc: "Gestiono adopciones y busco familias responsables.",
      icon: <Building className="h-6 w-6" />,
      color: "bg-secondary-container text-on-secondary-container"
    },
    { 
      id: "vendedor", 
      label: "Soy vendedor", 
      desc: "Ofrezco productos, accesorios o servicios profesionales.",
      icon: <Store className="h-6 w-6" />,
      color: "bg-tertiary-container text-on-tertiary-container"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-be-vietnam py-12 px-6 flex flex-col items-center relative overflow-hidden">
      
      {/* Decorative background */}
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-primary-container/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[120px] -z-10" />

      {/* Brand Header */}
      <header className="mb-16 text-center space-y-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="font-plus-jakarta font-black text-4xl tracking-tighter text-primary">Hola Compa</h1>
          <p className="text-on-surface-variant font-medium opacity-60">Comienza tu viaje con un nuevo compañero</p>
        </motion.div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Role Selection */}
        <section className="lg:col-span-7 space-y-8">
           <div className="space-y-2">
              <h2 className="font-plus-jakarta text-4xl font-black text-on-surface tracking-tight">¿Cómo quieres unirte?</h2>
              <p className="text-on-surface-variant font-medium opacity-60">Selecciona el perfil que mejor te represente.</p>
           </div>

           <div className="grid gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as Role)}
                  className={cn(
                    "group relative flex items-center p-8 rounded-[32px] border-2 transition-all duration-500 text-left overflow-hidden",
                    selectedRole === role.id 
                      ? "bg-white border-primary shadow-2xl shadow-primary/10" 
                      : "bg-white/50 border-transparent hover:border-primary/20 shadow-sm"
                  )}
                >
                   <div className={cn(
                     "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
                     role.color
                   )}>
                     {role.icon}
                   </div>
                   
                   <div className="ml-6 flex-1 space-y-1">
                      <h3 className="font-plus-jakarta font-black text-xl text-on-surface">{role.label}</h3>
                      <p className="text-sm text-on-surface-variant font-medium opacity-60 leading-relaxed">{role.desc}</p>
                   </div>

                   <div className={cn(
                     "transition-all duration-300",
                     selectedRole === role.id ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 group-hover:opacity-40"
                   )}>
                      <ChevronRight className="h-6 w-6 text-primary" />
                   </div>
                </button>
              ))}
           </div>
        </section>

        {/* Registration Form */}
        <section className="lg:col-span-5 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-outline-variant/10 shadow-2xl shadow-primary/5 sticky top-12">
           <div className="mb-10 space-y-1">
              <h2 className="font-plus-jakarta text-3xl font-black text-on-surface tracking-tight">Crea tu cuenta</h2>
              <p className="text-sm text-on-surface-variant font-medium opacity-60">Datos de {selectedRole}</p>
           </div>

           <form className="space-y-6" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4">Nombre completo</label>
                <div className="relative group">
                  <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors h-5 w-5" />
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    placeholder="Ej. Ana García"
                    className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-[28px] focus:ring-4 focus:ring-primary/10 shadow-sm outline-none transition-all text-lg font-medium placeholder:text-outline-variant/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4">Correo electrónico</label>
                <div className="relative group">
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors h-5 w-5" />
                   <input 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    placeholder="hola@ejemplo.com"
                    className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-[28px] focus:ring-4 focus:ring-primary/10 shadow-sm outline-none transition-all text-lg font-medium placeholder:text-outline-variant/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4">Contraseña</label>
                <div className="relative group">
                   <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors h-5 w-5" />
                   <input 
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-[28px] focus:ring-4 focus:ring-primary/10 shadow-sm outline-none transition-all text-lg font-medium placeholder:text-outline-variant/30"
                  />
                </div>
              </div>

              <div className="pt-4">
                 <button className="w-full py-6 bg-gradient-to-br from-primary to-primary-fixed-dim text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all group flex items-center justify-center gap-4">
                    Registrarme ahora
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>

              <div className="flex items-center gap-3 px-4 pt-4">
                <ShieldCheck className="h-5 w-5 text-secondary shrink-0" />
                <p className="text-[10px] text-on-surface-variant/60 font-medium leading-relaxed">
                  Al registrarte, aceptas nuestros <Link href="#" className="font-black text-primary underline underline-offset-2">Términos</Link>.
                </p>
              </div>
           </form>
        </section>
      </main>

      <footer className="mt-20 flex flex-col items-center gap-6 pb-20">
        <p className="text-on-surface-variant font-medium text-sm">
           ¿Ya tenés una cuenta?{" "}
           <Link href="/login" className="text-primary font-black uppercase tracking-widest text-xs hover:underline decoration-2">
             Iniciá sesión
           </Link>
        </p>
      </footer>
    </div>
  );
}
