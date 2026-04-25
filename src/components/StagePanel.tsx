import React from "react";
import { PregnancyState } from "../types";
import { motion } from "motion/react";
import { Baby, CalendarDays, MapPin } from "lucide-react";
import { DISTRICT_CLINICS } from "../constants";

interface StagePanelProps {
  stage: PregnancyState;
  setStage: (stage: PregnancyState) => void;
}

export default function StagePanel({ stage, setStage }: StagePanelProps) {
  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weeks = parseInt(e.target.value) || 0;
    const months = Math.floor(weeks / 4);
    setStage({ ...stage, weeks, months, lastUpdated: Date.now() });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStage({ ...stage, district: e.target.value, lastUpdated: Date.now() });
  };

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-brand-border-light mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-brand-bg-sidebar rounded-full flex items-center justify-center">
          <Baby className="text-brand-primary w-4 h-4" />
        </div>
        <h3 className="text-xs font-bold uppercase text-brand-text-muted tracking-widest">Pregnancy Status</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-brand-text-nav uppercase tracking-widest">Current Week</span>
            <span className="text-sm font-serif font-bold text-brand-primary italic">Week {stage.weeks}</span>
          </div>
          <input
            type="range"
            min="0"
            max="42"
            value={stage.weeks}
            onChange={handleWeekChange}
            className="w-full h-1 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent transition-all"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-brand-bg-sidebar rounded-2xl border border-brand-border-light">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-brand-primary w-4 h-4" />
            <span className="text-[10px] text-brand-text-muted font-bold uppercase tracking-wider">Estimated Month</span>
          </div>
          <span className="text-sm font-bold text-brand-primary">{stage.months === 0 ? 1 : stage.months}</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <MapPin size={12} className="text-brand-accent" />
            <span className="text-[10px] font-bold text-brand-text-nav uppercase tracking-widest">Select District</span>
          </div>
          <select 
            value={stage.district || ""}
            onChange={handleDistrictChange}
            className="w-full bg-brand-bg-sidebar border border-brand-border-light rounded-xl p-3 text-sm font-medium text-brand-text-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all appearance-none"
          >
            <option value="">Select your location...</option>
            {Object.keys(DISTRICT_CLINICS).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
