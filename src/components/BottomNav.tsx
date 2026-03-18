import { Home, Sparkles, CalendarDays, User, ImagePlus } from "lucide-react";
import type { AppPage } from "@/pages/Index";

const tabs: { id: AppPage; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Início", icon: Home },
  { id: "services", label: "Serviços", icon: Sparkles },
  { id: "booking", label: "Agendar", icon: CalendarDays },
  { id: "gallery-admin", label: "Galeria", icon: ImagePlus },
  { id: "profile", label: "Perfil", icon: User },
];

const BottomNav = ({
  current,
  onNavigate,
  onGalleryAdmin,
}: {
  current: AppPage;
  onNavigate: (p: AppPage) => void;
  onGalleryAdmin?: () => void;
}) => (
  <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card/95 backdrop-blur-md border-t border-border z-40">
    <div className="flex justify-around py-2">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => (id === "gallery-admin" && onGalleryAdmin ? onGalleryAdmin() : onNavigate(id))}
          className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
            current === id ? "text-gold" : "text-muted-foreground"
          }`}
        >
          <Icon size={20} strokeWidth={current === id ? 2 : 1.5} />
          <span className="text-[10px] font-body font-medium tracking-wide">{label}</span>
        </button>
      ))}
    </div>
  </nav>
);

export default BottomNav;
