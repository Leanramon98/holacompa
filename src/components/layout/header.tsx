"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, PawPrint, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Adopción", href: "/descubrir" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Donar", href: "/donar" },
    { name: "Comunidad", href: "/comunidad" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm h-20 flex justify-between items-center px-4 md:px-8">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
        Hola Compa
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 items-center font-plus-jakarta text-lg tracking-tight">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "transition-all duration-300 pb-1",
                isActive 
                  ? "text-primary font-semibold border-b-2 border-primary" 
                  : "text-on-surface opacity-80 hover:text-primary hover:opacity-100"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="text-on-surface-variant hover:bg-surface-container rounded-lg transition-all hidden sm:flex">
          <PawPrint className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-on-surface-variant hover:bg-surface-container rounded-lg transition-all">
          <User className="w-5 h-5" />
        </Button>
        <Link 
          href="/descubrir" 
          className="editorial-gradient text-on-primary px-6 py-2 rounded-full font-semibold text-sm hidden md:block hover:opacity-90 transition-opacity"
        >
          Adoptar Ahora
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-on-surface"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-surface border-b shadow-xl md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-lg font-medium py-2",
                  pathname === link.href ? "text-primary" : "text-on-surface/80"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/descubrir"
              className="editorial-gradient text-on-primary px-6 py-4 rounded-xl font-bold text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Adoptar Ahora
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
