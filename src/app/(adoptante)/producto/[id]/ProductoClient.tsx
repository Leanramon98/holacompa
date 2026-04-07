"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Store, 
  Truck, 
  ShieldCheck, 
  Share2, 
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

import { mockProducts } from "@/lib/mock-data/mock-products";
import { mockVendors } from "@/lib/mock-data/mock-vendors";
import { ProductCard } from "@/components/adoptante/product-card";
import { cn } from "@/lib/utils";

export function ProductoClient({ id }: { id: string }) {
  const router = useRouter();
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const product = useMemo(() => {
    return mockProducts.find(p => p.id === id);
  }, [id]);

  const vendor = useMemo(() => {
    return product ? mockVendors.find(v => v.profile_id === product.vendor_id) : null;
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return mockProducts
      .filter(p => p.category_id === product.category_id && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">¡Ups! No encontramos este producto.</h1>
        <Button onClick={() => router.push("/marketplace")}>Volver al marketplace</Button>
      </div>
    );
  }

  const hasDiscount = product.promo_price && product.promo_price < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.promo_price!) / product.price) * 100)
    : 0;

  const handleVerEnTiendaSelect = () => {
    if (product.contact_link) {
      window.open(product.contact_link, "_blank");
    } else if (vendor?.whatsapp) {
      window.open(`https://wa.me/${vendor.whatsapp.replace(/\+/g, "")}?text=Hola! Me interesa el producto: ${product.title}`, "_blank");
    } else {
      // Fallback a un link de whatsapp genérico si no hay nada
      alert("Redirigiendo a la tienda del vendedor...");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-20">
      {/* Navbar mobile fix */}
      <div className="sticky top-0 z-20 bg-white border-b px-4 py-3 flex items-center justify-between sm:hidden">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <span className="font-bold text-sm truncate max-w-[200px]">{product.title}</span>
        <Button variant="ghost" size="icon">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 sm:pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-sm">
            <Image
              src={product.photos[selectedPhoto]}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            {hasDiscount && (
              <Badge className="absolute top-4 left-4 bg-primary text-white font-bold px-3 py-1.5 text-sm">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {product.photos.map((photo, idx) => (
              <button
                key={idx}
                className={cn(
                  "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white",
                  selectedPhoto === idx ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"
                )}
                onClick={() => setSelectedPhoto(idx)}
              >
                <Image src={photo} alt={`${product.title} ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Desktop Vendor Card (under gallery) */}
          <Card className="hidden md:block rounded-3xl border-none shadow-sm bg-white mt-8">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                   <img 
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${vendor?.business_name}`} 
                    alt={vendor?.business_name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{vendor?.business_name || "Vendedor Verificado"}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-yellow-500 text-xs font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      4.9 (420 calificaciones)
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/20 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Vendedor Pro
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/20 p-3 rounded-xl">
                  <MessageSquare className="w-4 h-4 text-blue-500" /> Responde rápido
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-2xl border-primary text-primary font-bold hover:bg-primary/5"
                onClick={() => router.push(`/tienda/${vendor?.profile_id}`)}
              >
                Visitar tienda
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{product.brand}</span>
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black leading-tight">{product.title}</h1>
            <div className="flex items-center gap-1.5 pt-1 text-yellow-500">
               <div className="flex items-center">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
               </div>
               <span className="text-xs font-bold text-muted-foreground ml-1">(15 reseñas)</span>
            </div>
          </div>

          <div className="space-y-1">
            {hasDiscount ? (
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-foreground">
                    ${product.promo_price?.toLocaleString("es-AR")}
                  </span>
                  <span className="text-lg text-muted-foreground line-through font-medium">
                    ${product.price.toLocaleString("es-AR")}
                  </span>
                </div>
                <p className="text-emerald-600 font-bold text-sm bg-emerald-50 w-fit px-3 py-1 rounded-full uppercase tracking-tighter">
                  Ahorrás ${(product.price - product.promo_price!).toLocaleString()}
                </p>
              </div>
            ) : (
              <span className="text-4xl font-black text-foreground">
                ${product.price.toLocaleString("es-AR")}
              </span>
            )}
          </div>

          {/* Delivery & Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-y border-muted-foreground/10">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold">Envío en el día</p>
                <p className="text-xs text-muted-foreground">Comprando antes de las 14:00hs en AMBA.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold">Compra protegida</p>
                <p className="text-xs text-muted-foreground">Vendedores verificados por Hola Compa.</p>
              </div>
            </div>
          </div>

          {/* Variants Placeholder */}
          {product.variants && (
            <div className="space-y-4">
              <h4 className="font-bold">Elegí una opción</h4>
              <div className="flex flex-wrap gap-3">
                 {/* This would be dynamic based on product.variants */}
                 {["S", "M", "L"].map(size => (
                   <button key={size} className="px-6 py-2.5 rounded-xl border-2 border-muted hover:border-primary transition-all font-bold text-sm">
                     {size}
                   </button>
                 ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="flex flex-col gap-3 pt-4 sm:pt-6">
            <Button 
                onClick={handleVerEnTiendaSelect}
                className="h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all w-full flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" /> Ver en la tienda
            </Button>
            <p className="text-[11px] text-center text-muted-foreground italic px-4 font-medium">
              Te redireccionamos al sitio oficial del vendedor para completar la compra de forma segura.
            </p>
          </div>

          <Separator className="bg-muted-foreground/10" />

          {/* Mobile Vendor Card (if screen < md) */}
          <div className="block md:hidden">
            <h4 className="font-bold mb-4">Información del vendedor</h4>
            <Card className="rounded-3xl border-none shadow-sm bg-white">
                <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted shrink-0 flex items-center justify-center border border-white shadow-sm overflow-hidden">
                    <img 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${vendor?.business_name}`} 
                        alt={vendor?.business_name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-sm truncate">{vendor?.business_name || "Vendedor Verificado"}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-bold">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        4.9 (420 calificaciones)
                    </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl border-primary text-primary h-9" onClick={() => router.push(`/tienda/${vendor?.profile_id}`)}>
                    Ver tienda
                </Button>
                </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="descripcion" className="w-full pb-8">
            <TabsList className="w-full grid grid-cols-2 bg-muted/20 p-1 h-12 rounded-xl">
              <TabsTrigger value="descripcion" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Descripción</TabsTrigger>
              <TabsTrigger value="especificaciones" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Ficha técnica</TabsTrigger>
            </TabsList>
            <TabsContent value="descripcion" className="py-6 animate-in slide-in-from-bottom-2 duration-300">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  {product.description}
                </p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="especificaciones" className="py-6 animate-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {[
                        { label: "Marca", value: product.brand },
                        { label: "Mascota", value: product.pet_types.join(", ") },
                        { label: "Tamaño recomendado", value: product.recommended_size || "Todos" },
                        { label: "Estado", value: product.status === "activo" ? "Nuevo" : product.status },
                        { label: "Stock disponible", value: product.stock > 0 ? "Sí" : "Sin stock" },
                        { label: "SKU", value: product.sku || "N/A" }
                    ].map((spec, i) => (
                        <div key={i} className="flex flex-col border-b border-muted py-2">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{spec.label}</span>
                            <span className="text-sm font-semibold capitalize">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 mt-16 sm:mt-24 space-y-8">
        <div className="space-y-1">
            <div className="w-12 h-1 bg-primary rounded-full mb-2" />
            <h3 className="text-2xl font-black text-foreground">También te puede interesar</h3>
            <p className="text-muted-foreground font-medium text-sm">Completá el setup para tu compa.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard 
                key={p.id} 
                product={p} 
                vendor={mockVendors.find(v => v.profile_id === p.vendor_id)}
            />
          ))}
        </div>
      </section>

      {/* Main Back Button Floating (Desktop) */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-8 left-8 hidden lg:flex rounded-full h-12 w-12 bg-white shadow-lg border-none hover:bg-white hover:scale-110 transition-all z-30"
        onClick={() => router.push("/marketplace")}
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </Button>
    </div>
  );
}
