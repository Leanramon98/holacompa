"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, Vendor } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  vendor?: Vendor;
  className?: string;
}

export function ProductCard({ product, vendor, className }: ProductCardProps) {
  const hasDiscount = product.promo_price && product.promo_price < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.promo_price!) / product.price) * 100)
    : 0;

  return (
    <Link href={`/producto/${product.id}`} className="block group">
      <Card
        className={cn(
          "overflow-hidden border-none shadow-sm group-hover:shadow-md transition-all duration-300 bg-white",
          className
        )}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.photos[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-primary text-white font-bold animate-in fade-in zoom-in duration-300">
              {discountPercentage}% OFF
            </Badge>
          )}
          {product.status === "agotado" && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm font-bold uppercase">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-3 space-y-1">
          <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">
            {product.brand}
          </p>
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px] text-foreground group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-2 pt-1">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-foreground">
                  ${product.promo_price?.toLocaleString("es-AR")}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  ${product.price.toLocaleString("es-AR")}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-foreground">
                ${product.price.toLocaleString("es-AR")}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-3 pt-0 flex items-center justify-between border-t border-muted/50 mt-1">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="text-[10px] text-muted-foreground truncate italic">
              Vendido por{" "}
              <span className="font-semibold text-foreground not-italic">
                {vendor?.business_name || "Vendedor verificado"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-yellow-500 shrink-0">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-bold">4.8</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
