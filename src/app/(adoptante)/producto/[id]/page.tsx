import Image from "next/image";
import Link from "next/link";
import { mockProducts } from "@/lib/mock-data/mock-products";

export async function generateStaticParams() {
   return mockProducts.map(p => ({ id: p.id }));
}

import { 
  ArrowLeft, 
  Heart, 
  Star, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  RotateCcw, 
  Truck, 
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { getProductById, getProducts } from "@/lib/data/products";
import { getVendorById } from "@/lib/data/vendors";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const currentProduct = product!;
  const vendor = await getVendorById(currentProduct.vendor_id);
  
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter(p => p.id !== currentProduct.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background font-be-vietnam pb-32">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/marketplace" className="flex items-center gap-2 text-on-surface-variant font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Market
          </Link>
          <div className="flex items-center gap-4">
             <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container active:scale-90 transition-all text-primary">
              <Heart className="h-5 w-5" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container active:scale-90 transition-all">
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Gallery Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden bg-surface-container-low shadow-2xl shadow-primary/5 group">
              <Image 
                src={currentProduct.photos[0] || "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2680&auto=format&fit=crop"} 
                alt={currentProduct.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute top-8 left-8">
                <span className="bg-primary/90 backdrop-blur-xl text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                  Top Artisan
                </span>
              </div>
            </div>

            {/* Thumbnails Bento */}
            <div className="grid grid-cols-4 gap-6 h-32 md:h-40">
              {currentProduct.photos.slice(0, 4).map((img, idx) => (
                <div key={idx} className={cn(
                  "relative rounded-3xl overflow-hidden cursor-pointer hover:ring-4 ring-primary ring-offset-4 ring-offset-background transition-all",
                  idx === 0 ? "ring-4" : "opacity-60"
                )}>
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </div>
              ))}
              {currentProduct.photos.length < 4 && (
                <div className="bg-surface-container-high rounded-3xl flex items-center justify-center border-2 border-dashed border-outline-variant/30">
                  <Star className="text-outline-variant h-6 w-6" />
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary font-black uppercase tracking-[0.2em] text-[10px]">
                <Star className="h-3 w-3 fill-secondary" />
                <span>4.9 (120 reseñas)</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-plus-jakarta font-black text-on-surface tracking-tighter leading-none">
                {currentProduct.title}
              </h1>
              <div className="flex items-center gap-6 pt-2">
                <span className="text-4xl font-plus-jakarta font-black text-primary tracking-tight">
                  ${currentProduct.price}
                </span>
                {currentProduct.promo_price && (
                   <span className="text-2xl text-on-surface-variant line-through opacity-40 font-bold decoration-2">
                    ${currentProduct.promo_price}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-on-surface-variant font-medium text-lg leading-relaxed opacity-80">
                {currentProduct.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                  <ShieldCheck className="h-4 w-4 text-secondary" />
                  Garantía de Vida
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                  <Zap className="h-4 w-4 text-secondary" />
                  Sustentable
                </div>
              </div>
            </div>

            {/* Seller Quick View */}
            {vendor && (
               <Link href={`/tienda/${vendor.business_name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "")}`} className="group p-8 rounded-[40px] bg-surface-container-low flex items-center justify-between hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-outline-variant/10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                    <Image src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2660&auto=format&fit=crop" fill alt={vendor.business_name} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-plus-jakarta font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">{vendor.business_name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">{vendor.categories[0]} • 4.9 Rating</p>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-primary group-hover:translate-x-3 transition-transform" />
              </Link>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-4">
              <button className="w-full py-6 rounded-[32px] bg-gradient-to-br from-primary to-primary-fixed-dim text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95">
                Comprar Ahora
              </button>
              <button className="w-full py-6 rounded-[32px] bg-surface-container-highest/50 backdrop-blur-md text-on-surface font-black uppercase tracking-[0.2em] text-xs hover:bg-surface-container-highest transition-all active:scale-95 border border-outline-variant/10">
                Agregar al Carrito
              </button>
            </div>

            {/* Trust Footer */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-outline-variant/10">
              <div className="flex flex-col items-center text-center gap-2 text-on-surface-variant/40 group hover:text-primary transition-colors">
                <Truck className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Envío <br/> Rápido</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-on-surface-variant/40 group hover:text-primary transition-colors">
                <ShieldCheck className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Pago <br/> Seguro</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-on-surface-variant/40 group hover:text-primary transition-colors">
                <RotateCcw className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Devolución <br/> Fácil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-32 space-y-10">
           <div className="flex justify-between items-end">
            <div>
              <h2 className="font-plus-jakarta text-4xl font-black text-on-surface tracking-tighter">Completá el look</h2>
              <p className="text-on-surface-variant font-medium text-lg opacity-60">Recomendaciones curadas para tu compa</p>
            </div>
            <Link href="/marketplace" className="group flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
              Ver colección completa
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/producto/${item.id}`} className="group space-y-4">
                <div className="aspect-square rounded-[40px] overflow-hidden bg-surface-container shadow-xl shadow-black/5 relative">
                  <Image 
                    src={item.photos[0] || "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2671&auto=format&fit=crop"} 
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-2">
                  <h4 className="font-plus-jakarta font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="font-plus-jakarta font-extrabold text-primary">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
