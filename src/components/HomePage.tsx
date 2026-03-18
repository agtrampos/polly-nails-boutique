import heroImg from "@/assets/hero-nails.jpg";
import logoImg from "@/assets/logo.png";
import { CalendarDays, MessageCircle, Wallet, Clock } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { AppPage } from "@/pages/Index";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";

interface Props {
  onNavigate: (p: AppPage) => void;
  onBook: () => void;
  onWhatsApp: () => void;
}

type Appointment = { time: string; name?: string };
const HOURS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:30", "17:00"];

const HomePage = ({ onNavigate, onBook, onWhatsApp }: Props) => {
  const [appointments] = useLocalStorage<Appointment[]>("appointments", []);
  const [blocked] = useLocalStorage<string[]>("agenda-blocked", []);
  const nextTimes = HOURS.filter((h) => appointments.some((a) => a.time === h)).slice(0, 3);
  const freeTimes = HOURS.filter((h) => !appointments.some((a) => a.time === h) && !blocked.includes(h)).slice(0, 2);

  return (
  <div className="pb-24">
    {/* Hero */}
    <div className="relative h-[70vh] overflow-hidden">
      <img src={heroImg} alt="Unhas elegantes" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 text-center px-6 animate-fade-up">
        <img src={logoImg} alt="Polly Estética de Unhas" className="h-72 sm:h-96 mb-6 drop-shadow-2xl border-2 border-gold/30 rounded-2xl p-4 bg-charcoal/20 backdrop-blur-sm" />
        <div className="w-16 h-px bg-gold/60 mb-5" />
        <h1 className="font-display text-3xl sm:text-4xl font-light text-primary-foreground tracking-[0.15em] leading-tight">
          Sua agenda profissional, sem complicação
        </h1>
        <p className="font-body text-xs sm:text-sm text-primary-foreground/60 mt-3 font-light tracking-widest uppercase max-w-[320px]">
          Organize atendimentos, clientes e tarefas em um só lugar
        </p>
      </div>
    </div>

    <div className="px-6 -mt-10 relative z-10">
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <p className="font-body text-sm text-foreground">
          Hoje você tem <span className="text-gold font-semibold">{appointments.length}</span> atendimentos agendados
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays size={16} />
              <span className="font-body text-[11px] uppercase tracking-widest">Próximos horários</span>
            </div>
            <p className="font-body text-sm text-foreground mt-2">{nextTimes.length ? nextTimes.join(" • ") : "—"}</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet size={16} />
              <span className="font-body text-[11px] uppercase tracking-widest">Faturamento do dia</span>
            </div>
            <p className="font-body text-sm text-foreground mt-2">—</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={16} />
              <span className="font-body text-[11px] uppercase tracking-widest">Horários livres</span>
            </div>
            <p className="font-body text-sm text-foreground mt-2">{freeTimes.length ? freeTimes.join(" • ") : "—"}</p>
          </div>
        </div>
        <button
          onClick={onBook}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gold text-primary-foreground py-3 rounded-lg font-body text-xs font-medium tracking-widest hover:brightness-110 transition-all active:scale-[0.98]"
        >
          + Novo agendamento
        </button>
      </div>
    </div>

    {/* CTAs */}
    <div className="px-6 -mt-6 relative z-10 flex flex-col gap-3">
      <button
        onClick={onBook}
        className="w-full flex items-center justify-center gap-2 bg-gold text-primary-foreground py-4 rounded-lg font-body text-sm font-medium tracking-widest uppercase shadow-gold hover:brightness-110 transition-all active:scale-[0.98]"
      >
        <CalendarDays size={18} />
        Agendar agora
      </button>
      <button
        onClick={onWhatsApp}
        className="w-full flex items-center justify-center gap-2 bg-whatsapp/90 text-primary-foreground py-4 rounded-lg font-body text-sm font-medium tracking-widest uppercase hover:bg-whatsapp transition-all active:scale-[0.98]"
      >
        <MessageCircle size={18} fill="currentColor" />
        Falar no WhatsApp
      </button>
    </div>

    {/* Quick Services */}
    <div className="px-6 mt-10">
      <h2 className="font-display text-2xl text-foreground tracking-wide mb-4">Nossos Serviços</h2>
      <div className="grid grid-cols-2 gap-3">
        {["Alongamento", "Manicure Premium", "Nail Design", "Spa das Mãos"].map((s) => (
          <button
            key={s}
            onClick={() => onNavigate("services")}
            className="bg-card border border-border rounded-lg p-4 text-left hover:border-gold/50 hover:shadow-gold/10 hover:shadow-md transition-all group"
          >
            <span className="font-body text-xs font-medium tracking-wide text-foreground group-hover:text-gold transition-colors">
              {s}
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Before & After Gallery */}
    <BeforeAfterGallery />
  </div>
  );
};

export default HomePage;
