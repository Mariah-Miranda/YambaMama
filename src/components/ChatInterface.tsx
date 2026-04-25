import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, PregnancyState } from "../types";
import { sendMessage } from "../services/gemini";
import MessageBubble from "./MessageBubble";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatInterfaceProps {
  pregnancyStage: PregnancyState;
}

export default function ChatInterface({ pregnancyStage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '',
      mainResponse: "Gyebale ko, maama! Nze YambaMama, mukwano gwo agenda okukuyamba mu lwaala luno. Otya leero?",
      translation: "Hello mother! I am YambaMama, your friend who is going to help you during this pregnancy. How are you feeling today?",
      risk: 'NONE',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      mainResponse: input,
      translation: "",
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const stageInfo = `${pregnancyStage.weeks} weeks (${pregnancyStage.months} months)`;
      const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      
      const response = await sendMessage(input, history, stageInfo);
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content || "",
        mainResponse: response.mainResponse || "",
        translation: response.translation || "",
        risk: response.risk,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Error",
        mainResponse: "Kinkutuddeko katono, maama. Gezaako nate mu kaseera katono.",
        translation: "I am having a little trouble connecting, mother. Please try again in a moment.",
        risk: 'NONE',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-brand-border-light shadow-sm">
      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-2"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-6"
          >
            <div className="bg-brand-bg-sidebar rounded-t-[20px] rounded-br-[20px] px-5 py-4 shadow-sm border border-brand-border-light flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" />
              <span className="text-xs font-semibold text-brand-text-muted italic">YambaMama is thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-brand-border">
        <div className="relative flex items-center bg-brand-bg-sidebar rounded-full border border-brand-border-light px-6 py-2 transition-all focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary/10">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Write to Mama..."
            className="bg-transparent border-none flex-1 outline-none text-brand-text-dark placeholder-brand-text-muted text-sm py-2 resize-none min-h-[40px] max-h-[120px] custom-scrollbar"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="ml-4 text-brand-primary font-bold uppercase text-[10px] tracking-widest hover:text-brand-accent transition-colors disabled:opacity-30 flex items-center gap-2"
          >
            {isLoading ? "Wait..." : "Send Message"}
            <Send size={14} />
          </button>
        </div>
        <div className="flex gap-4 mt-4 px-4 overflow-x-auto no-scrollbar pb-1">
          {["# Symptoms", "# Bleeding", "# Nutrition", "# Baby Movement"].map(tag => (
            <span key={tag} className="text-[10px] text-brand-text-muted font-bold uppercase tracking-wider cursor-pointer hover:text-brand-primary transition-colors whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
