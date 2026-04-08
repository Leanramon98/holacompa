"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  MessageSquare, 
  Users,
  Archive,
  Check,
  Clock,
  Filter,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/lib/store/useChatStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";

export default function RefugioChatPage() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const { conversations } = useChatStore();

  // For the refuge, we only show conversations where participant is the user or wait...
  // In our simple mock, we'll show all conversations but themed for the refuge side.
  const filteredChats = conversations;

  return (
    <HydrationZustand>
      <div className="min-h-screen bg-[#f8f9fa] font-be-vietnam pb-32">
        {/* Header Admin Style */}
        <header className="fixed top-0 w-full z-50 bg-white border-b border-black/5 h-20 flex items-center px-10">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface">Panel de Mensajería</h1>
              <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Gestión de Adoptantes</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/40" />
                  <input placeholder="Buscar adoptante..." className="pl-10 pr-4 py-2 bg-black/5 rounded-xl text-sm border-none focus:ring-2 focus:ring-primary/20 transition-all" />
               </div>
               <button className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
                  <Filter className="h-4 w-4 text-on-surface-variant" />
               </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-10 pt-28 max-w-5xl">
          <div className="grid grid-cols-12 gap-10">
            {/* Sidebar List */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="font-plus-jakarta font-black text-xl tracking-tight">Conversaciones</h2>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">{conversations.length} total</span>
               </div>

               <div className="space-y-2">
                 {filteredChats.map((chat) => (
                   <Link
                     href={`/refugio/chat/${chat.id}`}
                     key={chat.id} 
                     className={cn(
                       "flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer border",
                       chat.unreadCount > 0 
                         ? "bg-white border-primary shadow-lg shadow-black/5" 
                         : "bg-white border-black/5 hover:border-primary/20"
                     )}
                   >
                     <div className="w-12 h-12 rounded-xl bg-primary-container overflow-hidden relative shadow-sm">
                        <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop" fill alt="User" className="object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                           <p className="font-bold text-sm text-on-surface truncate">Adoptante {chat.id}</p>
                           <span className="text-[9px] font-bold text-on-surface-variant/40">10:45</span>
                        </div>
                        <p className="text-xs text-on-surface-variant/60 truncate italic">"{chat.lastMessage}"</p>
                     </div>
                     {chat.unreadCount > 0 && <div className="w-2 h-2 rounded-full bg-primary" />}
                   </Link>
                 ))}
               </div>
            </div>

            {/* Empty State / Placeholder for Desktop */}
            <div className="hidden lg:flex col-span-8 h-[70vh] bg-white rounded-[40px] border border-black/5 items-center justify-center flex-col space-y-6">
                <div className="w-24 h-24 bg-surface-container rounded-[32px] flex items-center justify-center text-primary/20">
                    <MessageSquare className="h-12 w-12" />
                </div>
                <div className="text-center">
                    <h3 className="font-plus-jakarta font-black text-2xl tracking-tight">Seleccioná un chat</h3>
                    <p className="text-on-surface-variant/60 font-medium">Respondé las dudas de tus futuros adoptantes.</p>
                </div>
            </div>
          </div>
        </main>
      </div>
    </HydrationZustand>
  );
}
