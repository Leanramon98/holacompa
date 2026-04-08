"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  TrendingUp, 
  Download, 
  ArrowUpRight, 
  Heart, 
  Calendar, 
  Filter,
  CreditCard,
  Plus,
  ArrowDownCircle,
  PiggyBank
} from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  { id: 1, donor: "Anónimo", amount: 5000, date: "Hoy, 14:30", type: "Unica", icon: <Heart className="h-4 w-4" />, color: "text-primary" },
  { id: 2, donor: "Carlos M.", amount: 2500, date: "Ayer", type: "Mensual", icon: <PiggyBank className="h-4 w-4" />, color: "text-secondary" },
  { id: 3, donor: "Refugio Fan #1", amount: 15000, date: "4 Abr", type: "Especial", icon: <TrendingUp className="h-4 w-4" />, color: "text-tertiary" },
  { id: 4, donor: "Lucía Gomez", amount: 3000, date: "3 Abr", type: "Unica", icon: <Heart className="h-4 w-4" />, color: "text-primary" },
];

export default function ShelterDonationsPage() {
  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <Link href="/refugio/dashboard" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
                <ArrowLeft className="h-5 w-5" />
             </Link>
             <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface uppercase">Donaciones</h1>
          </div>
          <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
             <Download className="h-5 w-5 text-on-surface-variant" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 space-y-12 max-w-5xl">
        
        {/* Main Balance Bento Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 bg-on-surface p-12 rounded-[60px] text-background relative overflow-hidden shadow-2xl shadow-on-surface/20">
              <div className="relative z-10 space-y-10">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Fondos Recaudados</p>
                       <p className="font-plus-jakarta text-6xl font-black tracking-tighter">$245.800</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-xl border border-white/5 flex items-center gap-3">
                       <TrendingUp className="h-5 w-5 text-secondary" />
                       <span className="font-black text-xs">+15% este mes</span>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Donantes Activos</p>
                       <p className="text-3xl font-black">128</p>
                    </div>
                    <div className="space-y-1 text-right">
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Meta Mensual</p>
                       <div className="flex flex-col items-end gap-2">
                          <p className="text-3xl font-black">$300k</p>
                          <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-secondary w-[82%] rounded-full shadow-[0_0_10px_rgba(var(--secondary),0.5)]" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Decorative Blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-[80px]" />
           </div>

           {/* Linked Card / Action Column */}
           <div className="lg:col-span-4 bg-primary p-12 rounded-[56px] text-white flex flex-col justify-between shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <div className="space-y-2 relative z-10">
                 <CreditCard className="h-10 w-10 opacity-40" />
                 <h3 className="font-plus-jakarta text-2xl font-black tracking-tight">Vincular Cobro</h3>
                 <p className="text-sm font-medium opacity-60 leading-relaxed">Conecta tu cuenta de Mercado Pago para recibir fondos al instante.</p>
              </div>
              <button className="w-full bg-white text-primary py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 flex items-center justify-center gap-3 mt-8">
                 <Plus className="h-4 w-4" />
                 Nueva Conexión
              </button>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mb-10 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
           </div>
        </section>

        {/* Transactions History */}
        <section className="space-y-8">
           <div className="flex justify-between items-end">
              <h3 className="font-plus-jakarta text-3xl font-black text-on-surface tracking-tight">Historial de Aportes</h3>
              <div className="flex gap-4">
                 <button className="w-12 h-12 rounded-full border border-outline-variant/10 flex items-center justify-center hover:bg-white transition-all shadow-sm">
                    <Filter className="h-5 w-5 text-on-surface-variant/40" />
                 </button>
                 <button className="w-12 h-12 rounded-full border border-outline-variant/10 flex items-center justify-center hover:bg-white transition-all shadow-sm">
                    <Calendar className="h-5 w-5 text-on-surface-variant/40" />
                 </button>
              </div>
           </div>

           <div className="space-y-4">
              {transactions.map((t) => (
                <div key={t.id} className="bg-white p-8 rounded-[40px] border border-outline-variant/10 shadow-sm flex items-center justify-between group hover:translate-x-2 transition-all duration-700">
                   <div className="flex items-center gap-6">
                      <div className={cn("w-14 h-14 rounded-2xl bg-surface-container-low/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-black/[0.01]", t.color)}>
                         {t.icon}
                      </div>
                      <div className="space-y-1">
                         <h4 className="font-bold text-on-surface text-lg tracking-tight">{t.donor}</h4>
                         <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{t.type} • {t.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-plus-jakarta text-2xl font-black text-on-surface tracking-tighter">+ ${t.amount.toLocaleString()}</p>
                      <span className="text-[9px] font-black uppercase tracking-widest text-secondary flex items-center justify-end gap-1">
                         Completada
                         <ArrowUpRight className="h-3 w-3" />
                      </span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Impact Message */}
        <div className="bg-secondary-container/20 p-12 rounded-[60px] border border-secondary/10 flex flex-col md:flex-row items-center gap-10">
           <div className="w-24 h-24 bg-white rounded-[32px] shadow-2xl flex items-center justify-center text-secondary rotate-3 shrink-0">
              <ArrowDownCircle className="h-12 w-12" />
           </div>
           <div className="space-y-3">
              <h4 className="font-plus-jakarta text-2xl font-black text-on-secondary-container tracking-tight">Tu impacto en números</h4>
              <p className="text-on-surface-variant font-medium leading-relaxed opacity-60">
                Las donaciones de este mes permitieron cubrir 4 cirugías de alta complejidad y asegurar 200kg de alimento premium para los recién llegados.
              </p>
           </div>
        </div>

      </main>
    </div>
  );
}
