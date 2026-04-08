"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  Mail, 
  PlusCircle, 
  ShoppingBag,
  Heart,
  ShoppingCart,
  ChevronRight,
  BadgeCheck,
  TrendingUp,
  Zap,
  Cookie,
  Target,
  Gamepad2,
  AlertCircle
} from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Product, Vendor } from "@/types";
import { usePlatformStore } from "@/lib/store/usePlatformStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";
import { useMemo } from "react";

export default function TiendaProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { vendors, products } = usePlatformStore();

  const vendor = useMemo(() => {
    return vendors.find(v => 
      v.business_name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "") === slug
    );
  }, [vendors, slug]);

  if (!vendor) return null;

  const vendorProducts = products.filter((p: Product) => p.vendor_profile_id === vendor.profile_id);
  const isVerified = vendor.verification_status === 'approved';

  const categories = [
    { name: "Novedades", icon: <Zap className="h-4 w-4" />, color: "bg-secondary-container" },
    { name: "Más Vendidos", icon: <TrendingUp className="h-4 w-4" />, color: "bg-surface-container-high" },
    { name: "Snacks", icon: <Cookie className="h-4 w-4" />, color: "bg-surface-container-high" },
    { name: "Accesorios", icon: <Target className="h-4 w-4" />, color: "bg-surface-container-high" },
    { name: "Juguetes", icon: <Gamepad2 className="h-4 w-4" />, color: "bg-surface-container-high" },
  ];

  return (
    <HydrationZustand>
      <div className="bg-surface font-be-vietnam text-on-surface min-h-screen">
        {/* TopAppBar */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10">
          <div className="flex justify-between items-center px-6 py-4 w-full max-w-screen-xl mx-auto">
            <div className="flex items-center gap-4">
              <Link href="/marketplace" className="hover:bg-primary/5 transition-colors p-2 rounded-full active:scale-90">
                <ArrowLeft className="h-6 w-6 text-primary" />
              </Link>
              <h1 className="font-plus-jakarta font-black text-xl text-primary tracking-tighter">Marketplace Compa</h1>
            </div>
            <button className="hover:bg-primary/5 transition-colors p-2 rounded-full active:scale-90">
              <Share2 className="h-5 w-5 text-primary" />
            </button>
          </div>
        </nav>

        <main className="pt-16 pb-32">
          {/* Hero Section */}
          <section className="relative w-full h-64 md:h-[400px] overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2671&auto=format&fit=crop" 
              alt="Store Cover"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
          </section>

          {/* Store Profile Card */}
          <div className="container mx-auto px-6 -mt-24 md:-mt-32 relative z-10">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_32px_64px_rgba(32,27,15,0.08)] border border-outline-variant/10">
              <div className="flex flex-col md:flex-row md:items-end gap-10">
                <div className="relative group/logo">
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-[40px] border-[12px] border-white overflow-hidden bg-surface-container shadow-2xl relative">
                    <Image 
                      src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=2664&auto=format&fit=crop" 
                      alt={vendor.business_name}
                      fill
                      className="object-cover group-hover/logo:scale-110 transition-transform duration-700"
                    />
                  </div>
                  {isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-secondary-container text-on-secondary-container p-2 rounded-full shadow-lg border-4 border-white">
                      <BadgeCheck className="h-6 w-6" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-4xl md:text-6xl font-plus-jakarta font-black text-on-surface tracking-tighter leading-none">
                      {vendor.business_name}
                    </h2>
                    {isVerified ? (
                      <span className="bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-secondary/20">
                        Vendedor Verificado
                      </span>
                    ) : (
                      <span className="bg-surface-container-highest text-on-surface-variant/40 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-outline-variant/10 flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        Validación Pendiente
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("h-5 w-5", isVerified ? "text-primary fill-primary" : "text-on-surface-variant/20")} />
                      ))}
                    </div>
                    <span className="text-sm font-black text-on-surface">{isVerified ? "4.8" : "0.0"}</span>
                  </div>
                </div>
              </div>

              <p className="mt-10 text-on-surface-variant font-medium text-lg leading-relaxed max-w-3xl opacity-80">
                {vendor.description || "Premium products for your best friends. Shipping nationwide."}
              </p>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary text-white py-5 px-8 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95">
                  <Mail className="h-4 w-4" />
                  Enviar Mensaje
                </button>
                <button className="flex-1 bg-primary-container text-on-primary-container py-5 px-8 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-primary-fixed-dim transition-all active:scale-95">
                  <PlusCircle className="h-4 w-4" />
                  Seguir Tienda
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <section className="container mx-auto px-6 mt-24">
            <div className="flex items-center gap-4 mb-12">
               <div className="h-[2px] w-12 bg-primary/20" />
               <h3 className="text-4xl font-plus-jakarta font-black tracking-tighter">Colección Destacada</h3>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {vendorProducts.map((product: Product) => (
                <Link 
                  href={`/producto/${product.id}`}
                  key={product.id} 
                  className="group relative bg-white rounded-[32px] p-4 pb-8 transition-all hover:shadow-[0_20px_40px_rgba(32,27,15,0.06)] border border-outline-variant/5"
                >
                  <div className="aspect-square rounded-[24px] overflow-hidden mb-6 relative shadow-inner bg-surface-container-low">
                    <Image 
                      src={product.photos[0] || "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2680&auto=format&fit=crop"} 
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-2 space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">
                      {product.brand}
                    </p>
                    <h4 className="font-plus-jakarta font-black text-on-surface text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h4>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-2xl font-black text-on-surface tracking-tighter">
                        ${product.price.toLocaleString()}
                      </span>
                      <button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-110 transition-all active:scale-90">
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </HydrationZustand>
  );
}
