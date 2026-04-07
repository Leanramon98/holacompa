"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, SwatchBook, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const pathname = usePathname();
  const router = useRouter();

  // Determinamos el modo actual basado en la ruta
  const isDeck = pathname.includes("/descubrir");
  const isGrid = pathname.includes("/explorar");

  return (
    <div className="flex items-center justify-center p-1 bg-marron/5 rounded-full w-fit mx-auto border border-marron/10">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/descubrir")}
        className={cn(
          "rounded-full px-6 py-2 h-auto flex items-center gap-2 font-bold text-sm transition-all",
          isDeck 
            ? "bg-white text-primary shadow-sm" 
            : "text-marron/40 hover:text-marron/60 hover:bg-transparent"
        )}
      >
        <SwatchBook className="h-4 w-4" />
        Descubrir
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/explorar")}
        className={cn(
          "rounded-full px-6 py-2 h-auto flex items-center gap-2 font-bold text-sm transition-all",
          isGrid 
            ? "bg-white text-primary shadow-sm" 
            : "text-marron/40 hover:text-marron/60 hover:bg-transparent"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        Explorar
      </Button>
    </div>
  );
}
