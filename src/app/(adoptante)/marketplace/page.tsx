"use client";

import { useMemo } from "react";
import { 
  Search, 
  SearchX, 
  MapPin, 
  Heart, 
  ShoppingCart, 
  MessageCircle, 
  Store,
  ChevronRight,
  Utensils,
  Gamepad2,
  Stethoscope,
  Crown,
  Verified,
  Facebook,
  Instagram,
  Mail,
  Send
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import { mockProducts } from "@/lib/mock-data/mock-products";
import { mockVendors } from "@/lib/mock-data/mock-vendors";
import { useMarketplaceStore } from "@/stores/marketplace-store";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock categories with icons
const categoriesList = [
  { id: "cat-1", name: "Alimento", icon: Utensils, count: 42 },
  { id: "cat-4", name: "Juguetes", icon: Gamepad2, count: 28 },
  { id: "cat-6", name: "Salud", icon: Stethoscope, count: 15 },
  { id: "cat-2", name: "Accesorios", icon: Crown, count: 33 },
];

export default function MarketplacePage() {
  const { 
    filters, 
    setFilter, 
    resetFilters, 
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
      // Price Range
      if (product.price > filters.priceRange[1]) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price_asc") return a.price - b.price;
      if (filters.sortBy === "price_desc") return b.price - a.price;
      return 0;
    });
  }, [filters]);

  return (
    <div className="bg-background text-on-surface pt-12">
      <main className="px-4 md:px-8 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-on-surface">
            Marketplace <span className="text-primary italic font-serif">Compas</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
            Equipamiento premium y nutrición especializada para los integrantes más leales de tu estancia. Calidad validada por nuestra comunidad.
          </p>
        </header>

        {/* Categories Bento Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {categoriesList.map((cat) => (
            <div 
              key={cat.id} 
              className={cn(
                "p-8 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer group",
                filters.category === cat.id 
                  ? "bg-primary-container text-on-primary-container shadow-lg scale-105" 
                  : "bg-surface-container-low hover:bg-surface-container-high"
              )}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div className={cn(
                "p-4 rounded-full transition-colors",
                filters.category === cat.id ? "bg-white/20" : "bg-surface-container-highest group-hover:bg-surface-container-lowest"
              )}>
                <cat.icon className={cn("w-8 h-8", filters.category === cat.id ? "text-white" : "text-primary")} />
              </div>
              <span className="font-bold uppercase tracking-widest text-xs">{cat.name}</span>
            </div>
          ))}
        </section>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="bg-surface-container-low p-6 rounded-xl space-y-8">
              <h3 className="font-bold text-lg mb-4">Filtrar por</h3>
              
              {/* Search */}
              <div className="relative">
                <Input 
                  placeholder="Buscar..." 
                  className="bg-surface-container-highest border-none rounded-xl pl-10 h-12"
                  value={filters.searchQuery}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">Precio</span>
                <Slider 
                  defaultValue={[500000]} 
                  max={500000} 
                  step={1000}
                  value={[filters.priceRange[1]]}
                  onValueChange={(val) => setFilter("priceRange", [0, val[0]])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs mt-2 font-bold text-primary">
                  <span>$0</span>
                  <span>${filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Location */}
              <div>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">Ubicación</span>
                <div className="relative">
                  <Input 
                    placeholder="Palermo, CABA" 
                    className="w-full bg-surface-container-highest border-none rounded-xl py-2 px-10 h-11 text-sm"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full rounded-xl"
                onClick={resetFilters}
              >
                Limpiar filtros
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="bg-primary/5 border border-primary/10 p-6 rounded-xl space-y-4">
              <Verified className="w-10 h-10 text-primary" strokeWidth={1.5} />
              <h4 className="font-bold">Comprá con Confianza</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Todos los vendedores con el sello dorado han sido verificados por el equipo de Hola Compa.
              </p>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <span className="text-on-surface-variant font-medium">
                Mostrando {filteredProducts.length} productos
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">Ordenar:</span>
                <select 
                  className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer text-primary"
                  onChange={(e) => setFilter("sortBy", e.target.value as any)}
                  value={filters.sortBy}
                >
                  <option value="relevance">Relevantes</option>
                  <option value="price_asc">Menor Precio</option>
                  <option value="price_desc">Mayor Precio</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  const vendor = mockVendors.find(v => v.profile_id === product.vendor_id);
                  return (
                    <div key={product.id} className="group animate-in fade-in slide-in-from-bottom-3 duration-300">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container-low mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                        <img 
                          src={product.photos[0]} 
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {vendor?.verification_status === "approved" && (
                          <div className="absolute top-4 left-4 bg-primary-container text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                            <Verified className="w-3 h-3 fill-current" />
                            Verificado
                          </div>
                        )}
                        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-primary transition-all">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                            {product.title}
                          </h3>
                          <span className="text-primary font-black text-lg whitespace-nowrap">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed opacity-80">
                          {product.description}
                        </p>
                        <div className="pt-2 flex gap-2">
                          <Link 
                            href={`/producto/${product.id}`}
                            className="flex-1 bg-surface-container-highest hover:bg-surface-container-high transition-colors py-3 rounded-full text-xs font-black uppercase tracking-widest text-center"
                          >
                            Ver Detalle
                          </Link>
                          <button className="flex-1 editorial-gradient text-white hover:opacity-90 transition-opacity py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                            <MessageCircle className="w-3 h-3" />
                            Consultar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6">
                  <SearchX className="w-10 h-10 text-on-surface-variant opacity-30" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No encontramos nada</h3>
                <p className="text-on-surface-variant max-w-xs mb-8">
                  Probá ajustando los filtros o buscando otra palabra clave.
                </p>
                <Button onClick={resetFilters} variant="outline" className="rounded-full px-8">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
