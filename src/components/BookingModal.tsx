"use client";

import { useState } from "react";
import { X, Calendar, Users, Home, CheckCircle2, MessageSquare } from "lucide-react";
import { startSafeViewTransition } from "@/lib/viewTransition";
import { usePreferences } from "@/context/PreferencesContext";

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
  const { theme, t } = usePreferences();
  const isLight = theme === "light";

  const [chalet, setChalet] = useState(selectedChalet);
  const [guests, setGuests] = useState("2 Huéspedes");
  const [dates, setDates] = useState("");
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isRestaurant =
    selectedChalet.toLowerCase().includes("fogón") ||
    selectedChalet.toLowerCase().includes("restaurante") ||
    selectedChalet.toLowerCase().includes("mesa");

  if (!isOpen) return null;

  const handleSafeClose = () => {
    startSafeViewTransition(() => {
      onClose();
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startSafeViewTransition(() => {
      setSubmitted(true);
    });
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
        onClick={handleSafeClose}
        className={`fixed inset-0 backdrop-blur-md transition-opacity duration-300 ${
          isLight
            ? "bg-[#140D0B]/50"
            : isRestaurant
            ? "bg-[#140D0B]/85"
            : "bg-[#151D14]/85"
        }`}
      />

      {/* Modal Dialog */}
      <div
        style={{ viewTransitionName: "booking-modal-card" }}
        className={`relative w-full max-w-xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto backdrop-blur-xl transition-colors duration-500 ${
          isLight
            ? isRestaurant
              ? "bg-[#FAF6F0] text-[#2A1B14] border border-[#A45D41]/30 shadow-2xl"
              : "bg-[#F7F5EE] text-[#1A2219] border border-[#8D996E]/30 shadow-2xl"
            : isRestaurant
            ? "bg-[#1C1512]/98 text-[#F5F2ED] border border-[#A45D41]/35"
            : "bg-[#212B20]/95 text-[#F5F2ED] border border-[#8D996E]/30 glass-panel-dark"
        }`}
      >
        <button
          onClick={handleSafeClose}
          className={`absolute top-6 right-6 p-2 rounded-full transition-all cursor-pointer ${
            isLight
              ? isRestaurant
                ? "text-[#2A1B14]/60 hover:text-[#2A1B14] hover:bg-[#A45D41]/10"
                : "text-[#1A2219]/60 hover:text-[#1A2219] hover:bg-[#8D996E]/15"
              : isRestaurant
              ? "text-[#F5F2ED]/60 hover:text-[#F5F2ED] hover:bg-[#A45D41]/20"
              : "text-[#F5F2ED]/60 hover:text-[#F5F2ED] hover:bg-[#8D996E]/20"
          }`}
          aria-label={t.modal.closeBtn}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                isRestaurant
                  ? "bg-[#A45D41]/20 text-[#D48B6A]"
                  : isLight
                  ? "bg-[#5B6D49]/20 text-[#5B6D49]"
                  : "bg-[#8D996E]/20 text-[#8D996E]"
              }`}
            >
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3
              className={`text-2xl font-light tracking-wide mb-3 ${
                isLight
                  ? isRestaurant
                    ? "text-[#2A1B14]"
                    : "text-[#1A2219]"
                  : "text-[#F5F2ED]"
              }`}
            >
              {t.modal.successTitle}
            </h3>
            <p
              className={`text-sm max-w-md mb-8 leading-relaxed ${
                isLight ? "text-[#1A2219]/70" : "text-[#F5F2ED]/70"
              }`}
            >
              {t.modal.successDescP1}{" "}
              <span className={`font-medium ${isRestaurant ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>
                {name}
              </span>
              {t.modal.successDescP2}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] text-[#F5F2ED] hover:bg-[#bd7356] transition-colors cursor-pointer"
            >
              {t.modal.closeBtn}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span
                className={`text-xs uppercase tracking-[0.25em] font-semibold ${
                  isRestaurant
                    ? "text-[#D48B6A]"
                    : isLight
                    ? "text-[#5B6D49]"
                    : "text-[#8D996E]"
                }`}
              >
                {isRestaurant ? t.modal.restaurantTitle : t.modal.chaletTitle}
              </span>
              <h2
                className={`text-2xl md:text-3xl font-light tracking-wide mt-1 font-sans ${
                  isLight
                    ? isRestaurant
                      ? "text-[#2A1B14]"
                      : "text-[#1A2219]"
                    : "text-[#F5F2ED]"
                }`}
              >
                {isRestaurant ? t.restaurant.tableBookingTitle : t.configurator.bookBtn}
              </h2>
              <p
                className={`text-xs md:text-sm mt-2 leading-relaxed ${
                  isLight ? "text-[#1A2219]/75" : "text-[#F5F2ED]/70"
                }`}
              >
                {t.modal.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-xs uppercase tracking-wider mb-1.5 ${
                    isRestaurant
                      ? "text-[#D48B6A]"
                      : isLight
                      ? "text-[#5B6D49]"
                      : "text-[#8D996E]"
                  }`}
                >
                  {t.modal.unitLabel}
                </label>
                <div className="relative">
                  <Home
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      isRestaurant
                        ? "text-[#D48B6A]"
                        : isLight
                        ? "text-[#5B6D49]"
                        : "text-[#8D996E]"
                    }`}
                  />
                  <select
                    value={chalet}
                    onChange={(e) => setChalet(e.target.value)}
                    className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors ${
                      isLight
                        ? isRestaurant
                          ? "bg-white text-[#2A1B14] border border-[#A45D41]/30 focus:border-[#D48B6A]"
                          : "bg-white text-[#1A2219] border border-[#8D996E]/35 focus:border-[#5B6D49]"
                        : isRestaurant
                        ? "bg-[#140D0B]/85 text-[#F5F2ED] border border-[#A45D41]/30 focus:border-[#D48B6A]"
                        : "bg-[#151D14]/80 text-[#F5F2ED] border border-[#8D996E]/30 focus:border-[#A45D41]"
                    }`}
                  >
                    {isRestaurant ? (
                      <>
                        <option value="Mesa Íntima en el Fogón" className={isLight ? "bg-white" : "bg-[#1C1512]"}>
                          Mesa Íntima en el Fogón
                        </option>
                        <option value="Mesa Terraza con Vista a la Montaña" className={isLight ? "bg-white" : "bg-[#1C1512]"}>
                          Mesa Terraza Panorámica
                        </option>
                        <option value="Menú Degustación 4 Tiempos" className={isLight ? "bg-white" : "bg-[#1C1512]"}>
                          Menú Degustación Completo (4 Tiempos)
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="Chalet Niebla & Fuego" className={isLight ? "bg-white" : "bg-[#212B20]"}>
                          Chalet Niebla & Fuego
                        </option>
                        <option value="Chalet Bosque Andino" className={isLight ? "bg-white" : "bg-[#212B20]"}>
                          Chalet Bosque Andino
                        </option>
                        <option value="Chalet El Refugio de Arte" className={isLight ? "bg-white" : "bg-[#212B20]"}>
                          Chalet El Refugio de Arte
                        </option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider mb-1.5 ${
                      isRestaurant
                        ? "text-[#D48B6A]"
                        : isLight
                        ? "text-[#5B6D49]"
                        : "text-[#8D996E]"
                    }`}
                  >
                    {t.modal.guestsLabel}
                  </label>
                  <div className="relative">
                    <Users
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        isRestaurant
                          ? "text-[#D48B6A]"
                          : isLight
                          ? "text-[#5B6D49]"
                          : "text-[#8D996E]"
                      }`}
                    />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors ${
                        isLight
                          ? isRestaurant
                            ? "bg-white text-[#2A1B14] border border-[#A45D41]/30 focus:border-[#D48B6A]"
                            : "bg-white text-[#1A2219] border border-[#8D996E]/35 focus:border-[#5B6D49]"
                          : isRestaurant
                          ? "bg-[#140D0B]/85 text-[#F5F2ED] border border-[#A45D41]/30 focus:border-[#D48B6A]"
                          : "bg-[#151D14]/80 text-[#F5F2ED] border border-[#8D996E]/30 focus:border-[#A45D41]"
                      }`}
                    >
                      <option value="1 Persona" className={isLight ? "bg-white" : isRestaurant ? "bg-[#1C1512]" : "bg-[#212B20]"}>
                        1 Persona
                      </option>
                      <option value="2 Personas" className={isLight ? "bg-white" : isRestaurant ? "bg-[#1C1512]" : "bg-[#212B20]"}>
                        2 Personas
                      </option>
                      <option value="3-4 Personas" className={isLight ? "bg-white" : isRestaurant ? "bg-[#1C1512]" : "bg-[#212B20]"}>
                        3 a 4 Personas
                      </option>
                      <option value="Grupo Exclusivo (5+)" className={isLight ? "bg-white" : isRestaurant ? "bg-[#1C1512]" : "bg-[#212B20]"}>
                        Grupo Exclusivo (5+)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider mb-1.5 ${
                      isRestaurant
                        ? "text-[#D48B6A]"
                        : isLight
                        ? "text-[#5B6D49]"
                        : "text-[#8D996E]"
                    }`}
                  >
                    {t.modal.datesLabel}
                  </label>
                  <div className="relative">
                    <Calendar
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        isRestaurant
                          ? "text-[#D48B6A]"
                          : isLight
                          ? "text-[#5B6D49]"
                          : "text-[#8D996E]"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder={t.modal.datesPlaceholder}
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors ${
                        isLight
                          ? isRestaurant
                            ? "bg-white text-[#2A1B14] placeholder-[#2A1B14]/40 border border-[#A45D41]/30 focus:border-[#D48B6A]"
                            : "bg-white text-[#1A2219] placeholder-[#1A2219]/40 border border-[#8D996E]/35 focus:border-[#5B6D49]"
                          : isRestaurant
                          ? "bg-[#140D0B]/85 text-[#F5F2ED] placeholder-[#F5F2ED]/30 border border-[#A45D41]/30 focus:border-[#D48B6A]"
                          : "bg-[#151D14]/80 text-[#F5F2ED] placeholder-[#F5F2ED]/30 border border-[#8D996E]/30 focus:border-[#A45D41]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className={`block text-xs uppercase tracking-wider mb-1.5 ${
                    isRestaurant
                      ? "text-[#D48B6A]"
                      : isLight
                      ? "text-[#5B6D49]"
                      : "text-[#8D996E]"
                  }`}
                >
                  {t.modal.fullName}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.fullNamePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
                    isLight
                      ? isRestaurant
                        ? "bg-white text-[#2A1B14] placeholder-[#2A1B14]/40 border border-[#A45D41]/30 focus:border-[#D48B6A]"
                        : "bg-white text-[#1A2219] placeholder-[#1A2219]/40 border border-[#8D996E]/35 focus:border-[#5B6D49]"
                      : isRestaurant
                      ? "bg-[#140D0B]/85 text-[#F5F2ED] placeholder-[#F5F2ED]/30 border border-[#A45D41]/30 focus:border-[#D48B6A]"
                      : "bg-[#151D14]/80 text-[#F5F2ED] placeholder-[#F5F2ED]/30 border border-[#8D996E]/30 focus:border-[#A45D41]"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs uppercase tracking-wider mb-1.5 ${
                    isRestaurant
                      ? "text-[#D48B6A]"
                      : isLight
                      ? "text-[#5B6D49]"
                      : "text-[#8D996E]"
                  }`}
                >
                  {t.modal.contact}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.contactPlaceholder}
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
                    isLight
                      ? isRestaurant
                        ? "bg-white text-[#2A1B14] placeholder-[#2A1B14]/40 border border-[#A45D41]/30 focus:border-[#D48B6A]"
                        : "bg-white text-[#1A2219] placeholder-[#1A2219]/40 border border-[#8D996E]/35 focus:border-[#5B6D49]"
                      : isRestaurant
                      ? "bg-[#140D0B]/85 text-[#F5F2ED] placeholder-[#F5F2ED]/30 border border-[#A45D41]/30 focus:border-[#D48B6A]"
                      : "bg-[#151D14]/80 text-[#F5F2ED] placeholder-[#F5F2ED]/30 border border-[#8D996E]/30 focus:border-[#A45D41]"
                  }`}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.modal.submitBtn}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
