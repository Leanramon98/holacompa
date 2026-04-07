"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Heart, ShoppingBag, Compass, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Descubrir", href: "/descubrir", icon: <Compass className="w-5 h-5" /> },
  { name: "Adoptar", href: "/descubrir", icon: <Heart className="w-5 h-5" /> },
  { name: "Market", href: "/marketplace", icon: <ShoppingBag className="w-5 h-5" /> },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 h-20 flex items-center px-6 md:px-12",
      scrolled 
        ? "bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(32,27,15,0.06)]" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black text-primary font-plus-jakarta tracking-tight transition-transform group-hover:scale-105">
            Hola Compa
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-black uppercase tracking-[0.2em] transition-all hover:text-primary",
                pathname === item.href ? "text-primary" : "text-on-surface/50"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface/60">
            <Search className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden ring-2 ring-white shadow-md active:scale-95 transition-transform cursor-pointer">
            <img 
              alt="User Profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcqKtDgcYOGefmptTKHlBSElGlwTSDPZEvl5cAvIZWaL_RjfI3yH3HFzdNJbQauKxFvG7847jN9JFCHIbuHEvmXxoAq5pwtFiGcxjivJqgklFZCZd4n95w8_aD85lzrdbgSZB_zA_HmCIjVturRs0BaCMn1-Ap6D4yJEuAYpOID2bqtIoi4QKwZn_MfC064fJEwutJvNedvh4ziYY6RzXwFhA8TsxtybLkMU-TPnhO7axRP-E57S9mKsTfz6WYbA5rgcAqUwv7R14" 
            />
          </div>

          <button 
            className="md:hidden p-2 hover:bg-surface-container rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-xl z-50 p-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-3xl font-black text-on-surface font-plus-jakarta tracking-tight py-4 border-b border-outline-variant/10 flex items-center justify-between group"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all text-primary" />
              </Link>
            ))}
            <Button className="w-full py-8 rounded-full bg-primary text-on-primary font-black text-xl uppercase tracking-widest mt-8">
              Postular Ahora
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
