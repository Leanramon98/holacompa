"use client";

import { useEffect, useState, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Send, 
  Smile, 
  Paperclip,
  Check,
  CheckCheck,
  MoreVertical,
  ShieldCheck,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/lib/store/useChatStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";
import { notFound } from "next/navigation";

export default function RefugioIndividualChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { messages, getConversationById, getMessagesByConversation, addMessage, markAsRead } = useChatStore();
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = getConversationById(id);
  const chatMessages = getMessagesByConversation(id);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (id) {
        markAsRead(id);
    }
  }, [id, markAsRead]);

  if (!conversation) return notFound();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // From the refuge side, the refuge is the sender
    addMessage({
      conversationId: id,
      senderId: conversation.participantId, 
      senderType: "shelter",
      text: inputText
    });
    setInputText("");
  };

  return (
    <HydrationZustand>
      <div className="flex flex-col h-screen bg-[#f8f9fa] font-be-vietnam overflow-hidden">
        {/* Header - Shelter Side Theme */}
        <header className="fixed top-0 w-full z-50 bg-white border-b border-black/5 h-20 flex items-center px-8 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <Link href="/refugio/chat" className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 hover:bg-black/10 transition-all">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative shadow-sm border border-black/5">
                   <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop" fill alt="Adoptante" className="object-cover" />
                </div>
                <div>
                   <h2 className="font-plus-jakarta font-black text-lg tracking-tight text-on-surface">Adoptante {id}</h2>
                   <p className="text-[10px] font-black uppercase text-secondary tracking-widest flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Perfil Verificado
                   </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="hidden md:flex items-center gap-2 px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                  Ver Postulación
               </button>
               <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5">
                  <MoreVertical className="h-5 w-5 text-on-surface-variant" />
               </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Chat Area */}
          <main 
            ref={scrollRef}
            className="flex-1 overflow-y-auto pt-24 pb-32 px-10 scroll-smooth"
          >
            <div className="max-w-4xl mx-auto space-y-8 flex flex-col pt-6">
               <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center gap-2">
                     <span className="px-4 py-1 bg-black/5 rounded-full text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Hoy</span>
                     <p className="text-[11px] font-bold text-on-surface-variant/30 uppercase tracking-widest italic">Conversación cifrada</p>
                  </div>
               </div>

               {chatMessages.map((msg) => {
                 const isShelter = msg.senderType === 'shelter';
                 return (
                   <div key={msg.id} className={cn(
                     "flex flex-col max-w-[70%]",
                     isShelter ? "self-end items-end" : "self-start items-start"
                   )}>
                     <div className={cn(
                       "p-5 rounded-2xl text-[15px] font-medium transition-all shadow-sm",
                       isShelter 
                         ? "bg-on-surface text-white rounded-tr-none" 
                         : "bg-white text-on-surface border border-black/5 rounded-tl-none"
                     )}>
                       {msg.text}
                     </div>
                     <div className="flex items-center gap-2 mt-2 px-1">
                       <span className="text-[9px] font-black text-on-surface-variant/30 uppercase">
                         {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                       {isShelter && (
                         msg.status === 'read' ? <CheckCheck className="h-3 w-3 text-secondary" /> : <Check className="h-3 w-3 text-on-surface-variant/30" />
                       )}
                     </div>
                   </div>
                 );
               })}
            </div>
          </main>

          {/* Right Sidebar - Info (Only on desktop) */}
          <aside className="hidden xl:block w-80 bg-white border-l border-black/5 p-8 pt-28 space-y-10 overflow-y-auto">
             <div className="space-y-4 text-center">
                <div className="w-24 h-24 rounded-[32px] overflow-hidden relative mx-auto shadow-xl border-4 border-white">
                   <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop" fill alt="Profile" className="object-cover" />
                </div>
                <h3 className="font-plus-jakarta font-black text-xl tracking-tight">Lea Ramon</h3>
                <div className="flex items-center justify-center gap-2 text-on-surface-variant/60 font-medium text-sm">
                   <MapPin className="h-3 w-3" />
                   CABA, Argentina
                </div>
             </div>

             <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-40">Detalles de Interés</span>
                <div className="space-y-4">
                   <div className="flex justify-between items-center bg-black/5 p-4 rounded-2xl">
                      <span className="text-xs font-bold opacity-60">Adopciones previas</span>
                      <span className="font-black text-sm">2</span>
                   </div>
                   <div className="flex justify-between items-center bg-black/5 p-4 rounded-2xl">
                      <span className="text-xs font-bold opacity-60">Tipo de hogar</span>
                      <span className="font-black text-sm">Casa/Patio</span>
                   </div>
                </div>
             </div>

             <button className="w-full py-4 bg-tertiary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-tertiary/20 hover:scale-105 active:scale-95 transition-all">
                Agendar Entrevista
             </button>
          </aside>
        </div>

        {/* Input Bar */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-black/5">
          <form 
            onSubmit={handleSendMessage}
            className="max-w-4xl mx-auto flex items-center gap-4 bg-[#f8f9fa] p-2 rounded-2xl border border-black/5 transition-all focus-within:bg-white focus-within:shadow-xl focus-within:border-primary/20"
          >
            <button type="button" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 transition-all shrink-0">
               <Smile className="h-5 w-5 text-on-surface-variant/40" />
            </button>
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-medium text-base px-2 placeholder:text-on-surface-variant/20"
              placeholder="Escribí una respuesta oficial..."
              type="text"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="px-8 h-12 bg-on-surface text-white flex items-center justify-center gap-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Enviar
            </button>
          </form>
        </div>
      </div>
    </HydrationZustand>
  );
}
