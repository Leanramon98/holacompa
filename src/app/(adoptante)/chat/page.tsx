"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  MessageSquare, 
  Store, 
  Home, 
  Archive,
  Check,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/lib/store/useChatStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";

export default function ChatsPage() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const { conversations } = useChatStore();

  const filters = [
    { id: "todos", label: "Todos", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "refugios", label: "Refugios", icon: <Home className="h-4 w-4" /> },
    { id: "tiendas", label: "Tiendas", icon: <Store className="h-4 w-4" /> },
  ];

  const filteredChats = activeFilter === "todos" 
    ? conversations 
    : conversations.filter(c => (activeFilter === "refugios" && c.participantType === "shelter") || (activeFilter === "tiendas" && c.participantType === "vendor"));

  return (
    <HydrationZustand>
      <div className="min-h-screen bg-background font-be-vietnam pb-32">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
          <div className="container mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <MessageSquare className="text-white h-5 w-5 fill-white/20" />
              </div>
              <h1 className="font-plus-jakarta font-black text-2xl tracking-tighter text-on-surface">Conversaciones</h1>
            </div>
            <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
              <Search className="h-5 w-5 text-on-surface-variant" />
            </button>
          </div>
        </header>

        <main className="container mx-auto px-6 pt-28 space-y-10 max-w-2xl">
          {/* Intro */}
          <section className="space-y-1">
            <h2 className="font-plus-jakarta text-4xl font-black tracking-tighter text-on-surface">Mis Mensajes</h2>
            <p className="text-on-surface-variant font-medium opacity-60">Tu camino hacia un nuevo compañero.</p>
          </section>

          {/* Filters */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 whitespace-nowrap transition-all border",
                  activeFilter === filter.id 
                    ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                    : "bg-surface-container-high/40 text-on-surface-variant border-transparent hover:border-primary/10"
                )}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>

          {/* Chat List */}
          <div className="space-y-4">
            {filteredChats.map((chat) => (
              <Link
                href={`/chat/${chat.id}`}
                key={chat.id} 
                className={cn(
                  "group relative p-6 rounded-[32px] border transition-all cursor-pointer flex gap-5",
                  chat.unreadCount > 0 
                    ? "bg-white border-primary/20 shadow-2xl shadow-primary/5" 
                    : "bg-surface-container-low/40 border-transparent hover:bg-white hover:border-primary/10"
                )}
              >
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-black/5">
                    <Image src={chat.participantImage} alt={chat.participantName} width={64} height={64} className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className={cn(
                      "font-plus-jakarta text-lg tracking-tight truncate",
                      chat.unreadCount > 0 ? "font-black text-on-surface" : "font-bold text-on-surface/80"
                    )}>
                      {chat.participantName}
                    </h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-end gap-4 font-medium">
                    <p className={cn(
                      "text-sm line-clamp-1 flex-1",
                      chat.unreadCount > 0 ? "text-on-surface font-semibold" : "text-on-surface-variant opacity-60"
                    )}>
                      {chat.lastMessage || "Sin mensajes aún"}
                    </p>
                    {chat.unreadCount > 0 ? (
                      <div className="bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black shadow-lg shadow-primary/20 shrink-0">
                        {chat.unreadCount}
                      </div>
                    ) : (
                      <Check className="h-4 w-4 text-secondary opacity-40 shrink-0" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-center pt-8">
            <button className="flex items-center gap-3 text-on-surface-variant/40 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors group">
                <Archive className="h-4 w-4 group-hover:rotate-6 transition-transform" />
                Ver conversaciones archivadas
            </button>
          </div>
        </main>
      </div>
    </HydrationZustand>
  );
}
