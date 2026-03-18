import { useState, useCallback } from "react";
import HomePage from "@/components/HomePage";
import ServicesPage from "@/components/ServicesPage";
import BookingPage from "@/components/BookingPage";
import ProfilePage from "@/components/ProfilePage";
import GalleryAdmin from "@/components/GalleryAdmin";
import BottomNav from "@/components/BottomNav";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá, gostaria de agendar um horário na Polly Estética de Unhas");

export type AppPage = "home" | "services" | "booking" | "profile" | "gallery-admin";

const Index = () => {
  const [page, setPage] = useState<AppPage>("home");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  const fetchGallery = useCallback(async () => {
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });
    setGalleryItems(data || []);
  }, []);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`, "_blank");
  };

  const handleBook = (service?: string) => {
    if (service) setSelectedService(service);
    setPage("booking");
  };

  const handleGalleryAdmin = () => {
    fetchGallery();
    setPage("gallery-admin");
  };

  return (
    <div className="relative min-h-screen max-w-[480px] mx-auto bg-background overflow-hidden">
      {page === "home" && <HomePage onNavigate={setPage} onBook={handleBook} onWhatsApp={openWhatsApp} />}
      {page === "services" && <ServicesPage onBook={handleBook} />}
      {page === "booking" && <BookingPage selectedService={selectedService} onWhatsApp={openWhatsApp} />}
      {page === "profile" && <ProfilePage onBook={handleBook} />}
      {page === "gallery-admin" && <GalleryAdmin items={galleryItems} onRefresh={fetchGallery} />}
      <WhatsAppFloat onClick={openWhatsApp} />
      <BottomNav current={page} onNavigate={setPage} onGalleryAdmin={handleGalleryAdmin} />
    </div>
  );
};

export default Index;
