export type Language = "es" | "en";
export type Theme = "dark" | "light";

export const translations = {
  es: {
    // Nav
    nav: {
      esencia: "Esencia",
      fogon: "Restaurante",
      origen: "Origen",
      proposito: "Propósito",
      chalets: "Chalets",
      menu: "Menú",
      filosofia: "Filosofía",
      vivencias: "Vivencias",
      servicios: "Servicios",
      galeria: "Galería",
      contacto: "Contacto",
      switch: "Cambiar",
      book: "Reservar",
      bookChalet: "Reservar Refugio / Chalet",
      bookTable: "Reservar Mesa en el Restaurante",
      navIndex: "Índice de Navegación",
      chaletsName: "Chalets",
      restaurantName: "Restaurante",
      sanctuaryName: "Santuario",
      taglineChalets: "Amor · Naturaleza · Arte",
      taglineRestaurante: "Amor · Naturaleza · Arte",
    },
    // Dual Threshold
    threshold: {
      chaletsBadge: "Refugio & Hospitalidad",
      chaletsTitle: "Chalets de Altura",
      chaletsDesc:
        "Cabañas de arquitectura orgánica. Diseñadas para la pausa consciente, la intimidad y la reconexión con la naturaleza y los que uno más quiere.",
      chaletsBtn: "Entrar a Chalets",
      restaurantBadge: "Cocina Tradicional a la Leña",
      restaurantTitle: "Restaurante de Pazionart",
      restaurantDesc:
        "El ritual de la buena mesa y la vajilla artesanal de barro. Gastronomía colombiana nacida en Antioquia para compartir con los que uno más quiere.",
      restaurantBtn: "Entrar al Restaurante",
      medallionTag: "Dos Almas · Un Santuario",
      exploreBtn: "Explorar Todo el Santuario",
    },
    // Hero
    hero: {
      chaletsTagline: "Amor · Naturaleza · Arte — Refugios de Altura",
      restaurantTagline: "Amor · Naturaleza · Arte — Restaurante de Pazionart",
      exploreTagline: "Amor · Naturaleza · Arte — Dos Mundos · Un Santuario",
      chaletsDescP1: "El puente entre la arquitectura orgánica y la",
      chaletsDescHighlight: "pausa sagrada",
      chaletsDescP2:
        ". Desconecta del ruido en nuestros chalets diseñados para habitar el presente.",
      restaurantDescP1: "El puente entre la",
      restaurantDescHighlight: "cocina tradicional de leña y huerto",
      restaurantDescP2:
        " y la pausa sagrada. Gastronomía colombiana nacida en Antioquia, cocinada con amor y servida en barro ancestral para compartir con los que uno más quiere.",
      exploreDescP1: "El santuario andino donde el",
      exploreDescHighlight: "refugio natural y la buena mesa",
      exploreDescP2:
        "se encuentran en una sola experiencia sensorial y consciente.",
      chaletLabel: "Refugio / Chalet",
      guestsLabel: "Huéspedes",
      datesLabel: "Fechas de Estadía",
      datesPlaceholder: "Elige fechas",
      consultBtn: "Consultar Disponibilidad",
      tableGuestsLabel: "Comensales",
      serviceLabel: "Horario del Restaurante",
      reserveTableBtn: "Reservar Mesa en el Restaurante",
      experienceTypeLabel: "Experiencia Deseada",
      stayInChalet: "Estadía en Chalet",
      lunchDinner: "Almuerzo o Cena en el Restaurante",
      completeExperience: "Experiencia Completa (Chalet + Restaurante)",
      exploreBtn: "Explorar Experiencia",
      scrollHint: "Desliza para adentrarte",
    },
    // Propósito
    proposito: {
      tagChalets: "[ Brandbook 2026 · Propósito Chalets ]",
      tagRestaurant: "[ Restaurante de Pazionart · Sabiduría de Origen ]",
      headingChalets: "Habitar el Silencio y la Belleza Natural",
      headingRestaurant: "Gastronomía Tradicional y Sabores de Nuestra Tierra",
      descChalets:
        "Pazionart no es solo un destino; es una experiencia de reconexión íntima con la naturaleza y los que uno más quiere. Refugios diseñados para la pausa consciente, la intimidad y el descanso.",
      descRestaurant:
        "Cada plato honra la tierra y la memoria gastronómica Colombiana nacida en Antioquia. Cocinamos con ingredientes frescos y recetas tradicionales sobre leña, servidas en vajilla de barro cocido a mano para compartir con los que uno más quiere.",
      trait1Title: "Cocina a la Leña",
      trait1Desc: "Fuego tradicional y preparaciones auténticas que rescatan el verdadero sabor de nuestra tierra.",
      trait2Title: "Origen Colombiano",
      trait2Desc: "Gastronomía nacida en Antioquia, elaborada con ingredientes frescos y recetas de siempre.",
      trait3Title: "Mesa para Compartir",
      trait3Desc: "Un ambiente cálido y sin afanes, pensado para disfrutar con los que uno más quiere.",
      trait4Title: "Vajilla Artesanal",
      trait4Desc: "Servido en auténtico barro moldeado a mano, uniendo tradición, arte y calidez.",
      quote:
        '"El verdadero lujo contemporáneo no es el exceso, sino el silencio, el tiempo y la buena mesa compartida con los que uno más quiere."',
      manifestoBadge: "Manifiesto Pazionart",
    },
    // Portal Switch Cards
    portal: {
      chaletCardTag: "Mundo 01 · Hospitalidad",
      chaletCardTitle: "Los Chalets de Altura",
      chaletCardDesc:
        "Tres refugios de diseño orgánico con chimenea, tina privada y vistas panorámicas hacia la inmensidad de la naturaleza.",
      chaletCardBtn: "Ver Refugios & Disponibilidad",
      restaurantCardTag: "Mundo 02 · Gastronomía",
      restaurantCardTitle: "Restaurante de Pazionart",
      restaurantCardDesc:
        "Gastronomía colombiana nacida en Antioquia, cocina tradicional a la leña e ingredientes frescos para compartir en la mesa.",
      restaurantCardBtn: "Conocer el Menú & Reservar",
    },
    // Chalet Configurator
    configurator: {
      tag: "Refugios Exclusivos",
      title: "Pazionart",
      chaletsWord: "Chalets",
      facade: "Fachada",
      interior: "Interior",
      deck: "Terraza",
      nights: "Noches de Pausa",
      totalEstimate: "Inversión Estimada",
      bookBtn: "Reservar este Refugio",
    },
    // Restaurant Section
    restaurant: {
      menuTag: "[ Menú Degustación de 4 Tiempos ]",
      agroTag: "Ingredientes 100% Agroecológicos",
      tableBookingTitle: "Reservar Mesa en el Restaurante",
      tableBookingDesc: "Mesa privada con velo de velas y chimenea.",
      guestsCount: "Comensales",
      serviceHour: "Servicio / Horario",
      tableDate: "Fecha Deseada",
      confirmBtn: "Confirmar Mesa vía WhatsApp",
    },
    // Values
    values: {
      tagChalets: "[ Brandbook 2026 · Sección Valores ]",
      tagRestaurant: "[ Restaurante de Pazionart · Brandbook Valores ]",
      titlePre: "La Filosofía que",
      titleHighlight: "Nos Representa",
      hoverHint: "Pasa el cursor para explorar cada principio",
    },
    // Kinetic Quote
    kinetic: {
      tagChalets: "[ Sensorialidad Andina ]",
      tagRestaurant: "[ Fuego & Taller ]",
      titlePre: "Vivencias para",
      titleHighlight: "Habitar el Presente",
      bookExpBtn: "Reservar Esta Vivencia",
    },
    // Booking Modal
    modal: {
      chaletTitle: "Hospitalidad & Pausa Consciente",
      restaurantTitle: "Gastronomía & Fuego Sagrado",
      subtitle:
        "Reserva directa sin comisiones. Nos comunicaremos contigo de forma personalizada para afinar cada detalle de tu estancia.",
      fullName: "Nombre Completo",
      fullNamePlaceholder: "Ej. Valeria Restrepo",
      contact: "WhatsApp o Correo",
      contactPlaceholder: "+57 300 000 0000 o correo@email.com",
      unitLabel: "Unidad o Servicio Seleccionado",
      guestsLabel: "Número de Visitantes",
      datesLabel: "Fechas Estimadas",
      datesPlaceholder: "Ej. Fin de semana próximo",
      submitBtn: "Confirmar Solicitud de Reserva",
      successTitle: "Solicitud de Pausa Recibida",
      successDescP1: "Gracias,",
      successDescP2:
        ". Te estamos redirigiendo a nuestra línea directa de hospitalidad consciente para coordinar cada detalle de tu experiencia.",
      closeBtn: "Cerrar",
    },
    // Footer & Common
    common: {
      themeLight: "Modo Claro",
      themeDark: "Modo Oscuro",
      toggleTheme: "Cambiar tema claro / oscuro",
      langSwitch: "Idioma",
      whatsappAria: "Contactar a Pazionart vía WhatsApp",
      whatsappTooltip: "Atención inmediata por WhatsApp",
    },
  },
  en: {
    // Nav
    nav: {
      esencia: "Essence",
      fogon: "Restaurant",
      origen: "Origin",
      proposito: "Purpose",
      chalets: "Chalets",
      menu: "Menu",
      filosofia: "Philosophy",
      vivencias: "Experiences",
      servicios: "Services",
      galeria: "Gallery",
      contacto: "Contact",
      switch: "Switch",
      book: "Book",
      bookChalet: "Book Cabin / Chalet",
      bookTable: "Reserve Table at Restaurant",
      navIndex: "Navigation Index",
      chaletsName: "Chalets",
      restaurantName: "Restaurant",
      sanctuaryName: "Sanctuary",
      taglineChalets: "Love · Nature · Art",
      taglineRestaurante: "Love · Nature · Art",
    },
    // Dual Threshold
    threshold: {
      chaletsBadge: "Refuge & Hospitality",
      chaletsTitle: "Highland Chalets",
      chaletsDesc:
        "Organic architecture cabins. Designed for conscious pause, intimacy, and reconnecting with nature and the ones you love most.",
      chaletsBtn: "Enter Chalets",
      restaurantBadge: "Traditional Wood-Fired Cuisine",
      restaurantTitle: "Pazionart Restaurant",
      restaurantDesc:
        "The ritual of good dining and handcrafted clay tableware. Authentic Colombian cuisine born in Antioquia to share with those you love most.",
      restaurantBtn: "Enter Restaurant",
      medallionTag: "Two Souls · One Sanctuary",
      exploreBtn: "Explore the Whole Sanctuary",
    },
    // Hero
    hero: {
      chaletsTagline: "Love · Nature · Art — Highland Refuges",
      restaurantTagline: "Love · Nature · Art — Pazionart Restaurant",
      exploreTagline: "Love · Nature · Art — Two Worlds · One Sanctuary",
      chaletsDescP1: "The bridge between organic architecture and",
      chaletsDescHighlight: "sacred pause",
      chaletsDescP2:
        ". Disconnect from the rush in our chalets designed to deeply inhabit the present.",
      restaurantDescP1: "The bridge between",
      restaurantDescHighlight: "traditional wood fire and organic garden",
      restaurantDescP2:
        " and sacred pause. Authentic Colombian gastronomy born in Antioquia, cooked with love and served in ancestral earthenware to share with those you love most.",
      exploreDescP1: "The Andean sanctuary where",
      exploreDescHighlight: "natural refuge and good dining",
      exploreDescP2:
        "meet in one singular conscious sensory immersion.",
      chaletLabel: "Refuge / Chalet",
      guestsLabel: "Guests",
      datesLabel: "Stay Dates",
      datesPlaceholder: "Pick dates",
      consultBtn: "Check Availability",
      tableGuestsLabel: "Diners",
      serviceLabel: "Restaurant Service Time",
      reserveTableBtn: "Reserve Table at the Restaurant",
      experienceTypeLabel: "Desired Experience",
      stayInChalet: "Stay in Chalet",
      lunchDinner: "Lunch or Dinner at the Restaurant",
      completeExperience: "Full Immersion (Chalet + Restaurant)",
      exploreBtn: "Explore Experience",
      scrollHint: "Scroll down to immerse",
    },
    // Propósito
    proposito: {
      tagChalets: "[ Brandbook 2026 · Chalet Purpose ]",
      tagRestaurant: "[ Pazionart Restaurant · Wisdom of Origin ]",
      headingChalets: "Inhabiting Silence and Natural Beauty",
      headingRestaurant: "Traditional Gastronomy & Flavors of Our Land",
      descChalets:
        "Pazionart is not just a destination; it is an intimate reconnection with nature and the ones you love most. Refuges designed for conscious stillness, intimacy, and restorative rest.",
      descRestaurant:
        "Each course honors the soil and Colombian culinary heritage born in Antioquia. We cook with fresh ingredients and traditional recipes over wood fire, served on handmade clay pottery to share with those you love most.",
      trait1Title: "Wood-Fired Cuisine",
      trait1Desc: "Traditional fire and authentic preparations that bring out the true flavor of our land.",
      trait2Title: "Colombian Origin",
      trait2Desc: "Gastronomy born in Antioquia, prepared with fresh ingredients and time-honored recipes.",
      trait3Title: "A Table to Share",
      trait3Desc: "A warm and unhurried setting, designed to enjoy with the ones you love most.",
      trait4Title: "Artisanal Tableware",
      trait4Desc: "Served in authentic handcrafted clay pottery, uniting tradition, art, and warmth.",
      quote:
        '"True contemporary luxury is not excess, but stillness, time, and good dining shared with those you love most."',
      manifestoBadge: "Pazionart Manifesto",
    },
    // Portal Switch Cards
    portal: {
      chaletCardTag: "World 01 · Hospitality",
      chaletCardTitle: "Highland Chalets",
      chaletCardDesc:
        "Three organic designer cabins featuring indoor wood fireplaces, private soak tubs, and panoramic views toward nature's vastness.",
      chaletCardBtn: "View Chalets & Availability",
      restaurantCardTag: "World 02 · Gastronomy",
      restaurantCardTitle: "Pazionart Restaurant",
      restaurantCardDesc:
        "Authentic Colombian cuisine born in Antioquia, traditional wood-fire cooking and fresh ingredients to share at the table.",
      restaurantCardBtn: "Discover the Menu & Reserve",
    },
    // Chalet Configurator
    configurator: {
      tag: "Exclusive Refuges",
      title: "Pazionart",
      chaletsWord: "Chalets",
      facade: "Facade",
      interior: "Interior",
      deck: "Deck",
      nights: "Nights of Pause",
      totalEstimate: "Estimated Investment",
      bookBtn: "Book this Refuge",
    },
    // Restaurant Section
    restaurant: {
      menuTag: "[ 4-Course Tasting Menu ]",
      agroTag: "100% Agroecological Produce",
      tableBookingTitle: "Reserve a Table at the Restaurant",
      tableBookingDesc: "Private table with candlelight and natural stone fireplace.",
      guestsCount: "Diners",
      serviceHour: "Service / Schedule",
      tableDate: "Preferred Date",
      confirmBtn: "Confirm Table via WhatsApp",
    },
    // Values
    values: {
      tagChalets: "[ Brandbook 2026 · Values Section ]",
      tagRestaurant: "[ Pazionart Restaurant · Brandbook Values ]",
      titlePre: "The Philosophy that",
      titleHighlight: "Guides Us",
      hoverHint: "Hover to explore each guiding principle",
    },
    // Kinetic Quote
    kinetic: {
      tagChalets: "[ Andean Sensoriality ]",
      tagRestaurant: "[ Fire & Workshop ]",
      titlePre: "Experiences to",
      titleHighlight: "Inhabit the Present",
      bookExpBtn: "Book This Experience",
    },
    // Booking Modal
    modal: {
      chaletTitle: "Hospitality & Conscious Pause",
      restaurantTitle: "Gastronomy & Sacred Hearth",
      subtitle:
        "Direct reservation with no middleman. We will contact you directly to tailor every detail of your stay.",
      fullName: "Full Name",
      fullNamePlaceholder: "E.g. Sophia Montgomery",
      contact: "WhatsApp or Email",
      contactPlaceholder: "+1 555 000 0000 or email@domain.com",
      unitLabel: "Selected Unit or Service",
      guestsLabel: "Number of Guests",
      datesLabel: "Estimated Dates",
      datesPlaceholder: "E.g. Next weekend",
      submitBtn: "Confirm Reservation Request",
      successTitle: "Pause Request Received",
      successDescP1: "Thank you,",
      successDescP2:
        ". We are redirecting you to our direct conscious hospitality line to arrange every detail of your visit.",
      closeBtn: "Close",
    },
    // Footer & Common
    common: {
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      toggleTheme: "Toggle light / dark mode",
      langSwitch: "Language",
      whatsappAria: "Contact Pazionart via WhatsApp",
      whatsappTooltip: "Instant concierge via WhatsApp",
    },
  },
};
