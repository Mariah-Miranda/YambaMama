import React, { useState } from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import StagePanel from './components/StagePanel';
import BabyTracker from './components/BabyTracker';
import NutritionGuide from './components/NutritionGuide';
import ClinicTracker from './components/ClinicTracker';
import ClinicList from './components/ClinicList';
import { PregnancyState } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { MessageCircle, Baby, Utensils, CalendarDays, Hospital } from "lucide-react";

type ActiveTab = 'chat' | 'baby' | 'nutrition' | 'visits' | 'clinics';

export default function App() {
  const [stage, setStage] = useState<PregnancyState>({
    weeks: 28,
    months: 7,
    visits: [],
    lastUpdated: Date.now()
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface pregnancyStage={stage} />;
      case 'baby':
        return <BabyTracker weeks={stage.weeks} />;
      case 'nutrition':
        return <NutritionGuide months={stage.months} />;
      case 'visits':
        return <ClinicTracker stage={stage} setStage={setStage} />;
      case 'clinics':
        return <ClinicList district={stage.district || ""} />;
      default:
        return <ChatInterface pregnancyStage={stage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-main flex flex-col h-screen max-h-screen overflow-hidden">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar / Aside */}
        <motion.aside 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex w-80 bg-brand-bg-sidebar border-r border-brand-border p-6 flex-col gap-6 overflow-y-auto custom-scrollbar"
        >
          <StagePanel stage={stage} setStage={setStage} />
          
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-brand-border-light">
            <h3 className="text-[10px] font-bold uppercase text-brand-text-muted mb-4 tracking-[0.2em]">Health Tip</h3>
            <p className="text-sm italic leading-relaxed text-brand-primary mb-4 font-serif">
              "Remember to eat your greens like nakati or dodo today. They give you and the baby the strength you need."
            </p>
            <div className="h-1 w-12 bg-brand-accent rounded-full"></div>
          </div>

          <nav className="flex flex-col gap-2 mt-2">
            <NavItem 
              icon={<MessageCircle size={18} />} 
              text="Chat with Mama" 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')} 
            />
            <NavItem 
              icon={<Baby size={18} />} 
              text="Baby Tracker" 
              active={activeTab === 'baby'} 
              onClick={() => setActiveTab('baby')} 
            />
            <NavItem 
              icon={<Utensils size={18} />} 
              text="Nutrition Guide" 
              active={activeTab === 'nutrition'} 
              onClick={() => setActiveTab('nutrition')} 
            />
            <NavItem 
              icon={<CalendarDays size={18} />} 
              text="My Clinic Visits" 
              active={activeTab === 'visits'} 
              onClick={() => setActiveTab('visits')} 
            />
            <NavItem 
              icon={<Hospital size={18} />} 
              text="Find Clinics" 
              active={activeTab === 'clinics'} 
              onClick={() => setActiveTab('clinics')} 
            />
          </nav>
        </motion.aside>

        {/* Main Content Area */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col bg-white overflow-hidden relative"
        >
          <div className="flex-1 overflow-hidden p-6 md:p-10 container mx-auto max-w-4xl h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto no-scrollbar"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Bar */}
          <div className="md:hidden bg-brand-bg-sidebar border-t border-brand-border flex items-center justify-around py-2">
            <MobileNavItem 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')} 
              icon={<MessageCircle size={20} />} 
            />
            <MobileNavItem 
              active={activeTab === 'baby'} 
              onClick={() => setActiveTab('baby')} 
              icon={<Baby size={20} />} 
            />
            <MobileNavItem 
              active={activeTab === 'nutrition'} 
              onClick={() => setActiveTab('nutrition')} 
              icon={<Utensils size={20} />} 
            />
            <MobileNavItem 
              active={activeTab === 'visits'} 
              onClick={() => setActiveTab('visits')} 
              icon={<CalendarDays size={20} />} 
            />
          </div>
        </motion.section>
      </main>

      <footer className="bg-brand-bg-sidebar border-t border-brand-border px-6 md:px-10 py-3 flex justify-between items-center text-[10px] text-brand-text-muted font-bold tracking-wider relative z-20">
        <p>© 2026 YambaMama • Trusted Maternal Support</p>
        <div className="flex gap-6 items-center">
           <span className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             Mama is Online
           </span>
           <span className="cursor-pointer hover:text-brand-primary transition-colors">Privacy & Safety</span>
        </div>
      </footer>
    </div>
  );
}

function NavItem({ text, active = false, onClick, icon }: { text: string, active?: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl font-medium flex items-center gap-3 cursor-pointer transition-all",
        active 
          ? "bg-brand-border text-brand-primary shadow-sm" 
          : "text-brand-text-nav hover:bg-brand-border-light hover:translate-x-1"
      )}
    >
      <span className={cn(active ? "text-brand-accent" : "text-brand-text-muted")}>
        {icon}
      </span>
      <span className="text-sm">{text}</span>
    </div>
  );
}

function MobileNavItem({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-3 rounded-2xl transition-all",
        active ? "bg-white text-brand-accent shadow-sm border border-brand-border-light" : "text-brand-text-muted"
      )}
    >
      {icon}
    </button>
  );
}

