"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Heart,
  Flower
} from "lucide-react";
import { useState } from "react";
import { usePlatformStore } from "@/lib/store/usePlatformStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const { setCurrentUser } = usePlatformStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication logic
    if (email === "admin@admin.com") {
      setCurrentUser({
        id: "admin-1",
        name: "Super Admin",
        email: "admin@admin.com",
        role: "superadmin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
      });
      router.push("/admin/verificaciones");
    } else if (email === "refugio@test.com") {
      setCurrentUser({
        id: "shelter-1",
        name: "Santuario Colas Doradas",
        email: "refugio@test.com",
        role: "refugio",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shelter"
      });
      router.push("/refugio/dashboard");
    } else {
      // Default as adopter
      setCurrentUser({
        id: "user-1",
        name: "Léa Ramon",
        email: email || "user@test.com",
        role: "adoptante",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lea"
      });
      router.push("/feed");
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-secondary-container/10 rounded-full blur-[120px]" />
      
      <main className="w-full max-w-md relative z-10 space-y-10">
        
        {/* Brand Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-container/30 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-32 h-32 rounded-[32px] overflow-hidden shadow-2xl shadow-primary/20 rotate-[-3deg] hover:rotate-0 transition-transform duration-700">
               <Image 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2680&auto=format&fit=crop" 
                alt="Brand Logo" 
                fill 
                className="object-cover"
               />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-plus-jakarta font-black text-4xl tracking-tighter text-primary">Hola Compa</h1>
            <p className="text-on-surface-variant font-medium opacity-60">Bienvenido de nuevo</p>
          </div>
        </motion.div>

        {/* Login Form Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-[48px] p-10 shadow-2xl shadow-primary/5 border border-outline-variant/10"
        >
          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-4" htmlFor="email">Correo electrónico</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors h-5 w-5" />
                <input 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-surface-container-low/40 border-none rounded-[28px] focus:ring-4 focus:ring-primary/10 focus:bg-white outline-none transition-all text-lg font-medium placeholder:text-outline-variant/30"
                  placeholder="admin@admin.com"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40" htmlFor="password">Contraseña</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors h-5 w-5" />
                <input 
                  id="password" 
                  className="w-full pl-16 pr-16 py-5 bg-surface-container-low/40 border-none rounded-[28px] focus:ring-4 focus:ring-primary/10 focus:bg-white outline-none transition-all text-lg font-medium placeholder:text-outline-variant/30"
                  placeholder="Cualquier clave"
                  type={showPassword ? "text" : "password"}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button className="w-full py-6 bg-gradient-to-br from-primary to-primary-fixed-dim text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all group">
              Iniciar Sesión
              <ArrowRight className="inline-block ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/30 italic">Tip: usá admin@admin.com</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-on-surface-variant font-medium text-sm">
            ¿No tenés una cuenta?{" "}
            <Link href="/registro" className="text-primary font-black uppercase tracking-widest text-xs hover:underline decoration-2">
              Registrate gratis
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
