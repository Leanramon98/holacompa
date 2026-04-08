"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Users, 
  Store, 
  Dog, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Resumen", href: "/admin", icon: LayoutDashboard },
  { name: "Verificaciones", href: "/admin/verificaciones", icon: ShieldCheck, badge: "5" },
  { name: "Usuarios", href: "/admin/usuarios", icon: Users },
  { name: "Refugios", href: "/admin/refugios", icon: Dog },
  { name: "Vendedores", href: "/admin/vendedores", icon: Store },
  { name: "Postulaciones", href: "/admin/postulaciones", icon: FileText },
  { name: "Métricas", href: "/admin/metricas", icon: BarChart3 },
  { name: "Configuración", href: "/admin/configuracion", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-on-surface transition-all duration-500 z-50 overflow-hidden",
        sidebarOpen ? "w-72" : "w-20"
      )}>
        <div className="flex flex-col h-full py-8">
          {/* Logo Section */}
          <div className="px-6 mb-12 flex items-center gap-4">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                <span className="text-white font-black text-xl italic font-plus-jakarta">H</span>
             </div>
             <div className={cn("transition-opacity duration-300", sidebarOpen ? "opacity-100" : "opacity-0")}>
                <h2 className="text-white font-black text-lg tracking-tighter uppercase leading-none">SuperAdmin</h2>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-1">Portal Central</p>
             </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-2xl group transition-all duration-300",
                    isActive 
                      ? "bg-primary text-white shadow-xl shadow-primary/20" 
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive && "text-white")} />
                  <span className={cn(
                    "font-bold text-sm tracking-tight transition-all duration-300 whitespace-nowrap",
                    sidebarOpen ? "opacity-100" : "opacity-0 invisible w-0"
                  )}>
                    {item.name}
                  </span>
                  {item.badge && sidebarOpen && (
                    <span className="ml-auto bg-error text-white text-[9px] font-black px-2 py-1 rounded-full">
                       {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Sidebar */}
          <div className="px-4 mt-auto">
             <button className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-white/40 hover:bg-error/10 hover:text-error transition-all group">
                <LogOut className="h-5 w-5 shrink-0 group-hover:rotate-12 transition-transform" />
                <span className={cn(
                  "font-bold text-sm whitespace-nowrap",
                  sidebarOpen ? "opacity-100" : "opacity-0 invisible w-0"
                )}>Salir del Portal</span>
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn(
        "transition-all duration-500 min-h-screen",
        sidebarOpen ? "pl-72" : "pl-20"
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#FDFCFB]/80 backdrop-blur-xl border-b border-black/5 h-24 flex items-center px-10 justify-between">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center hover:bg-surface-container transition-all"
              >
                {sidebarOpen ? <Menu className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              <div className="relative hidden md:block">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/40" />
                 <input 
                   type="text" 
                   placeholder="Buscar en la plataforma..."
                   className="pl-12 pr-6 py-3 bg-white border border-black/5 rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-medium text-sm w-80 transition-all focus:w-96"
                 />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <button className="relative w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                 <Bell className="h-5 w-5 text-on-surface-variant" />
                 <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-error rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-4 bg-white p-1.5 pr-6 rounded-2xl border border-black/5 shadow-sm">
                 <div className="w-10 h-10 rounded-xl overflow-hidden shadow-inner">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop" className="object-cover w-full h-full" alt="Admin" />
                 </div>
                 <div className="hidden lg:block">
                    <p className="font-bold text-xs leading-none">Lea Super</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary mt-1">Developer Admin</p>
                 </div>
              </div>
           </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-10 font-be-vietnam">
          {children}
        </main>
      </div>
    </div>
  );
}
