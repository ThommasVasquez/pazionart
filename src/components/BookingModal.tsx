"use client";

import { useState } from "react";
import { X, Calendar, Users, Home, CheckCircle2, MessageSquare } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChalet?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedChalet = "Chalet Niebla & Fuego",
}: BookingModalProps) {
  const [chalet, setChalet] = useState(selectedChalet);
  const [guests, setGuests] = useState("2 Huéspedes");
  const [dates, setDates] = useState("");
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // WhatsApp direct fallback
    const message = encodeURIComponent(
      `Hola Pazionart, mi nombre es ${name}. Deseo consultar disponibilidad para ${chalet}, para ${guests}, en las fechas: ${dates || "Por definir"}. Mi contacto es ${emailOrPhone}. ¡Gracias!`
    );
    setTimeout(() => {
      window.open(`https://wa.me/?text=${message}`, "_blank");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#151D14]/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl glass-panel-dark bg-[#212B20]/95 border border-[#8D996E]/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-[#F5F2ED] z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#F5F2ED]/60 hover:text-[#F5F2ED] hover:bg-[#8D996E]/20 transition-all cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#8D996E]/20 text-[#8D996E] flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-light tracking-wide text-[#F5F2ED] mb-3">
              Solicitud de Pausa Recibida
            </h3>
            <p className="text-sm text-[#F5F2ED]/70 max-w-md mb-8 leading-relaxed">
              Gracias, <span className="text-[#8D996E] font-medium">{name}</span>. Te
              estamos redirigiendo a nuestra línea directa de hospitalidad consciente
              para coordinar cada detalle de tu estancia.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] text-[#F5F2ED] hover:bg-[#bd7356] transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8D996E] font-semibold">
                Hospitalidad & Pausa Consciente
              </span>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-[#F5F2ED] mt-1 font-sans">
                Reserva tu Estadía en los Chalets
              </h2>
              <p className="text-xs md:text-sm text-[#F5F2ED]/70 mt-2 leading-relaxed">
                Elige tu refugio en la naturaleza y prepárate para reconectar con el arte, la calma y el servicio desde el corazón.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8D996E] mb-1.5">
                  Chalet de Preferencia
                </label>
                <div className="relative">
                  <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D996E]" />
                  <select
                    value={chalet}
                    onChange={(e) => setChalet(e.target.value)}
                    className="w-full bg-[#151D14]/80 border border-[#8D996E]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-[#F5F2ED] focus:outline-none focus:border-[#A45D41] transition-colors"
                  >
                    <option value="Chalet Niebla & Fuego">Chalet Niebla & Fuego (Vista al Bosque Nuboso)</option>
                    <option value="Chalet Bosque Andino">Chalet Bosque Andino (Inmersión Biofílica)</option>
                    <option value="Chalet El Refugio de Arte">Chalet El Refugio de Arte (Terraza & Taller)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8D996E] mb-1.5">
                    Huéspedes
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D996E]" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-[#151D14]/80 border border-[#8D996E]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-[#F5F2ED] focus:outline-none focus:border-[#A45D41] transition-colors"
                    >
                      <option value="1 Huésped">1 Huésped (Retiro individual)</option>
                      <option value="2 Huéspedes">2 Huéspedes (Escapada en pareja)</option>
                      <option value="3-4 Huéspedes">3-4 Huéspedes (Pequeño grupo/familia)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8D996E] mb-1.5">
                    Fechas Aproximadas
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D996E]" />
                    <input
                      type="text"
                      placeholder="Ej. Fin de semana próximo"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="w-full bg-[#151D14]/80 border border-[#8D996E]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-[#F5F2ED] placeholder-[#F5F2ED]/30 focus:outline-none focus:border-[#A45D41] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8D996E] mb-1.5">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre y apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#151D14]/80 border border-[#8D996E]/30 rounded-xl px-4 py-3 text-sm text-[#F5F2ED] placeholder-[#F5F2ED]/30 focus:outline-none focus:border-[#A45D41] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8D996E] mb-1.5">
                  Correo Electrónico o Teléfono
                </label>
                <input
                  type="text"
                  required
                  placeholder="tucorreo@ejemplo.com o +57..."
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full bg-[#151D14]/80 border border-[#8D996E]/30 rounded-xl px-4 py-3 text-sm text-[#F5F2ED] placeholder-[#F5F2ED]/30 focus:outline-none focus:border-[#A45D41] transition-colors"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar y Conectar por WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
