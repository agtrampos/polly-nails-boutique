import { CalendarDays, Heart, RotateCcw } from "lucide-react";

const history = [
  { service: "Manicure Premium", date: "10 Mar 2026", pro: "Polly" },
  { service: "Nail Design", date: "25 Fev 2026", pro: "Amanda" },
  { service: "Alongamento de Unhas", date: "12 Fev 2026", pro: "Polly" },
];

interface Props {
  onBook: (service: string) => void;
}

const ProfilePage = ({ onBook }: Props) => (
  <div className="pb-24 pt-2">
    <div className="px-6 py-6">
      <h1 className="font-display text-3xl text-foreground tracking-wide">Meu Perfil</h1>
    </div>

    {/* Favorites */}
    <div className="px-6 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Heart size={14} className="text-gold" />
        <h3 className="font-body text-xs text-muted-foreground uppercase tracking-widest">Favoritos</h3>
      </div>
      <div className="flex gap-2">
        {["Manicure Premium", "Nail Design"].map((s) => (
          <button
            key={s}
            onClick={() => onBook(s)}
            className="bg-card border border-border rounded-full px-4 py-2 font-body text-xs text-foreground hover:border-gold/40 transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </div>

    {/* History */}
    <div className="px-6">
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays size={14} className="text-gold" />
        <h3 className="font-body text-xs text-muted-foreground uppercase tracking-widest">Histórico</h3>
      </div>
      <div className="flex flex-col gap-3">
        {history.map((h, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between animate-fade-up">
            <div>
              <p className="font-body text-sm text-foreground font-medium">{h.service}</p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                {h.date} • {h.pro}
              </p>
            </div>
            <button
              onClick={() => onBook(h.service)}
              className="flex items-center gap-1 text-gold font-body text-xs hover:underline"
            >
              <RotateCcw size={12} /> Reagendar
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProfilePage;
