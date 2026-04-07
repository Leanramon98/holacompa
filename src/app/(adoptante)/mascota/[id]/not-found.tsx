"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PetNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 text-center bg-orange-50">
      <div className="w-48 h-48 bg-orange-100 rounded-full mb-8 flex items-center justify-center relative overflow-hidden">
        {/* Placeholder for Compa character */}
        <div className="text-6xl animate-bounce">🐾</div>
      </div>
      
      <h1 className="text-3xl font-bold text-orange-950 mb-3">¡Uy! No encontramos a este compa</h1>
      <p className="text-orange-900/60 mb-8 max-w-[280px]">
        Puede que ya la hayan adoptado o que el link no sea el correcto. ¡No te preocupes, hay muchos más!
      </p>
      
      <Button asChild className="rounded-2xl px-8 h-14 text-lg font-bold bg-[#FF6B4A] hover:bg-[#D94428] text-white shadow-lg transition-all active:scale-95">
        <Link href="/descubrir">Seguir buscando</Link>
      </Button>
      
      <Link href="/feed" className="mt-6 text-orange-800 font-medium hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
