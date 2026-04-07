import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, PawPrint, Search, MessageCircle, Home, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-be-vietnam">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden px-6 md:px-12 py-12 md:py-20 mt-20">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10 space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-secondary-container rounded-full text-on-secondary-container font-bold text-sm uppercase tracking-widest">
              <Heart className="h-4 w-4 fill-on-secondary-container" />
              <span>10,000+ mascotas adoptadas</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-on-background leading-[1] tracking-tighter font-plus-jakarta">
              Encuentra a tu <span className="text-primary italic">mejor amigo</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl leading-relaxed font-medium">
              Curamos la conexión perfecta entre tú y tu futuro compañero. Una experiencia premium de adopción diseñada para corazones grandes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link href="/descubrir">
                <Button className="px-10 py-8 bg-primary text-on-primary rounded-full font-black text-xl shadow-2xl hover:shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 group border-none uppercase tracking-widest">
                  Explorar
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link href="/refugios">
                <Button variant="ghost" className="px-10 py-8 bg-surface-container-high text-primary rounded-full font-black text-xl hover:bg-surface-container-highest transition-all active:scale-95 uppercase tracking-widest">
                  Ver refugios
                </Button>
              </Link>
            </div>
          </div>

          {/* Asymmetric Hero Image Decor */}
          <div className="relative group lg:block">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-tertiary-container/40 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary-container/30 rounded-full blur-[120px] animate-pulse" />
            
            <div className="relative bg-surface-container-low rounded-[40px] overflow-visible p-6 rotate-2 group-hover:rotate-0 transition-all duration-1000 shadow-2xl">
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-inner -translate-y-12 translate-x-6 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-1000">
                <Image 
                  alt="Happy Dog" 
                  className="object-cover"
                  fill
                  priority
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2000&auto=format&fit=crop"
                />
              </div>
              
              {/* Floating Match Card */}
              <div className="absolute bottom-20 -left-12 md:-left-20 bg-white/90 backdrop-blur-xl p-8 rounded-[24px] shadow-[0_32px_64px_-16px_rgba(131,84,0,0.15)] max-w-xs border border-white/40 animate-in fade-in zoom-in duration-700 delay-500">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center shadow-lg">
                    <PawPrint className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-black text-on-surface text-lg leading-tight">Curación Experta</p>
                    <p className="text-sm text-on-surface-variant font-medium">Match basado en tu vida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="bg-surface-container-low/50 py-24 px-6 md:px-12 border-y border-outline-variant/10">
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "Adoptados", value: "10k+" },
            { label: "Refugios", value: "500+" },
            { label: "Soporte", value: "24/7" },
            { label: "Verificados", value: "100%" }
          ].map((stat) => (
            <div key={stat.label} className="text-center space-y-3 group hover:-translate-y-2 transition-transform">
              <p className="text-5xl md:text-6xl font-black text-primary font-plus-jakarta tracking-tighter">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] font-black text-on-surface-variant opacity-60 group-hover:opacity-100 transition-opacity">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 md:px-12 container mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-5xl md:text-7xl font-black font-plus-jakarta tracking-tighter leading-tight">Tu camino hacia un nuevo comienzo</h2>
            <p className="text-xl text-on-surface-variant font-medium leading-relaxed">Hacemos que el proceso de adopción sea tan gratificante como el primer día que traes a casa a tu mascota.</p>
          </div>
          <div className="hidden md:block">
            <Sparkles className="h-32 w-32 text-surface-container-highest opacity-30 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: "1",
              title: "Busca y Descubre",
              desc: "Filtra por personalidad, tamaño y energía para encontrar los perfiles que mejor encajan contigo.",
              icon: <Search className="h-10 w-10" />,
              bg: "bg-primary-container",
              hoverBg: "hover:bg-primary-container/40"
            },
            {
              step: "2",
              title: "Conecta y Conoce",
              desc: "Habla directamente con los refugios y programa una visita para conocer a tu futuro compañero en persona.",
              icon: <MessageCircle className="h-10 w-10" />,
              bg: "bg-secondary-container",
              hoverBg: "hover:bg-secondary-container/40"
            },
            {
              step: "3",
              title: "Bienvenido a Casa",
              desc: "Completa el proceso legal digitalmente y prepárate para una vida llena de alegría y compañía.",
              icon: <Home className="h-10 w-10" />,
              bg: "bg-tertiary-container",
              hoverBg: "hover:bg-tertiary-container/40"
            }
          ].map((item) => (
            <div key={item.step} className={`group p-12 rounded-[48px] bg-white border border-outline-variant/10 ${item.hoverBg} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}>
              <div className={`w-20 h-20 ${item.bg} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-black/5`}>
                <div className="text-on-surface font-black">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-3xl font-black mb-6 font-plus-jakarta tracking-tight">{item.step}. {item.title}</h3>
              <p className="text-on-surface-variant font-medium leading-relaxed text-lg opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 md:px-12 py-32">
        <div className="container mx-auto bg-on-surface text-background rounded-[64px] overflow-hidden flex flex-col md:flex-row items-center shadow-2xl relative">
          <div className="p-16 md:p-24 flex-1 space-y-10 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black font-plus-jakarta tracking-tighter leading-none">¿Listo para cambiar una vida?</h2>
            <p className="text-xl md:text-2xl font-medium opacity-60 max-w-xl">Únete a nuestra comunidad y recibe alertas personalizadas de mascotas que buscan un hogar cerca de ti.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <input 
                className="bg-white/10 border border-white/10 rounded-full px-8 py-5 flex-1 focus:outline-none focus:ring-2 focus:ring-primary text-xl" 
                placeholder="Tu correo electrónico" 
                type="email"
              />
              <Button className="bg-primary-container text-primary px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform border-none uppercase tracking-widest h-auto">
                Suscribirme
              </Button>
            </div>
          </div>
          <div className="hidden lg:block w-2/5 self-stretch relative overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1548191265-cc086780820f?q=80&w=2000&auto=format&fit=crop" 
              alt="Cat and Human" 
              className="object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-on-surface via-transparent opacity-40" />
          </div>
          {/* Decorative Text */}
          <div className="absolute -bottom-10 -right-10 text-white/5 text-[200px] font-black pointer-events-none select-none -rotate-12 uppercase">Compa</div>
        </div>
      </section>
    </div>
  );
}
