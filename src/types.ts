
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY' | 'NONE';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string; // The full raw response from Gemini
  mainResponse: string;
  translation: string;
  risk?: RiskLevel;
  timestamp: number;
}

export interface ClinicVisit {
  date: string; // YYYY-MM-DD
  note: string;
}

export interface PregnancyState {
  weeks: number;
  months: number;
  district?: string;
  visits: ClinicVisit[];
  lastUpdated: number;
}
