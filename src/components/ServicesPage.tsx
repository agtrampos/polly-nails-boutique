import { Clock, ArrowRight } from "lucide-react";

const services = [
  { name: "Alongamento de Unhas", price: "R$ 150", time: "2h", desc: "Fibra de vidro ou gel com acabamento premium" },
  { name: "Manicure Premium", price: "R$ 80", time: "1h", desc: "Esmaltação em gel com hidratação profunda" },
  { name: "Nail Design", price: "R$ 120", time: "1h30", desc: "Arte personalizada com técnicas exclusivas" },
  { name: "Spa das Mãos", price: "R$ 100", time: "1h15", desc: "Esfoliação, hidratação e massagem relaxante" },
];

interface Props {
  onBook: (service: string) => void;
}

const ServicesPage = ({ onBook }: Props) => (
  <div className="pb-24 pt-2">
    <div className="px-6 py-6">
      <h1 className="font-display text-3xl text-foreground tracking-wide">Serviços</h1>
      <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">Escolha o tratamento ideal para você</p>
    </div>
    <div className="px-6 flex flex-col gap-4">
      {services.map((s) => (
        <div
          key={s.name}
          className="bg-card border border-border rounded-xl p-5 hover:border-gold/40 transition-all animate-fade-up"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-lg text-foreground">{s.name}</h3>
            <span className="font-body text-sm font-semibold text-gold">{s.price}</span>
          </div>
          <p className="font-body text-xs text-muted-foreground mb-3 leading-relaxed">{s.desc}</p>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock size={14} />
              <span className="font-body text-xs">{s.time}</span>
            </span>
            <button
              onClick={() => onBook(s.name)}
              className="flex items-center gap-1.5 bg-gold/10 text-gold px-4 py-2 rounded-full font-body text-xs font-medium tracking-wide hover:bg-gold hover:text-primary-foreground transition-all active:scale-95"
            >
              Agendar <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ServicesPage;
