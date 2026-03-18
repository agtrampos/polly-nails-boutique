import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const professionals = ["Polly", "Amanda", "Carla"];

const generateDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const weekday = (d: Date) => d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");

interface Props {
  selectedService: string | null;
  onWhatsApp: () => void;
}

const BookingPage = ({ selectedService, onWhatsApp }: Props) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPro, setSelectedPro] = useState<string>(professionals[0]);
  const [confirmed, setConfirmed] = useState(false);
  const days = generateDays();

  if (confirmed) {
    return (
      <div className="pb-24 pt-2 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
          <Check size={32} className="text-gold" />
        </div>
        <h2 className="font-display text-2xl text-foreground mb-2">Agendamento confirmado!</h2>
        <p className="font-body text-sm text-muted-foreground mb-8">
          {selectedService} • {days[selectedDay].toLocaleDateString("pt-BR")} às {selectedTime} com {selectedPro}
        </p>
        <button
          onClick={onWhatsApp}
          className="flex items-center gap-2 bg-whatsapp text-primary-foreground px-6 py-4 rounded-lg font-body text-sm font-medium tracking-widest uppercase hover:brightness-110 transition-all active:scale-95"
        >
          <MessageCircle size={18} fill="currentColor" />
          Confirmar pelo WhatsApp
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-2">
      <div className="px-6 py-6">
        <h1 className="font-display text-3xl text-foreground tracking-wide">Agendar</h1>
        {selectedService && (
          <p className="font-body text-xs text-gold mt-1 tracking-wide font-medium">{selectedService}</p>
        )}
      </div>

      {/* Date selector */}
      <div className="px-6 mb-6">
        <h3 className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Escolha o dia</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-shrink-0 flex flex-col items-center py-3 px-4 rounded-xl transition-all ${
                selectedDay === i
                  ? "bg-gold text-primary-foreground shadow-gold"
                  : "bg-card border border-border text-foreground hover:border-gold/40"
              }`}
            >
              <span className="font-body text-[10px] uppercase tracking-wider">{weekday(d)}</span>
              <span className="font-display text-lg">{d.getDate()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="px-6 mb-6">
        <h3 className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Horário</h3>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`py-2.5 rounded-lg font-body text-xs transition-all ${
                selectedTime === t
                  ? "bg-gold text-primary-foreground shadow-gold"
                  : "bg-card border border-border text-foreground hover:border-gold/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Professional */}
      <div className="px-6 mb-8">
        <h3 className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Profissional</h3>
        <div className="flex gap-2">
          {professionals.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPro(p)}
              className={`px-5 py-2.5 rounded-full font-body text-xs transition-all ${
                selectedPro === p
                  ? "bg-gold text-primary-foreground shadow-gold"
                  : "bg-card border border-border text-foreground hover:border-gold/40"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6">
        <button
          onClick={() => selectedTime && setConfirmed(true)}
          disabled={!selectedTime}
          className="w-full py-4 rounded-lg font-body text-sm font-medium tracking-widest uppercase transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed bg-gold text-primary-foreground shadow-gold hover:brightness-110"
        >
          👉 Confirmar agendamento
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
