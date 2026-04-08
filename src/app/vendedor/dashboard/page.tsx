"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  PlusCircle, 
  Bell, 
  Search, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign,
  Layers,
  Settings,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Ventas del Mes", value: "$84.200", icon: <DollarSign className="h-5 w-5" />, color: "bg-secondary-container text-on-secondary-container" },
  { label: "Pedidos Pendientes", value: "8", icon: <Clock className="h-5 w-5" />, color: "bg-primary-container text-on-primary-container" },
  { label: "Productos Activos", value: "24", icon: <Package className="h-5 w-5" />, color: "bg-tertiary-container text-on-tertiary-container" },
  { label: "Visitas Tienda", value: "1.2k", icon: <TrendingUp className="h-5 w-5" />, color: "bg-surface-container-highest/50 text-on-surface" },
];

const recentSales = [
  { id: 1, product: "Cama Ortopédica XL", customer: "Marina Soler", amount: 12500, date: "Hace 15 min", status: "Pendiente", image: "https://images.unsplash.com/photo-1591946614421-1dbf52d430c6?q=80&w=2670&auto=format&fit=crop" },
  { id: 2, product: "Combo Juguetes Premium", customer: "Pablo Neruda", amount: 4500, date: "Hoy, 09:12", status: "Enviado", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2670&auto=format&fit=crop" },
  { id: 3, product: "Alimento Gatos 10kg", customer: "Elena Gil", amount: 8900, date: "Ayer", status: "Completado", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=2671&auto=format&fit=crop" },
];

export default function VendorDashboardPage() {
  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-on-surface text-background rounded-2xl flex items-center justify-center shadow-lg">
              <Store className="h-5 w-5" />
            </div>
            <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface uppercase">Dashboard Vendedor</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all relative">
              <Bell className="h-5 w-5 text-on-surface-variant" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10">
              <Image 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" 
                alt="Vendor Admin" 
                width={40} 
                height={40} 
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 space-y-12 max-w-6xl">
        
        {/* Intro Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
           <div className="space-y-1">
              <h2 className="font-plus-jakarta text-5xl font-black tracking-tighter text-on-surface">¡Buenas ventas!</h2>
              <p className="text-on-surface-variant font-medium opacity-60">Tu tienda está rindiendo un 12% mejor que el mes pasado.</p>
           </div>
           <Link href="/vendedor/productos/publicar" className="px-8 py-4 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              <PlusCircle className="h-4 w-4" />
              Publicar Producto
           </Link>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat) => (
             <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-outline-variant/10 shadow-sm space-y-4 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm", stat.color)}>
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black text-on-surface tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{stat.label}</p>
                </div>
             </div>
           ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Recent Sales Column */}
           <section className="lg:col-span-8 space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="font-plus-jakarta text-3xl font-black text-on-surface tracking-tight">Ventas Recientes</h3>
                <Link href="/vendedor/ventas" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-8">Ver Todas</Link>
              </div>

              <div className="space-y-4">
                 {recentSales.map((sale) => (
                   <div key={sale.id} className="bg-white p-6 rounded-[32px] border border-outline-variant/10 shadow-sm flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                         <Image src={sale.image} alt={sale.product} width={64} height={64} className="object-cover h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                           <h4 className="font-bold text-on-surface text-lg tracking-tight truncate">{sale.product}</h4>
                           <p className="font-black text-on-surface-variant text-sm">$ {sale.amount.toLocaleString()}</p>
                        </div>
                        <p className="text-on-surface-variant/60 font-medium text-sm">Comprado por {sale.customer} • {sale.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className={cn(
                           "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest h-fit",
                           sale.status === "Pendiente" ? "bg-primary-container text-on-primary-container" : 
                           sale.status === "Enviado" ? "bg-secondary-container text-on-secondary-container" :
                           "bg-surface-container-high text-on-surface-variant/40"
                         )}>
                           {sale.status}
                         </span>
                         <button className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-on-surface-variant hover:bg-on-surface hover:text-white transition-all">
                            <ChevronRight className="h-5 w-5" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           {/* Quick Actions / Marketing */}
           <section className="lg:col-span-4 space-y-8">
              <h3 className="font-plus-jakarta text-2xl font-black text-on-surface tracking-tight">Gestionar Tienda</h3>
              <div className="grid grid-cols-1 gap-4">
                 {[
                   { label: "Mis Productos", icon: <Package className="h-5 w-5" />, href: "/vendedor/productos" },
                   { label: "Análisis de Ventas", icon: <BarChart3 className="h-5 w-5" />, href: "/vendedor/analitica" },
                   { label: "Configurar Tienda", icon: <Settings className="h-5 w-5" />, href: "/vendedor/perfil" },
                 ].map((action) => (
                   <Link 
                     key={action.label} 
                     href={action.href}
                     className="bg-surface-container-low/40 p-6 rounded-[32px] border border-transparent hover:border-on-surface/10 hover:bg-white transition-all flex items-center justify-between group"
                   >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[14px] bg-white shadow-sm flex items-center justify-center text-on-surface group-hover:scale-110 transition-transform">
                          {action.icon}
                        </div>
                        <span className="font-bold text-on-surface-variant">{action.label}</span>
                     </div>
                     <ChevronRight className="h-5 w-5 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-on-surface" />
                   </Link>
                 ))}
              </div>

              {/* Marketing Promotion Card */}
              <div className="bg-on-surface p-10 rounded-[48px] text-background space-y-6 shadow-2xl shadow-on-surface/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                 <CheckCircle2 className="h-10 w-10 text-secondary" />
                 <div className="space-y-2">
                    <h4 className="font-plus-jakarta text-2xl font-black leading-tight tracking-tight">Vendedor Destacado</h4>
                    <p className="text-sm font-medium opacity-60 leading-relaxed">Tus envíos a tiempo te han ganado la insignia de confianza este mes.</p>
                 </div>
                 <button className="w-full bg-secondary text-on-secondary py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                    Ver beneficios VIP
                 </button>
              </div>
           </section>

        </div>

      </main>
    </div>
  );
}
