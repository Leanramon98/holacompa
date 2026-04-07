import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Heart, ArrowRight, Star, Tag, Utensils, Bone, Shirt, Cross, ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "@/lib/data/products";

export default async function MarketplacePage() {
  const products = await getProducts({ status: "activo" });
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background font-be-vietnam pb-32 mt-20">
      <main className="px-6 container mx-auto space-y-20">
        
        {/* Marketplace Hero */}
        <section className="relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl group mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2000&auto=format&fit=crop" 
            alt="Marketplace Hero" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
          />
          <div className="relative z-20 h-full flex flex-col justify-center px-12 md:px-20 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white font-black text-xs uppercase tracking-widest border border-white/20">
              <Star className="h-3 w-3 fill-white" />
              <span>Selección Curada</span>
            </div>
            <h2 className="text-white font-plus-jakarta text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
              El placer de <br/> <span className="italic text-primary-container">jugar.</span>
            </h2>
            <p className="text-white/80 font-medium text-lg md:text-xl leading-relaxed max-w-md">
              Descubrí nuestra colección exclusiva de juguetes orgánicos diseñados para la durabilidad y la diversión.
            </p>
            <div className="pt-6">
              <Button className="bg-white text-primary px-10 py-8 rounded-full font-black text-xl shadow-2xl hover:scale-105 transition-all active:scale-95 border-none uppercase tracking-widest h-auto">
                Ver Colección
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="space-y-10">
          <div className="flex justify-between items-end">
            <h3 className="font-plus-jakarta text-3xl md:text-4xl font-black tracking-tight">Categorías</h3>
            <Button variant="link" className="text-primary font-black uppercase tracking-widest text-sm p-0 h-auto">
              Ver Todo <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Alimento", icon: <Utensils className="h-8 w-8" />, bg: "bg-surface-container-low", iconBg: "bg-primary-container" },
              { name: "Juguetes", icon: <Bone className="h-8 w-8" />, bg: "bg-secondary-container", iconBg: "bg-secondary-fixed" },
              { name: "Accesorios", icon: <Shirt className="h-8 w-8" />, bg: "bg-tertiary-container", iconBg: "bg-tertiary-fixed" },
              { name: "Salud", icon: <Cross className="h-8 w-8" />, bg: "bg-surface-container-high", iconBg: "bg-surface-container-highest" },
            ].map((cat) => (
              <div key={cat.name} className={`${cat.bg} p-10 rounded-[32px] flex flex-col items-center text-center space-y-6 transition-all hover:scale-105 hover:shadow-xl cursor-pointer group`}>
                <div className={`${cat.iconBg} w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                  <div className="text-on-surface">
                    {cat.icon}
                  </div>
                </div>
                <span className="font-plus-jakarta font-black text-xl text-on-surface tracking-tight uppercase tracking-widest text-sm opacity-60 group-hover:opacity-100">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bento Deals */}
        <section className="space-y-10">
          <h3 className="font-plus-jakarta text-3xl md:text-4xl font-black tracking-tight">Ofertas del Mes</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Big Deal Card */}
            <div className="lg:col-span-2 relative group overflow-hidden rounded-[40px] bg-surface-container-low min-h-[400px] border border-outline-variant/10">
              <div className="absolute inset-0 p-12 flex flex-col justify-between z-20">
                <div className="space-y-6">
                  <span className="bg-error text-on-error px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">40% OFF</span>
                  <h4 className="font-plus-jakarta text-4xl md:text-6xl font-black text-primary tracking-tighter leading-none mt-6">Power Pack <br/> Nutricional</h4>
                  <p className="text-on-surface-variant/70 font-medium max-w-sm text-lg md:text-xl">Kibble orgánico de carne premium con omega-3 enriquecido.</p>
                </div>
                <Button className="bg-primary text-on-primary w-fit px-10 py-6 rounded-full font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all h-auto border-none">Aprovechar Oferta</Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-2/3 opacity-30 lg:opacity-100">
                <Image 
                  src="https://images.unsplash.com/photo-1589924691106-03c004be59bc?q=80&w=2000&auto=format&fit=crop" 
                  alt="Deal" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 origin-right"
                />
              </div>
            </div>

            {/* Small Deal 1 */}
            <div className="bg-secondary-container/30 rounded-[40px] p-10 flex flex-col justify-between group overflow-hidden relative border border-secondary-container/20">
              <div className="z-10 space-y-4">
                <span className="text-secondary font-black text-sm uppercase tracking-widest opacity-60">Ahorrá $1.500</span>
                <h4 className="font-plus-jakarta text-3xl font-black text-on-secondary-container tracking-tight leading-none">Correa Smart 2.0</h4>
              </div>
              <div className="relative w-40 h-40 self-end mt-4">
                <Image 
                  src="https://images.unsplash.com/photo-1601758124277-f0084ed67035?q=80&w=1000&auto=format&fit=crop" 
                  alt="Leash" 
                  fill 
                  className="object-cover rounded-full group-hover:rotate-12 transition-transform duration-700 shadow-2xl"
                />
              </div>
              <Button variant="outline" className="z-10 mt-8 bg-white/40 backdrop-blur-md text-secondary font-black py-6 rounded-full border-secondary/20 uppercase tracking-widest text-[10px] h-auto hover:bg-secondary hover:text-white transition-all">Agregar al carrito</Button>
            </div>
          </div>
        </section>

        {/* Featured Products Carousel Style */}
        <section className="space-y-10">
          <div className="flex justify-between items-center">
            <h3 className="font-plus-jakarta text-3xl md:text-4xl font-black tracking-tight">Esenciales Destacados</h3>
            <div className="flex gap-3">
              <button className="w-14 h-14 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-all active:scale-90">
                <ChevronLeft className="h-6 w-6 text-on-surface" />
              </button>
              <button className="w-14 h-14 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-all active:scale-90">
                <ChevronRight className="h-6 w-6 text-on-surface" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group space-y-6">
                <div className="aspect-[4/5] bg-surface-container-highest rounded-[32px] overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-700">
                  <Image 
                    src={product.photos[0]} 
                    alt={product.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <button className="absolute bottom-6 right-6 bg-white p-5 rounded-3xl shadow-2xl opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary hover:text-white">
                    <ShoppingCart className="h-6 w-6" />
                  </button>
                  {product.promo_price && (
                    <div className="absolute top-6 left-6 bg-secondary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Oferta</div>
                  )}
                </div>
                <div className="space-y-2 px-2">
                  <h5 className="font-plus-jakarta font-black text-2xl tracking-tight text-on-surface leading-tight group-hover:text-primary transition-colors">{product.title}</h5>
                  <p className="text-on-surface-variant/60 font-medium text-sm line-clamp-1">{product.description || "Calidad premium para tu mascota"}</p>
                  <div className="flex items-baseline gap-3 pt-2">
                    <p className="font-plus-jakarta font-black text-2xl text-primary">${(product.promo_price || product.price).toLocaleString('es-AR')}</p>
                    {product.promo_price && (
                      <p className="text-on-surface-variant/30 line-through text-sm font-bold">${product.price.toLocaleString('es-AR')}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
