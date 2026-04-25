import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Plus, X, MessageSquare, Check } from "lucide-react";
import { PregnancyState, ClinicVisit } from "../types";
import { cn } from "../lib/utils";

interface ClinicTrackerProps {
  stage: PregnancyState;
  setStage: (stage: PregnancyState) => void;
}

export default function ClinicTracker({ stage, setStage }: ClinicTrackerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= days; i++) {
    calendarDays.push(i);
  }

  const getVisitForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return stage.visits.find(v => v.date === dateStr);
  };

  const handleSaveVisit = () => {
    if (!selectedDate) return;
    
    const newVisit: ClinicVisit = { date: selectedDate, note: note || "Went for clinic visit." };
    const filteredVisits = stage.visits.filter(v => v.date !== selectedDate);
    
    setStage({
      ...stage,
      visits: [...filteredVisits, newVisit]
    });
    
    setIsAdding(false);
    setNote("");
  };

  const removeVisit = (date: string) => {
    setStage({
      ...stage,
      visits: stage.visits.filter(v => v.date !== date)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="text-brand-accent w-5 h-5" />
        <h3 className="font-serif font-bold text-brand-primary">Maternal Clinic Calendar</h3>
      </div>

      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-brand-border-light">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <h4 className="font-serif font-bold text-xl text-brand-primary">{monthName} {year}</h4>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-brand-bg-sidebar rounded-full transition-colors">
              <ChevronLeft size={20} className="text-brand-text-muted" />
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-brand-bg-sidebar rounded-full transition-colors">
              <ChevronRight size={20} className="text-brand-text-muted" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-[10px] font-bold text-brand-text-muted uppercase tracking-widest py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, i) => {
            if (day === null) return <div key={i} />;
            
            const visit = getVisitForDate(day);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(dateStr);
                  setIsAdding(true);
                  if (visit) setNote(visit.note);
                  else setNote("");
                }}
                className={cn(
                  "aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all border",
                  isToday ? "border-brand-accent" : "border-transparent",
                  isSelected ? "bg-brand-accent text-white" : visit ? "bg-brand-primary text-white" : "hover:bg-brand-bg-sidebar text-brand-text-dark"
                )}
              >
                <span className="text-sm font-bold">{day}</span>
                {visit && !isSelected && (
                  <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-white/50" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visit Detail / Entry */}
      <div className="space-y-4">
        {isAdding && selectedDate && (
          <div className="bg-brand-bg-sidebar rounded-[24px] p-6 border border-brand-border-light shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-brand-primary text-sm">
                Visit for {new Date(selectedDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </h5>
              <button onClick={() => setIsAdding(false)} className="text-brand-text-muted">
                <X size={18} />
              </button>
            </div>
            
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="E.g., Went for clinic visit, blood pressure was good..."
              className="w-full bg-white rounded-2xl p-4 text-xs border border-brand-border-light outline-none focus:border-brand-accent transition-all min-h-[100px] mb-4 resize-none"
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleSaveVisit}
                className="flex-1 bg-brand-primary text-white rounded-xl py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Check size={16} />
                Save Visit
              </button>
              {stage.visits.find(v => v.date === selectedDate) && (
                <button
                  onClick={() => {
                    removeVisit(selectedDate);
                    setIsAdding(false);
                  }}
                  className="px-4 border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Recent History List */}
        {!isAdding && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Plus className="text-brand-text-muted w-4 h-4" />
              <span className="text-[10px] font-bold uppercase text-brand-text-muted tracking-widest">Recent Activity</span>
            </div>
            <div className="space-y-3">
              {stage.visits.length > 0 ? (
                stage.visits.slice().reverse().slice(0, 3).map((visit, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-brand-border-light flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-bg-sidebar rounded-xl flex items-center justify-center shrink-0 border border-brand-border-light">
                      <Check className="text-brand-primary w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">{new Date(visit.date).toLocaleDateString()}</p>
                      <p className="text-xs text-brand-text-dark font-medium mt-1">{visit.note}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-brand-bg-sidebar rounded-[24px] border border-dashed border-brand-border">
                  <MessageSquare className="mx-auto text-brand-border mb-2" size={24} />
                  <p className="text-xs text-brand-text-muted">No visits logged yet. Click a date to start.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
