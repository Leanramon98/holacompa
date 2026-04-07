import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, ShieldCheck, ShoppingCart, ArrowRight, Star, Rocket, Sparkles } from "lucide-react";
import { getPets } from "@/lib/data/pets";
import { getShelters } from "@/lib/data/shelters";
import { getProducts } from "@/lib/data/products";

export default async function HomePage() {
  const [pets, shelters, products] = await Promise.all([
    getPets({ status: "disponible" }),
    getShelters(),
    getProducts({ status: "activo" }),
  ]);

  const featuredShelters = shelters.slice(0, 3);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-24 pb-24 bg-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 font-black text-xs uppercase tracking-[0.2em] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Heart className="h-4 w-4 fill-primary" />
            +500 mascotas con nuevo hogar
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-on-surface leading-[0.9] mb-10 max-w-5xl tracking-tighter">
            Encontrá a tu próximo <span className="text-primary italic font-serif">mejor amigo</span>
          </h1>
          <p className="text-xl text-on-surface/60 max-w-2xl mb-14 leading-relaxed font-medium">
            Adoptar es un acto de amor que cambia vidas. Te conectamos con refugios verificados para que encuentres a tu compañero ideal de forma segura y transparente.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/descubrir">
              <Button className="rounded-full editorial-gradient text-white font-black px-12 py-8 text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border-none">
                Empezar a buscar
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="ghost" className="rounded-full text-on-surface font-black px-12 py-8 text-lg hover:bg-surface-container transition-all uppercase tracking-widest">
                Marketplace
              </Button>
            </Link>
          </div>
        </div>
        {/* Abstract Background Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      </section>

      {/* How it works (Editorial Grid) */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-12 rounded-[40px] bg-surface-container-low border border-outline-variant/10 transition-all hover:shadow-2xl hover:-translate-y-2 group">
            <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <Search className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">1. Buscá</h3>
            <p className="text-on-surface/60 font-medium leading-relaxed">Usá nuestro buscador con filtros inteligentes para encontrar mascotas que se adapten a tu estilo de vida.</p>
          </div>
          <div className="flex flex-col items-center text-center p-12 rounded-[40px] bg-surface-container-low border border-outline-variant/10 transition-all hover:shadow-2xl hover:-translate-y-2 group">
            <div className="h-20 w-20 rounded-3xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
              <Star className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">2. Conocé</h3>
            <p className="text-on-surface/60 font-medium leading-relaxed">Chateá directamente con los refugios, conocé la historia de cada mascota y coordiná una visita.</p>
          </div>
          <div className="flex flex-col items-center text-center p-12 rounded-[40px] bg-surface-container-low border border-outline-variant/10 transition-all hover:shadow-2xl hover:-translate-y-2 group">
            <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <Rocket className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">3. Adoptá</h3>
            <p className="text-on-surface/60 font-medium leading-relaxed">Completá la postulación segura, recibí el kit de bienvenida y empezá una nueva etapa con tu mejor amigo.</p>
          </div>
        </div>
      </section>

      {/* Featured Shelters */}
      <section className="bg-surface-container-low/50 py-32 border-y border-outline-variant/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tighter">Refugios verificados</h2>
              <p className="text-on-surface/60 text-lg font-medium">Trabajamos codo a codo con organizaciones comprometidas y transparentes.</p>
            </div>
            <Link href="/refugios" className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
              Ver todos <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredShelters.map((shelter) => (
              <Card key={shelter.profile_id} className="rounded-[32px] border-none shadow-sm overflow-hidden transition-all hover:shadow-2xl group bg-white p-2">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="h-20 w-20 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary/40 overflow-hidden border border-outline-variant/10 text-3xl font-black">
                      {shelter.shelter_name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-black text-on-surface tracking-tight">{shelter.shelter_name}</CardTitle>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full mt-2 uppercase tracking-[0.1em]">
                        <ShieldCheck className="h-3 w-3" /> Verificado
                      </span>
                    </div>
                  </div>
                  <p className="text-md text-on-surface/60 italic font-medium leading-relaxed opacity-80">
                    "{shelter.description}"
                  </p>
                </CardHeader>
                <CardFooter className="px-8 pb-8 pt-0 flex items-center justify-between">
                  <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">{shelter.approximate_rescues_per_year} rescates / año</span>
                  <Link href={`/refugio/${shelter.profile_id}`}>
                    <Button variant="outline" className="rounded-full border-outline-variant/20 text-on-surface hover:bg-primary hover:text-white transition-all text-xs font-black uppercase tracking-widest h-11 px-8">
                      Ver perfil
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Marketplace */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tighter">Marketplace <span className="font-serif italic text-primary">Compas</span></h2>
            <p className="text-on-surface/60 text-lg font-medium">Todo lo que necesitás para que tu mascota viva como un rey.</p>
          </div>
          <Link href="/marketplace" className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
            Ver tienda <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div className="relative aspect-square rounded-[32px] overflow-hidden bg-surface-container-low mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <Image
                  src={product.photos[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110 duration-700"
                />
                {product.promo_price && (
                  <div className="absolute top-4 right-4 bg-secondary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Oferta
                  </div>
                )}
              </div>
              <div className="px-2 space-y-2">
                <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mb-1">{product.brand}</p>
                <h4 className="font-bold text-lg text-on-surface leading-tight line-clamp-1 mb-2 group-hover:text-primary transition-colors">{product.title}</h4>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-black text-primary">
                    ${(product.promo_price || product.price).toLocaleString('es-AR')}
                  </span>
                  {product.promo_price && (
                    <span className="text-xs text-on-surface-variant line-through opacity-40">
                      ${product.price.toLocaleString('es-AR')}
                    </span>
                  )}
                </div>
                <Link href={`/producto/${product.id}`}>
                   <Button className="w-full rounded-2xl bg-surface-container-highest text-on-surface hover:bg-primary hover:text-white font-black transition-all h-12 uppercase text-[10px] tracking-widest border-none">
                     Ver Detalle
                   </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 mt-12 mb-12">
        <div className="editorial-gradient rounded-[60px] p-16 md:p-24 relative overflow-hidden text-center text-white shadow-[0_40px_80px_-20px_rgba(0,103,126,0.4)]">
          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
            <Sparkles className="w-12 h-12 mb-8 animate-pulse text-white/50" />
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[0.95] tracking-tighter">
              ¿Listo para darle una nueva oportunidad a un compa?
            </h2>
            <p className="text-xl text-white/70 mb-12 font-medium max-w-xl">
              Sumate a nuestra comunidad de más de 10.000 amantes de los animales en toda la Argentina.
            </p>
            <Link href="/descubrir">
              <Button className="rounded-full bg-white text-primary hover:bg-white/90 font-black h-16 px-16 text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border-none">
                Quiero empezar ya
              </Button>
            </Link>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 text-white/5 text-[240px] font-black pointer-events-none select-none rotate-12">🐾</div>
          <div className="absolute bottom-10 right-10 text-white/5 text-[240px] font-black pointer-events-none select-none -rotate-12">🐾</div>
        </div>
      </section>
    </div>
  );
}
