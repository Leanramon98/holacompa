"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart, ShoppingBag, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Adoptar", href: "/descubrir" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Refugios", href: "/refugios" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-marron/10 bg-crema/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-primary tracking-tight">
                hola compa <span className="text-primary-dark">🐾</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-marron/70 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-marron/70">
              <User className="h-5 w-5" />
            </Button>
            <Button className="rounded-full bg-primary hover:bg-primary-dark text-white font-bold px-6">
              Iniciar sesión
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-marron hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-crema border-b border-marron/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-semibold text-marron/70 hover:text-primary hover:bg-crema-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-marron/10">
              <Button className="w-full rounded-full bg-primary hover:bg-primary-dark text-white font-bold py-3">
                Iniciar sesión
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
