import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-10 flex items-center justify-between border-b border-brand-border bg-white">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-sm">
          <Heart className="w-7 h-7" fill="currentColor" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-brand-primary">YambaMama</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-text-muted">Maternal Health Companion</p>
        </div>
      </motion.div>
      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden sm:flex bg-brand-bg-sidebar border border-brand-border px-4 py-2 rounded-full items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Caring Mode</span>
        </motion.div>
      </div>
    </header>
  );
}
