import React, { useState } from "react";
import { ChatMessage, RiskLevel } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Languages, AlertTriangle, Info, ShieldAlert, CheckCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface MessageBubbleProps {
  message: ChatMessage;
}

const riskConfig: Record<RiskLevel, { icon: any, color: string, bg: string, label: string }> = {
  LOW: { icon: Info, color: 'text-blue-700', bg: 'bg-blue-50', label: 'Low Risk' },
  MEDIUM: { icon: AlertTriangle, color: 'text-brand-accent', bg: 'bg-brand-accent/10', label: 'Medium Risk' },
  HIGH: { icon: ShieldAlert, color: 'text-white', bg: 'bg-brand-primary', label: 'High Risk' },
  EMERGENCY: { icon: ShieldAlert, color: 'text-white', bg: 'bg-red-800', label: 'EMERGENCY' },
  NONE: { icon: CheckCircle, color: 'text-brand-primary', bg: 'bg-brand-bg-sidebar', label: 'General Info' }
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const isAssistant = message.role === 'assistant';
  const risk = message.risk || 'NONE';
  const config = riskConfig[risk];

  const bubbleStyles = cn(
    "relative max-w-[85%] md:max-w-[75%] px-5 py-4 shadow-sm transition-all duration-300",
    isAssistant 
      ? (risk === 'MEDIUM' || risk === 'HIGH' || risk === 'EMERGENCY'
          ? "bg-white border-2 border-brand-primary rounded-[24px] shadow-md"
          : "bg-brand-bg-sidebar border border-brand-border-light rounded-t-[20px] rounded-br-[20px] text-brand-text-dark")
      : "bg-brand-accent text-white font-medium rounded-t-[20px] rounded-bl-[20px]"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-6",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      <div className={bubbleStyles}>
        {isAssistant && risk !== 'NONE' && (
          <div className="flex items-center gap-2 mb-3">
             <span className={cn(
               "px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-tighter",
               config.bg,
               config.color,
               (risk === 'HIGH' || risk === 'EMERGENCY') ? "border border-white/20" : "border border-black/5"
             )}>
                [{config.label}]
             </span>
             <span className="text-[10px] text-brand-text-muted font-medium italic">Assessment</span>
          </div>
        )}
        
        <div className={cn(
          "leading-relaxed",
          isAssistant && message.mainResponse.length < 50 ? "font-serif text-lg italic text-brand-primary" : "text-sm"
        )}>
          <AnimatePresence mode="wait">
            <motion.p
              key={showTranslation ? 'trans' : 'main'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {showTranslation ? message.translation : message.mainResponse}
            </motion.p>
          </AnimatePresence>
        </div>

        {isAssistant && message.translation && (
          <div className="mt-4 pt-4 border-t border-brand-border-light">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] uppercase font-bold text-brand-text-muted tracking-wider">English Version</span>
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="text-[9px] text-brand-accent font-bold border border-brand-accent px-2 py-0.5 rounded uppercase hover:bg-brand-accent hover:text-white transition-all"
              >
                {showTranslation ? "Show Original" : "Translate / Vvuula"}
              </button>
            </div>
            {!showTranslation && (
               <p className="text-xs text-brand-text-nav italic line-clamp-2 opacity-60">
                 {message.translation}
               </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
