import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";

interface GalleryItem {
  before: string;
  after: string;
  label: string;
}

const fallbackItems: GalleryItem[] = [
  { before: before1, after: after1, label: "Alongamento em Gel" },
];

const CompareSlider = ({ before, after, label }: GalleryItem) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updatePos(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={containerRef}
        className="relative w-full aspect-square rounded-xl overflow-hidden cursor-col-resize select-none touch-none border border-border"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img src={after} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt="Antes" className="w-full h-full object-cover" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/90 shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-foreground/90 border-2 border-gold flex items-center justify-center shadow-gold">
            <span className="text-charcoal text-xs font-bold select-none">⇔</span>
          </div>
        </div>
        <span className="absolute top-3 left-3 bg-charcoal/70 backdrop-blur-sm text-primary-foreground font-body text-[10px] uppercase tracking-widest px-2 py-1 rounded">
          Antes
        </span>
        <span className="absolute top-3 right-3 bg-gold/80 backdrop-blur-sm text-primary-foreground font-body text-[10px] uppercase tracking-widest px-2 py-1 rounded">
          Depois
        </span>
      </div>
      <p className="font-body text-xs text-muted-foreground text-center tracking-wide">{label}</p>
    </div>
  );
};

const BeforeAfterGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>(fallbackItems);

  useEffect(() => {
    supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setItems(
            data.map((d) => ({
              before: d.before_url,
              after: d.after_url,
              label: d.label,
            }))
          );
        }
      });
  }, []);

  return (
    <div className="px-6 mt-10">
      <h2 className="font-display text-2xl text-foreground tracking-wide mb-2">Antes & Depois</h2>
      <p className="font-body text-xs text-muted-foreground mb-5 tracking-wide">
        Arraste para comparar os resultados
      </p>
      <div className="flex flex-col gap-5">
        {items.map((item, i) => (
          <CompareSlider key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterGallery;
