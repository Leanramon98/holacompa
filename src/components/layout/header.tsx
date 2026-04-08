"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Heart, ShoppingBag, Compass, LayoutGrid, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Descubrir", href: "/descubrir", icon: <Compass className="w-5 h-5" /> },
  { name: "Adoptar", href: "/explorar", icon: <Heart className="w-5 h-5" /> },
  { name: "Market", href: "/marketplace", icon: <ShoppingBag className="w-5 h-5" /> },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Ocultar header global en rutas administrativas que tienen su propio header
  const isDashboard = pathname.startsWith("/refugio/") || pathname.startsWith("/vendedor/");
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-700 h-20 flex items-center px-6 md:px-12",
      scrolled 
        ? "bg-background/80 backdrop-blur-3xl shadow-[0_8px_30px_rgba(32,27,15,0.06)] border-b border-outline-variant/10" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
             <Heart className="text-white h-5 w-5 fill-white" />
          </div>
          <span className="text-2xl font-black text-on-surface font-plus-jakarta tracking-tighter">
            Hola Compa
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group",
                pathname === item.href ? "text-primary" : "text-on-surface/50 hover:text-on-surface"
              )}
            >
              {item.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-500",
                pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-3 hover:bg-surface-container rounded-full transition-colors text-on-surface/60 group">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          <Link href="/chat" className="p-3 hover:bg-surface-container rounded-full transition-colors text-on-surface/60 relative group">
             <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
             <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-error rounded-full" />
          </Link>

          <Link href="/perfil" className="w-11 h-11 rounded-full bg-primary-container overflow-hidden ring-4 ring-white shadow-xl active:scale-95 transition-all cursor-pointer hover:ring-primary/20">
            <img 
              alt="User Profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcqKtDgcYOGefmptTKHlBSElGlwTSDPZEvl5cAvIZWaL_RjfI3yH3HFzdNJbQauKxFvG7847jN9JFCHIbuHEvmXxoAq5pwtFiGcxjivJqgklFZCZd4n95w8_aD85lzrdbgSZB_zA_HmCIjVturRs0BaCMn1-Ap6D4yJEuAYpOID2bqtIoi4QKwZn_MfC064fJEwutJvNedvh4ziYY6RzXwFhA8TsxtybLkMU-TPnhO7axRP-E57S9mKsTfz6WYbA5rgcAqUwv7R14" 
              className="object-cover w-full h-full"
            />
          </Link>

          <button 
            className="lg:hidden p-3 hover:bg-surface-container rounded-full transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background/98 backdrop-blur-3xl z-50 p-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-4xl font-black text-on-surface font-plus-jakarta tracking-tighter py-6 border-b border-outline-variant/10 flex items-center justify-between group"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                <ArrowRightAlt className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary" />
              </Link>
            ))}
            <Link 
              href="/explorar" 
              onClick={() => setIsOpen(false)}
              className="w-full py-6 rounded-[24px] bg-primary text-on-primary font-black text-xs uppercase tracking-[0.2em] mt-8 shadow-2xl shadow-primary/20 flex items-center justify-center gap-4"
            >
              Postular Ahora
              <Heart className="h-4 w-4 fill-white" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ArrowRightAlt(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
