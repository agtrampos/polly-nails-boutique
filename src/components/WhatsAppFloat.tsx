import { MessageCircle } from "lucide-react";

const WhatsAppFloat = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-20 right-4 z-50 flex items-center gap-2 bg-whatsapp text-primary-foreground pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 max-w-[480px]"
    aria-label="WhatsApp"
  >
    <MessageCircle size={20} fill="currentColor" />
    <span className="text-xs font-body font-medium tracking-wide">Atendimento rápido</span>
  </button>
);

export default WhatsAppFloat;
