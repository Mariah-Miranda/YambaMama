import React from "react";
import { Baby, Info } from "lucide-react";
import { BABY_DEVELOPMENT } from "../constants";

interface BabyTrackerProps {
  weeks: number;
}

export default function BabyTracker({ weeks }: BabyTrackerProps) {
  // Find the closest milestone
  const milestones = Object.keys(BABY_DEVELOPMENT).map(Number).sort((a, b) => a - b);
  const currentMilestoneKey = milestones.reverse().find(m => m <= weeks) || 4;
  const development = BABY_DEVELOPMENT[currentMilestoneKey];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Baby className="text-brand-accent w-5 h-5" />
        <h3 className="font-serif font-bold text-brand-primary">Baby Development</h3>
      </div>

      <div className="relative overflow-hidden bg-brand-primary rounded-[32px] p-8 text-white shadow-xl shadow-brand-primary/10">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Baby size={120} />
        </div>
        
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Current Size</p>
          <h4 className="text-3xl font-serif font-bold mb-4">Like a {development.size}</h4>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} />
              <span className="text-[10px] font-bold uppercase">What's happening?</span>
            </div>
            <p className="text-sm leading-relaxed font-medium">
              {development.milestone}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-brand-bg-sidebar p-4 rounded-2xl border border-brand-border-light text-center">
          <p className="text-[10px] font-bold uppercase text-brand-text-muted mb-1">Weeks</p>
          <p className="text-xl font-bold text-brand-primary">{weeks}</p>
        </div>
        <div className="bg-brand-bg-sidebar p-4 rounded-2xl border border-brand-border-light text-center">
          <p className="text-[10px] font-bold uppercase text-brand-text-muted mb-1">Status</p>
          <p className="text-xl font-bold text-brand-primary">{weeks >= 37 ? 'Full Term' : 'Growing'}</p>
        </div>
      </div>
    </div>
  );
}
