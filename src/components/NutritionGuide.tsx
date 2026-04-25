import React from "react";
import { Apple, Utensils, Info } from "lucide-react";
import { NUTRITION_STAGES } from "../constants";

interface NutritionGuideProps {
  months: number;
}

export default function NutritionGuide({ months }: NutritionGuideProps) {
  const stage = months <= 3 ? 1 : months <= 6 ? 2 : 3;
  const guide = NUTRITION_STAGES[stage];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Apple className="text-brand-accent w-5 h-5" />
        <h3 className="font-serif font-bold text-brand-primary">Mama's Nutrition Guide</h3>
      </div>

      <div className="bg-brand-bg-sidebar p-5 rounded-3xl border border-brand-border-light">
        <div className="flex items-center gap-2 mb-3">
          <Utensils size={16} className="text-brand-accent" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">Daily Meal Suggestion</span>
        </div>
        <p className="text-sm text-brand-text-dark leading-relaxed font-medium">
          {guide.meal}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Info size={14} className="text-brand-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">Healthy Tips</span>
        </div>
        {guide.tips.map((tip, idx) => (
          <div key={idx} className="flex gap-3 items-start bg-white p-3 rounded-xl border border-brand-border-light shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
            <p className="text-xs text-brand-text-nav font-medium leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
