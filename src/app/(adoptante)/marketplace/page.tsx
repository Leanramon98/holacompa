"use client";

import { useMemo, useEffect } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronRight, 
  ShoppingBag, 
  Bone, 
  Truck, 
  Stethoscope, 
  Bath, 
  Gamepad2, 
  Bed, 
  Store,
  X,
  ArrowUpDown,
  Flame
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

import { mockProducts } from "@/lib/mock-data/mock-products";
import { mockVendors } from "@/lib/mock-data/mock-vendors";
import { ProductCard } from "@/components/adoptante/product-card";
import { useMarketplaceStore } from "@/stores/marketplace-store";
import { cn } from "@/lib/utils";

// Mock categories with icons
const categoriesList = [
  { id: "cat-1", name: "Alimento", icon: Bone, color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: "cat-2", name: "Accesorios", icon: ShoppingBag, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: "cat-4", name: "Juguetes", icon: Gamepad2, color: "bg-purple-100 text-purple-600 border-purple-200" },
  { id: "cat-5", name: "Higiene", icon: Bath, color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
  { id: "cat-6", name: "Salud", icon: Stethoscope, color: "bg-red-100 text-red-600 border-red-200" },
  { id: "cat-3", name: "Camas", icon: Bed, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { id: "cat-7", name: "Transporte", icon: Truck, color: "bg-slate-100 text-slate-600 border-slate-200" },
];

export default function MarketplacePage() {
  const { 
    filters, 
    setFilter, 
    resetFilters, 
    isFilterDrawerOpen, 
    toggleFilterDrawer 
  } = useMarketplaceStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter("searchQuery", e.target.value);
  };

  const handleCategoryClick = (catId: string) => {
    if (filters.category === catId) {
      setFilter("category", null);
    } else {
      setFilter("category", catId);
    }
  };

  const isFiltering = filters.searchQuery || filters.category || filters.petType || filters.priceRange[1] < 500000;

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Search Query
      if (filters.searchQuery && !product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) && !product.brand.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      // Category
      if (filters.category && product.category_id !== filters.category) {
        return false;
      }
      // Pet Type
      if (filters.petType && !product.pet_types.includes(filters.petType as any)) {
        return false;
      }
      // Price Range
      if (product.price > filters.priceRange[1]) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price_asc") return a.price - b.price;
      if (filters.sortBy === "price_desc") return b.price - a.price;
      if (filters.sortBy === "best_seller") return b.views_count - a.views_count;
      return 0;
    });
  }, [filters]);

  const featuredProducts = useMemo(() => {
    return mockProducts.filter(p => ["prod-1", "prod-4", "prod-11", "prod-14"].includes(p.id));
  }, []);

  const bestSellers = useMemo(() => {
    return [...mockProducts]
      .sort((a, b) => b.views_count - a.views_count)
      .slice(0, 4);
  }, []);

  const featuredVendors = useMemo(() => {
    return mockVendors.filter(v => ["vendor-1", "vendor-2", "vendor-5"].includes(v.profile_id));
  }, []);

  const activeFiltersCount = [
    filters.category, 
    filters.petType, 
    filters.searchQuery, 
    filters.priceRange[1] < 500000
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-20">
      {/* Search Header */}
      <section className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-10 px-4 py-4 space-y-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="¿Qué estás buscando para tu compa?" 
              className="pl-12 h-14 bg-muted/30 border-none rounded-2xl focus-visible:ring-primary shadow-inner text-base font-medium"
              value={filters.searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <Sheet open={isFilterDrawerOpen} onOpenChange={toggleFilterDrawer}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-muted/50 bg-[#FFFBF7] shadow-sm flex-shrink-0 relative">
                <SlidersHorizontal className="w-5 h-5" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:max-w-md bg-[#FFFBF7] p-0 flex flex-col">
              <SheetHeader className="p-6 border-b bg-white">
                <SheetTitle className="text-2xl font-black flex items-center gap-2">
                  <SlidersHorizontal className="w-6 h-6 text-primary" />
                  Filtrar productos
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-10">
                {/* Pet Type */}
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground">¿Para quién?</h4>
                  <div className="flex flex-wrap gap-2">
                    {['perro', 'gato', 'conejo', 'otro'].map((type) => (
                      <Badge 
                        key={type}
                        variant={filters.petType === type ? "default" : "outline"}
                        className={cn(
                          "px-6 py-2.5 rounded-xl cursor-not-allowed select-none transition-all text-sm font-bold capitalize cursor-pointer",
                          filters.petType === type ? "bg-primary text-white border-primary" : "bg-white text-foreground border-muted hover:border-primary/50"
                        )}
                        onClick={() => setFilter("petType", filters.petType === type ? null : type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Categoría</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {categoriesList.map((cat) => (
                      <div 
                        key={cat.id}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all cursor-pointer bg-white",
                          filters.category === cat.id 
                            ? "border-primary ring-1 ring-primary shadow-md" 
                            : "border-muted/50 hover:border-primary/30"
                        )}
                        onClick={() => handleCategoryClick(cat.id)}
                      >
                         <div className={cn("p-2 rounded-xl", cat.color.split(" ")[0])}>
                            <cat.icon className={cn("w-5 h-5", cat.color.split(" ")[1])} />
                         </div>
                         <span className={cn("text-xs font-bold", filters.category === cat.id && "text-primary")}>{cat.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Precio máximo</h4>
                     <span className="font-black text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">
                       ${filters.priceRange[1].toLocaleString()}
                     </span>
                   </div>
                  <Slider 
                    defaultValue={[500000]} 
                    max={500000} 
                    step={1000}
                    value={[filters.priceRange[1]]}
                    onValueChange={(val) => setFilter("priceRange", [0, val[0]])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase">
                    <span>$0</span>
                    <span>$500.000+</span>
                  </div>
                </div>

                {/* Sorting */}
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Ordenar por</h4>
                  <Select 
                    value={filters.sortBy} 
                    onValueChange={(val: any) => setFilter("sortBy", val)}
                  >
                    <SelectTrigger className="bg-white border-muted h-14 rounded-2xl text-base font-bold">
                      <SelectValue placeholder="Seleccionar orden" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Más relevantes</SelectItem>
                      <SelectItem value="price_asc">Menor precio</SelectItem>
                      <SelectItem value="price_desc">Mayor precio</SelectItem>
                      <SelectItem value="best_seller">Más vendidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-6 border-t bg-white gap-3 flex">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl font-bold" onClick={resetFilters}>
                  Limpiar
                </Button>
                <Button className="flex-1 h-14 rounded-2xl font-bold" onClick={() => toggleFilterDrawer(false)}>
                  Aplicar filtros
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Categories Horizontal */}
        <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={cn(
                "flex flex-col items-center gap-2 group transition-all shrink-0",
                filters.category === cat.id ? "scale-105" : "hover:scale-105"
              )}
            >
              <div className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-all shadow-sm",
                cat.color,
                filters.category === cat.id ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-md" : "grayscale-[0.3] group-hover:grayscale-0"
              )}>
                <cat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors",
                filters.category === cat.id ? "text-primary" : "text-muted-foreground"
              )}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 pt-8 space-y-16">
        {/* Active View: Results or Landing */}
        {isFiltering ? (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <h3 className="text-3xl font-black text-foreground">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {filters.searchQuery && (
                      <Badge variant="secondary" className="px-3 py-1 bg-white border border-muted-foreground/20 font-bold rounded-full">
                        "{filters.searchQuery}" <X className="ml-2 w-3 h-3 cursor-pointer" onClick={() => setFilter("searchQuery", "")} />
                      </Badge>
                    )}
                    {filters.category && (
                      <Badge variant="secondary" className="px-3 py-1 bg-white border border-muted-foreground/20 font-bold rounded-full">
                        {categoriesList.find(c => c.id === filters.category)?.name} <X className="ml-2 w-3 h-3 cursor-pointer" onClick={() => setFilter("category", null)} />
                      </Badge>
                    )}
                    {filters.petType && (
                      <Badge variant="secondary" className="px-3 py-1 bg-white border border-muted-foreground/20 font-bold rounded-full">
                        {filters.petType} <X className="ml-2 w-3 h-3 cursor-pointer" onClick={() => setFilter("petType", null)} />
                      </Badge>
                    )}
                    {filters.priceRange[1] < 500000 && (
                      <Badge variant="secondary" className="px-3 py-1 bg-white border border-muted-foreground/20 font-bold rounded-full">
                        Hasta ${filters.priceRange[1].toLocaleString()} <X className="ml-2 w-3 h-3 cursor-pointer" onClick={() => setFilter("priceRange", [0, 500000])} />
                      </Badge>
                    )}
                  </div>
               </div>
               <div className="flex items-center gap-2 self-end sm:self-center">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-bold uppercase text-muted-foreground">Orden:</span>
                  <span className="text-xs font-black uppercase text-primary">
                    {filters.sortBy === "relevance" ? "Relevancia" : filters.sortBy === "price_asc" ? "Menor precio" : filters.sortBy === "price_desc" ? "Mayor precio" : "Más vendidos"}
                  </span>
               </div>
            </div>

            {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                 {filteredProducts.map((p) => (
                   <ProductCard key={p.id} product={p} vendor={mockVendors.find(v => v.profile_id === p.vendor_id)} />
                 ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-30" />
                  </div>
                  <h4 className="text-xl font-bold">No encontramos productos con esos filtros</h4>
                  <p className="text-muted-foreground max-w-sm">Probá buscando algo más general o limpiando los filtros.</p>
                  <Button variant="outline" className="rounded-xl px-10 h-12" onClick={resetFilters}>Limpiar todo</Button>
               </div>
            )}
          </section>
        ) : (
          <>
            {/* Promo Banner */}
            <section>
              <div className="relative overflow-hidden rounded-[32px] bg-primary h-64 sm:h-80 flex items-center group shadow-xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paws.png')] opacity-10" />
                <div className="relative z-10 px-8 sm:px-16 space-y-6 max-w-xl">
                  <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                    Todo lo que tu <span className="text-yellow-300">compa</span> necesita.
                  </h2>
                  <p className="text-white/90 font-medium text-lg">Envío rápido a domicilio para que nunca les falte nada.</p>
                  <Button size="lg" variant="secondary" className="h-14 px-10 rounded-[20px] font-black shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-primary">
                    Ver Welcome Box
                  </Button>
                </div>
                <div className="absolute right-[-50px] top-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>
            </section>

            {/* Featured Section */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
                    <ShoppingBag className="text-primary w-8 h-8" /> Recomendados
                  </h3>
                  <p className="text-muted-foreground font-semibold">Seleccionamos lo mejor para tu manada.</p>
                </div>
                <Button variant="ghost" className="text-primary font-black hover:bg-primary/5 rounded-2xl px-6">
                  Ver todo <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {featuredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} vendor={mockVendors.find(v => v.profile_id === p.vendor_id)} />
                ))}
              </div>
            </section>

            {/* Best Sellers Section */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
                    <Flame className="text-orange-500 w-8 h-8" /> Los más buscados
                  </h3>
                  <p className="text-muted-foreground font-semibold">Tendencias en el marketplace de Hola Compa.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {bestSellers.map((p) => (
                  <ProductCard key={p.id} product={p} vendor={mockVendors.find(v => v.profile_id === p.vendor_id)} />
                ))}
              </div>
            </section>

            {/* Featured Vendors */}
            <section className="space-y-8">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-foreground">Tiendas destacadas</h3>
                <p className="text-muted-foreground font-semibold">Vendedores verificados con excelente reputación.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {featuredVendors.map((vendor) => (
                  <Card key={vendor.profile_id} className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white rounded-[40px] p-8 flex flex-col items-center text-center space-y-6">
                    <div className="w-32 h-32 rounded-[32px] bg-[#FFFBF7] flex items-center justify-center border-4 border-white shadow-lg overflow-hidden group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                      <img 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${vendor.business_name}`} 
                        alt={vendor.business_name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl group-hover:text-primary transition-colors">{vendor.business_name}</h4>
                      <div className="flex items-center justify-center gap-1.5 text-yellow-500 mt-2">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-black text-sm">4.9</span>
                        <span className="text-xs text-muted-foreground font-bold">(420 ventas)</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-2">{vendor.description}</p>
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-primary text-primary font-black hover:bg-primary hover:text-white transition-all">
                      Ir a la tienda
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* V2 Placeholder Cart */}
      <div className="fixed bottom-8 right-8 z-40 sm:hidden">
        <Button size="icon" className="h-20 w-20 rounded-full shadow-2xl bg-primary text-white border-4 border-white animate-bounce-subtle">
           <ShoppingBag className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
