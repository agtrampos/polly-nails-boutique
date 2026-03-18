import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GalleryItem {
  id: string;
  label: string;
  before_url: string;
  after_url: string;
}

interface Props {
  items: GalleryItem[];
  onRefresh: () => void;
}

const GalleryAdmin = ({ items, onRefresh }: Props) => {
  const [label, setLabel] = useState("");
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadFile = async (file: File, prefix: string) => {
    const ext = file.name.split(".").pop();
    const path = `${prefix}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("gallery").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("gallery").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!label || !beforeFile || !afterFile) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const [beforeUrl, afterUrl] = await Promise.all([
        uploadFile(beforeFile, "before"),
        uploadFile(afterFile, "after"),
      ]);
      const { error } = await supabase.from("gallery_items").insert({
        label,
        before_url: beforeUrl,
        after_url: afterUrl,
      });
      if (error) throw error;
      setLabel("");
      setBeforeFile(null);
      setAfterFile(null);
      if (beforeRef.current) beforeRef.current.value = "";
      if (afterRef.current) afterRef.current.value = "";
      toast({ title: "Foto adicionada com sucesso!" });
      onRefresh();
    } catch (e: any) {
      toast({ title: "Erro ao enviar", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("gallery_items").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div className="pb-24 pt-2">
      <div className="px-6 py-6">
        <h1 className="font-display text-3xl text-foreground tracking-wide">Gerenciar Galeria</h1>
        <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">
          Adicione fotos de antes e depois dos seus trabalhos
        </p>
      </div>

      <div className="px-6">
        {/* Upload form */}
        <div className="bg-card border border-border rounded-xl p-5 mb-6">
          <h3 className="font-display text-lg text-foreground mb-4">Nova foto</h3>

          <label className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1 block">
            Serviço realizado
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ex: Alongamento em Gel"
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 font-body text-sm text-foreground mb-4 focus:outline-none focus:ring-1 focus:ring-gold"
          />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1 block">
                Foto Antes
              </label>
              <button
                type="button"
                onClick={() => beforeRef.current?.click()}
                className="w-full h-24 bg-background border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-gold/50 transition-colors"
              >
                {beforeFile ? (
                  <img src={URL.createObjectURL(beforeFile)} alt="" className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <>
                    <ImagePlus size={20} className="text-muted-foreground" />
                    <span className="font-body text-[10px] text-muted-foreground">Selecionar</span>
                  </>
                )}
              </button>
              <input ref={beforeRef} type="file" accept="image/*" className="hidden" onChange={(e) => setBeforeFile(e.target.files?.[0] || null)} />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1 block">
                Foto Depois
              </label>
              <button
                type="button"
                onClick={() => afterRef.current?.click()}
                className="w-full h-24 bg-background border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-gold/50 transition-colors"
              >
                {afterFile ? (
                  <img src={URL.createObjectURL(afterFile)} alt="" className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <>
                    <ImagePlus size={20} className="text-muted-foreground" />
                    <span className="font-body text-[10px] text-muted-foreground">Selecionar</span>
                  </>
                )}
              </button>
              <input ref={afterRef} type="file" accept="image/*" className="hidden" onChange={(e) => setAfterFile(e.target.files?.[0] || null)} />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 bg-gold text-primary-foreground py-3 rounded-lg font-body text-xs font-medium tracking-widest uppercase hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? "Enviando..." : "Adicionar à galeria"}
          </button>
        </div>

        {/* Existing items */}
        <h3 className="font-display text-lg text-foreground mb-3">Fotos na galeria ({items.length})</h3>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
              <div className="flex gap-2 shrink-0">
                <img src={item.before_url} alt="Antes" className="w-14 h-14 rounded-lg object-cover" />
                <img src={item.after_url} alt="Depois" className="w-14 h-14 rounded-lg object-cover" />
              </div>
              <span className="font-body text-sm text-foreground flex-1 truncate">{item.label}</span>
              <button onClick={() => handleDelete(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="font-body text-xs text-muted-foreground text-center py-8">
              Nenhuma foto adicionada ainda
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryAdmin;
