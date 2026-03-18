import { useState } from "react";
import HomePage from "@/components/HomePage";
import ServicesPage from "@/components/ServicesPage";
import BookingPage from "@/components/BookingPage";
import ProfilePage from "@/components/ProfilePage";
import BottomNav from "@/components/BottomNav";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá, gostaria de agendar um horário na Polly Estética de Unhas");

export type AppPage = "home" | "services" | "booking" | "profile";

const Index = () => {
  const [page, setPage] = useState<AppPage>("home");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`, "_blank");
  };

  const handleBook = (service?: string) => {
    if (service) setSelectedService(service);
    setPage("booking");
  };

  return (
    <div className="relative min-h-screen max-w-[480px] mx-auto bg-background overflow-hidden">
      {page === "home" && <HomePage onNavigate={setPage} onBook={handleBook} onWhatsApp={openWhatsApp} />}
      {page === "services" && <ServicesPage onBook={handleBook} />}
      {page === "booking" && <BookingPage selectedService={selectedService} onWhatsApp={openWhatsApp} />}
      {page === "profile" && <ProfilePage onBook={handleBook} />}
      <WhatsAppFloat onClick={openWhatsApp} />
      <BottomNav current={page} onNavigate={setPage} />
    </div>
  );
};

export default Index;
