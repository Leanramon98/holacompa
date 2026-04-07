import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, ShieldCheck, ShoppingCart, ArrowRight, Star } from "lucide-react";
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
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Heart className="h-4 w-4 fill-primary" />
            +500 mascotas encontraron su hogar
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-marron leading-tight mb-8 max-w-4xl tracking-tight">
            Encontrá a tu próximo <span className="text-primary italic">mejor amigo</span>
          </h1>
          <p className="text-xl text-marron/70 max-w-2xl mb-12 leading-relaxed">
            Adoptar es un acto de amor que cambia vidas. Te conectamos con refugios verificados para que encuentres a tu compañero ideal de forma segura y transparente.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/descubrir">
              <Button className="rounded-full bg-primary hover:bg-primary-dark text-white font-bold px-10 py-8 text-lg shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
                Empezar a buscar
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="ghost" className="rounded-full text-marron font-bold px-10 py-8 text-lg hover:bg-white/50">
                Ver marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-marron/5 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-marron mb-4">1. Buscá</h3>
            <p className="text-marron/60">Usá nuestro buscador con filtros inteligentes para encontrar mascotas que se adapten a tu estilo de vida.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-marron/5 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-marron mb-4">2. Conocé</h3>
            <p className="text-marron/60">Chateá directamente con los refugios, conocé la historia de cada mascota y coordiná una visita.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-marron/5 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-marron mb-4">3. Adoptá</h3>
            <p className="text-marron/60">Completá la postulación segura, recibí el kit de bienvenida y empezá una nueva etapa con tu mejor amigo.</p>
          </div>
        </div>
      </section>

      {/* Featured Shelters */}
      <section className="bg-white/30 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-marron mb-4 tracking-tight">Refugios verificados</h2>
              <p className="text-marron/60">Trabajamos codo a codo con organizaciones comprometidas y transparentes.</p>
            </div>
            <Link href="/refugios" className="flex items-center gap-2 text-primary font-bold hover:underline">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredShelters.map((shelter) => (
              <Card key={shelter.profile_id} className="rounded-3xl border-none shadow-md overflow-hidden transition-all hover:shadow-xl group">
                <div className="h-3 bg-primary" />
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-2xl bg-crema-dark flex items-center justify-center text-marron/20 overflow-hidden border border-marron/10">
                      {shelter.shelter_name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-extrabold text-marron">{shelter.shelter_name}</CardTitle>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 uppercase tracking-wider">
                        <ShieldCheck className="h-3 w-3" /> Verificado
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-marron/60 italic font-nunito-sans leading-relaxed">
                    "{shelter.description}"
                  </p>
                </CardHeader>
                <CardFooter className="px-8 pb-8 pt-0 flex items-center justify-between">
                  <span className="text-xs font-bold text-marron/40 uppercase tracking-widest">{shelter.approximate_rescues_per_year} rescates/año</span>
                  <Link href={`/refugio/${shelter.profile_id}`}>
                    <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold h-10 px-6">
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
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-marron mb-4 tracking-tight">Marketplace destacada</h2>
            <p className="text-marron/60">Todo lo que necesitás para que tu mascota viva como un rey.</p>
          </div>
          <Link href="/marketplace" className="flex items-center gap-2 text-primary font-bold hover:underline">
            Ver tienda <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="rounded-2xl border-none shadow-sm group hover:shadow-lg transition-all">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4">
                <Image
                  src={product.photos[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                />
                {product.promo_price && (
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
                    OFERTA
                  </div>
                )}
              </div>
              <CardContent className="px-4 pb-0">
                <p className="text-xs text-marron/40 font-bold uppercase mb-1">{product.brand}</p>
                <h4 className="font-bold text-marron line-clamp-1 mb-2">{product.title}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-marron">
                    ${(product.promo_price || product.price).toLocaleString('es-AR')}
                  </span>
                  {product.promo_price && (
                    <span className="text-xs text-marron/40 line-through">
                      ${product.price.toLocaleString('es-AR')}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-4 pb-4 pt-4">
                <Button className="w-full rounded-xl bg-crema-dark text-marron hover:bg-primary hover:text-white font-bold transition-all h-9">
                  <ShoppingCart className="h-4 w-4 mr-2" /> Comprar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Final */}
      <section className="container mx-auto px-4 mt-12">
        <div className="bg-primary rounded-3xl p-12 md:p-24 relative overflow-hidden text-center text-white">
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
              ¿Listo para darle una nueva oportunidad a un compa?
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Sumate a nuestra comunidad de más de 10.000 amantes de los animales en toda la Argentina.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="w-full h-14 px-6 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 font-extrabold h-14 px-12 text-lg shadow-xl shadow-white/10">
                Quiero sumarme
              </Button>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 text-white/5 text-9xl font-extrabold pointer-events-none select-none">🐾</div>
          <div className="absolute bottom-10 right-10 text-white/5 text-9xl font-extrabold pointer-events-none select-none">🐾</div>
        </div>
      </section>
    </div>
  );
}
