import React from "react";
import { DISTRICT_CLINICS } from "../constants";
import { MapPin, Phone, Hospital } from "lucide-react";

interface ClinicListProps {
  district: string;
}

export default function ClinicList({ district }: ClinicListProps) {
  const clinics = DISTRICT_CLINICS[district] || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Hospital className="text-brand-accent w-5 h-5" />
        <h3 className="font-serif font-bold text-brand-primary">Clinics in {district}</h3>
      </div>
      
      {clinics.length > 0 ? (
        clinics.map((clinic, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-brand-border-light shadow-sm hover:border-brand-accent/30 transition-all">
            <h4 className="font-bold text-brand-text-dark mb-1">{clinic.name}</h4>
            <div className="flex items-center gap-2 text-xs text-brand-text-muted mb-2">
              <MapPin size={12} />
              <span>{clinic.location}</span>
            </div>
            <a 
              href={`tel:${clinic.phone}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:underline"
            >
              <Phone size={12} />
              <span>{clinic.phone}</span>
            </a>
          </div>
        ))
      ) : (
        <p className="text-sm text-brand-text-muted italic">Please select a district to see nearby clinics.</p>
      )}
    </div>
  );
}
