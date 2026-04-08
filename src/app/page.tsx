"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  ArrowRight, 
  Search, 
  MessageSquare, 
  Home, 
  ShieldCheck, 
  Star,
  Zap,
  Award,
  Users,
  Sparkles,
  ShoppingBag,
  MapPin,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdoptionStore } from "@/stores/useAdoptionStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";
import { useRef } from "react";

export default function LandingPage() {
  const { pets } = useAdoptionStore();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Tomamos solo las mascotas destacadas
  const featuredPets = pets.slice(0, 3);

  return (
    <HydrationZustand>
      <div className="min-h-screen bg-background font-be-vietnam overflow-x-hidden selection:bg-primary selection:text-white">
        
        {/* Navbar Premium con Glassmorphism */}
        <header className="fixed top-0 w-full z-[100] transition-all duration-500">
          <div className="container mx-auto px-6 h-24 flex justify-between items-center">
            <div className="flex items-center gap-4 bg-white/40 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
               <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-[-8deg]">
                <Heart className="text-white h-5 w-5 fill-white" />
              </div>
              <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface">Hola Compa</h1>
            </div>

            <nav className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-3xl px-2 py-2 rounded-full border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
              {["Explorar", "Adoptar", "Marketplace"].map((item) => (
                <Link 
                  key={item} 
                  href={item === "Explorar" ? "/descubrir" : item === "Marketplace" ? "/marketplace" : "#"} 
                  className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary hover:bg-white rounded-full transition-all"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 bg-white/40 backdrop-blur-3xl px-4 py-2 rounded-full border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
              <Link href="/login" className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface hover:text-primary transition-all">
                Ingresar
              </Link>
              <Link href="/registro" className="px-8 py-3 bg-on-surface text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                Empezar
              </Link>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section Masterpiece */}
          <section ref={targetRef} className="relative min-h-screen flex items-center pt-32 pb-40 px-6 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[80%] aspect-square bg-[#fff8ef] rounded-full blur-[180px] -z-20 opacity-60" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] aspect-square bg-primary/5 rounded-full blur-[150px] -z-20" />
            
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div style={{ opacity, scale, y }} className="space-y-12 relative z-10">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-xl shadow-black/[0.02]">
                  <Sparkles className="h-4 w-4" />
                  La nueva era de la adopción animal
                </div>

                <h2 className="font-plus-jakarta text-7xl md:text-[110px] font-black text-on-surface tracking-tighter leading-[0.85]">
                  Menos jaulas, <br />
                  <span className="italic text-primary relative inline-block">
                    más hogar.
                    <motion.div 
                      className="absolute -bottom-4 left-0 w-full h-8 bg-primary/10 rounded-full -skew-x-12 -z-10"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                  </span>
                </h2>

                <p className="text-2xl text-on-surface-variant font-medium opacity-60 max-w-xl leading-relaxed">
                  Conectamos corazones y transformamos vidas. Una plataforma curada donde tu nuevo mejor amigo te está esperando.
                </p>

                <div className="flex flex-col sm:flex-row gap-8 pt-4">
                  <Link href="/registro" className="px-12 py-8 bg-primary text-white rounded-[40px] font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-4 group h-fit">
                    Quiero Adoptar
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-3 transition-transform" />
                  </Link>
                  <Link href="/marketplace" className="px-12 py-8 bg-white border border-black/5 text-on-surface rounded-[40px] font-black uppercase tracking-[0.25em] text-xs hover:bg-surface-container transition-all flex items-center justify-center gap-4 shadow-xl shadow-black/[0.02]">
                    <ShoppingBag className="h-5 w-5" />
                    Marketplace
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 100, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="relative aspect-[4/5] w-full rounded-[100px] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.1)] group">
                  <Image 
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2574&auto=format&fit=crop"
                    alt="Hero"
                    fill
                    priority
                    className="object-cover group-hover:scale-110 transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  {/* Floating Elements on Image */}
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 -left-12 bg-white p-8 rounded-[48px] shadow-2xl border border-black/5 hidden md:block"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-secondary-container rounded-3xl flex items-center justify-center text-primary">
                        <Users className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="font-plus-jakarta font-black text-2xl tracking-tight">500+</p>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Refugios Aliados</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Compas - Real Data from Store */}
          <section className="py-40 bg-surface-container-low/20 overflow-hidden">
            <div className="container mx-auto px-6 space-y-20">
              <div className="flex flex-col md:flex-row items-end justify-between gap-10 max-w-6xl mx-auto">
                <div className="space-y-6">
                  <h3 className="font-plus-jakarta font-black text-[10px] uppercase tracking-[0.5em] text-primary">Historias en espera</h3>
                  <h2 className="font-plus-jakarta text-6xl md:text-8xl font-black tracking-tighter text-on-surface leading-[0.9]">Tus posibles <span className="italic text-secondary">Compas.</span></h2>
                </div>
                <Link href="/descubrir" className="flex items-center gap-4 text-xs font-black uppercase tracking-widest hover:text-primary transition-all group">
                  Ver todos los perfiles
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {featuredPets.map((pet, idx) => (
                  <motion.div 
                    key={pet.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <Link href={`/mascota/${pet.id}`} className="group block relative aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                      <Image src={pet.photos[0]} alt={pet.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-10 left-10 text-white">
                        <div className="flex items-center gap-3 mb-2">
                           <MapPin className="h-4 w-4 text-primary" />
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Cerca de ti</span>
                        </div>
                        <h4 className="font-plus-jakarta font-black text-4xl tracking-tighter">{pet.name}</h4>
                        <p className="text-sm font-medium opacity-60">{pet.breed} • {pet.estimated_age_months} meses</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Bento Grid Features */}
          <section className="py-40 container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-8 h-auto md:h-[800px]">
              <div className="md:col-span-8 bg-surface-container-high/30 rounded-[64px] p-16 flex flex-col justify-between border border-black/[0.02] group overflow-hidden relative">
                <div className="space-y-6 relative z-10">
                  <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Search className="h-10 w-10" />
                  </div>
                  <h3 className="font-plus-jakarta text-5xl font-black tracking-tight leading-none text-on-surface">Match <br />Inteligente.</h3>
                  <p className="max-w-md text-xl font-medium opacity-40">Nuestra IA analiza tu estilo de vida, energía y espacio para conectarte con el compañero que nació para estar con vos.</p>
                </div>
                <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] opacity-10 group-hover:opacity-20 transition-opacity">
                   <Zap className="w-full h-full fill-current" />
                </div>
              </div>

              <div className="md:col-span-4 bg-on-surface rounded-[64px] p-12 flex flex-col justify-end text-white relative overflow-hidden group">
                 <div className="space-y-4">
                    <ShieldCheck className="h-12 w-12 text-primary" />
                    <h3 className="font-plus-jakarta text-4xl font-black tracking-tighter">100% Verificados.</h3>
                    <p className="text-lg opacity-60">Solo refugios certificados con estándares oficiales.</p>
                 </div>
                 <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              </div>

              <div className="md:col-span-4 bg-[#fff8ef] rounded-[64px] p-12 flex flex-col justify-between border border-primary/5 group">
                <Award className="h-12 w-12 text-primary group-hover:rotate-12 transition-transform" />
                <div className="space-y-4">
                   <h3 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Experiencia Premium.</h3>
                   <p className="text-lg opacity-40 font-medium text-on-surface-variant">Un viaje de adopción diseñado al detalle.</p>
                </div>
              </div>

              <div className="md:col-span-8 bg-secondary-container/30 rounded-[64px] p-16 flex items-center gap-16 border border-black/[0.02] group relative overflow-hidden">
                <div className="flex-1 space-y-6 relative z-10">
                  <h3 className="font-plus-jakarta text-5xl font-black tracking-tight leading-none">Marketplace Solidario.</h3>
                  <p className="max-w-xs text-lg font-medium opacity-40">Cada compra ayuda a financiar refugios con el 10% de ganancia neta.</p>
                  <Link href="/marketplace" className="inline-block px-10 py-5 bg-on-surface text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">Explorar Tienda</Link>
                </div>
                <div className="w-1/2 aspect-square relative hidden lg:block">
                   <ShoppingBag className="w-full h-full text-secondary opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Splash Premium */}
          <section className="px-6 pb-40">
            <div className="container mx-auto bg-primary text-white rounded-[100px] overflow-hidden flex flex-col lg:flex-row items-center relative shadow-[0_80px_120px_-40px_rgba(131,84,0,0.5)] group">
               <div className="p-20 lg:p-40 flex-1 space-y-12 relative z-10">
                  <h2 className="font-plus-jakarta text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] transition-transform duration-1000 group-hover:translate-x-4">
                     El futuro <br />es <span className="italic">juntos.</span>
                  </h2>
                  <p className="text-2xl font-medium opacity-80 max-w-md leading-relaxed">
                     Forma parte de la comunidad que está reinventando la forma en que amamos a nuestras mascotas.
                  </p>
                  <Link href="/registro" className="inline-flex items-center gap-6 px-16 py-8 bg-white text-primary rounded-full font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:scale-110 active:scale-95 transition-all">
                     Crea tu cuenta gratis
                     <ArrowRight className="h-5 w-5" />
                  </Link>
               </div>
               
               <div className="w-full lg:w-1/2 aspect-[4/5] lg:aspect-auto self-stretch relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"
                    alt="Adopt"
                    fill
                    className="object-cover lg:scale-110 transition-transform duration-[5s] group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/30 to-transparent" />
                  
                  {/* Glass Card on CTA */}
                  <div className="absolute bottom-20 right-20 hidden xl:block p-10 bg-white/10 backdrop-blur-2xl rounded-[48px] border border-white/20 shadow-2xl max-w-[300px] animate-bounce">
                     <p className="text-3xl font-black font-plus-jakarta tracking-tighter mb-2">"Cambió mi vida para siempre"</p>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60">— El testimonio de Lea</p>
                  </div>
               </div>
            </div>
          </section>

        </main>

        <footer className="bg-white py-40 px-6 border-t border-black/5">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Heart className="text-white h-6 w-6 fill-white" />
                </div>
                <h1 className="font-plus-jakarta font-black text-3xl tracking-tighter text-on-surface">Hola Compa</h1>
              </div>
              <p className="text-2xl text-on-surface-variant font-medium opacity-40 leading-relaxed max-w-sm">
                Transformando la adopción en una experiencia de lujo y amor mutuo.
              </p>
            </div>
            
            <div className="space-y-8">
               <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Plataforma</h4>
               <nav className="flex flex-col gap-4">
                  {["Descubrir", "Refugios", "Marketplace", "Verificaciones"].map(l => (
                    <Link key={l} href="#" className="text-lg font-black text-on-surface/60 hover:text-primary transition-colors">{l}</Link>
                  ))}
               </nav>
            </div>

            <div className="space-y-8">
               <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Legal</h4>
               <nav className="flex flex-col gap-4">
                  {["Privacidad", "Términos", "Sustentabilidad"].map(l => (
                    <Link key={l} href="#" className="text-lg font-black text-on-surface/60 hover:text-primary transition-colors">{l}</Link>
                  ))}
               </nav>
            </div>
          </div>
          <div className="container mx-auto pt-40 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-black/5 mt-20">
             <p className="text-[10px] font-black uppercase tracking-widest opacity-20">© 2024 Hola Compa System. Hecho con amor.</p>
             <div className="flex gap-10">
                {["Instagram", "Twitter", "LinkedIn"].map(s => (
                  <span key={s} className="text-[10px] font-black uppercase tracking-widest opacity-20 cursor-pointer hover:opacity-100 transition-opacity">{s}</span>
                ))}
             </div>
          </div>
        </footer>
      </div>
    </HydrationZustand>
  );
}
