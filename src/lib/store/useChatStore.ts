import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'user' | 'shelter' | 'vendor';
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  participantId: string; // The ID of the other person (shelter or vendor)
  participantName: string;
  participantImage: string;
  participantType: 'shelter' | 'vendor';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

interface ChatState {
  conversations: Conversation[];
  messages: Message[];
  
  addMessage: (message: Omit<Message, 'timestamp' | 'id' | 'status'>) => void;
  getMessagesByConversation: (conversationId: string) => Message[];
  getConversationById: (id: string) => Conversation | undefined;
  markAsRead: (conversationId: string) => void;
  startConversation: (participant: Omit<Conversation, 'id' | 'unreadCount'>) => string;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [
        {
          id: "1",
          participantId: "shelter_1",
          participantName: "Santuario Colas Doradas",
          participantImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop",
          participantType: "shelter",
          lastMessage: "¡Bella está emocionada de conocerte! ¿El sábado te queda bien?",
          lastMessageTime: new Date().toISOString(),
          unreadCount: 1
        }
      ],
      messages: [
        {
          id: "m1",
          conversationId: "1",
          senderId: "shelter_1",
          senderType: "shelter",
          text: "¡Hola! Vimos tu postulación por Bella.",
          timestamp: new Date(Date.now() - 100000).toISOString(),
          status: "read"
        },
        {
          id: "m2",
          conversationId: "1",
          senderId: "shelter_1",
          senderType: "shelter",
          text: "¡Bella está emocionada de conocerte! ¿El sábado te queda bien?",
          timestamp: new Date().toISOString(),
          status: "delivered"
        }
      ],

      addMessage: (msgData) => {
        const newMessage: Message = {
          ...msgData,
          id: `m-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          status: 'sent'
        };

        set((state) => {
          // Update conversation last message
          const newConversations = state.conversations.map(c => 
            c.id === msgData.conversationId 
              ? { ...c, lastMessage: msgData.text, lastMessageTime: newMessage.timestamp } 
              : c
          );
          
          return {
            messages: [...state.messages, newMessage],
            conversations: newConversations
          };
        });
      },

      getMessagesByConversation: (conversationId) => {
        return get().messages.filter(m => m.conversationId === conversationId);
      },

      getConversationById: (id) => {
        return get().conversations.find(c => c.id === id);
      },

      markAsRead: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.map(c => 
            c.id === conversationId ? { ...c, unreadCount: 0 } : c
          ),
          messages: state.messages.map(m => 
            m.conversationId === conversationId && m.senderType !== 'user' ? { ...m, status: 'read' } : m
          )
        }));
      },

      startConversation: (participant) => {
        const existing = get().conversations.find(c => c.participantId === participant.participantId);
        if (existing) return existing.id;

        const newId = `c-${Math.random().toString(36).substr(2, 9)}`;
        const newConv: Conversation = {
          ...participant,
          id: newId,
          unreadCount: 0
        };

        set((state) => ({
          conversations: [newConv, ...state.conversations]
        }));

        return newId;
      }
    }),
    {
      name: "holacompa-chat-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
