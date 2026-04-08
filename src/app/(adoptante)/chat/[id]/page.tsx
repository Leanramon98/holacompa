"use client";

import { useEffect, useState, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  MoreVertical, 
  Send, 
  Smile, 
  Paperclip,
  Check,
  CheckCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/lib/store/useChatStore";
import { HydrationZustand } from "@/components/providers/hydration-zustand";
import { notFound } from "next/navigation";

export default function IndividualChatPage({ params }: { params: Promise<{ id: string }> }) {
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

    addMessage({
      conversationId: id,
      senderId: "user_123", // Mock current user
      senderType: "user",
      text: inputText
    });
    setInputText("");
  };

  return (
    <HydrationZustand>
      <div className="flex flex-col h-screen bg-background font-be-vietnam overflow-hidden">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 h-20 flex items-center px-6">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <Link href="/chat" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-highest transition-all">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            
            <div className="flex-1 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden relative shadow-md">
                <Image src={conversation.participantImage} alt={conversation.participantName} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <h2 className="font-plus-jakarta font-black text-lg tracking-tight truncate text-on-surface">
                  {conversation.participantName}
                </h2>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-secondary" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">En línea</span>
                </div>
              </div>
            </div>

            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
              <MoreVertical className="h-5 w-5 text-on-surface-variant" />
            </button>
          </div>
        </header>

        {/* Messages area */}
        <main 
          ref={scrollRef}
          className="flex-1 overflow-y-auto pt-24 pb-32 px-6 scroll-smooth"
        >
          <div className="container mx-auto space-y-8 flex flex-col pt-4">
            <div className="flex justify-center mb-8">
               <span className="px-4 py-1.5 bg-surface-container-highest/20 rounded-full text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 border border-outline-variant/10">Hoy</span>
            </div>

            {chatMessages.map((msg) => {
              const isUser = msg.senderType === 'user';
              return (
                <div key={msg.id} className={cn(
                  "flex flex-col max-w-[85%]",
                  isUser ? "self-end items-end" : "self-start items-start"
                )}>
                  <div className={cn(
                    "p-6 rounded-[32px] text-lg font-medium shadow-sm border",
                    isUser 
                      ? "bg-primary text-white border-primary-fixed-dim rounded-tr-[8px] shadow-primary/10" 
                      : "bg-surface-container-lowest text-on-surface border-outline-variant/10 rounded-tl-[8px]"
                  )}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-2 mt-2 px-2">
                    <span className="text-[10px] font-black text-on-surface-variant/40 uppercase">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isUser && (
                      msg.status === 'read' ? <CheckCheck className="h-3 w-3 text-secondary" /> : <Check className="h-3 w-3 text-on-surface-variant/40" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Input Bar */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-background/80 backdrop-blur-3xl border-t border-outline-variant/10">
          <form 
            onSubmit={handleSendMessage}
            className="container mx-auto flex items-center gap-4 bg-surface-container-lowest p-2 rounded-[32px] border border-outline-variant/10 shadow-2xl shadow-black/5"
          >
            <button type="button" className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all shrink-0">
               <Smile className="h-6 w-6 text-on-surface-variant/60" />
            </button>
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-medium text-lg px-2 placeholder:text-outline/30"
              placeholder="Escribí un mensaje..."
              type="text"
            />
            <button type="button" className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-all shrink-0">
               <Paperclip className="h-5 w-5 text-on-surface-variant/60" />
            </button>
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-full shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              <Send className="h-6 w-6 fill-current" />
            </button>
          </form>
        </div>
      </div>
    </HydrationZustand>
  );
}
