export type Language = "es" | "en";
export type Theme = "dark" | "light";

export const translations = {
  es: {
    // Nav
    nav: {
      esencia: "Esencia",
      fogon: "El Fogón",
      origen: "Origen",
      proposito: "Propósito",
      chalets: "Chalets",
      menu: "Menú",
      filosofia: "Filosofía",
      vivencias: "Vivencias",
      contacto: "Contacto",
      switch: "Cambiar",
      book: "Reservar",
      bookChalet: "Reservar Refugio / Chalet",
      bookTable: "Reservar Mesa en el Fogón",
      navIndex: "Índice de Navegación",
      chaletsName: "Chalets",
      restaurantName: "El Fogón",
      sanctuaryName: "Santuario",
      taglineChalets: "Amor · Naturaleza · Arte",
      taglineRestaurante: "Amor · Fogón · Tierra",
    },
    // Dual Threshold
    threshold: {
      chaletsBadge: "Refugio & Hospitalidad",
      chaletsTitle: "Chalets de Altura",
      chaletsDesc:
        "Cabañas de arquitectura orgánica suspendidas en la niebla. Diseñadas para la pausa consciente, la intimidad y la reconexión con el bosque.",
      chaletsBtn: "Entrar a Chalets",
      restaurantBadge: "Cocina de Origen & Brasa",
      restaurantTitle: "Restaurante & Fogón",
      restaurantDesc:
        "El ritual sagrado del fuego vivo y la vajilla artesanal de barro. Gastronomía campesina de autor nacida de los huertos de montaña.",
      restaurantBtn: "Entrar al Restaurante",
      medallionTag: "Dos Almas · Un Santuario",
      exploreBtn: "Explorar Todo el Santuario",
    },
    // Hero
    hero: {
      chaletsTagline: "Amor · Naturaleza · Arte — Refugios de Altura",
      restaurantTagline: "Amor · Fuego · Tierra — Sabores de Origen",
      exploreTagline: "Amor · Naturaleza · Arte — Dos Mundos · Un Santuario",
      chaletsDescP1: "El puente entre la arquitectura orgánica y la",
      chaletsDescHighlight: "pausa sagrada",
      chaletsDescP2:
        ". Desconecta del ruido en nuestros chalets de montaña diseñados para habitar el presente.",
      restaurantDescP1: "El puente entre la",
      restaurantDescHighlight: "cocina viva de leña y huerto",
      restaurantDescP2:
        "y la pausa sagrada. Sabores de montaña cocinados al rescoldo de brasas y servidos en barro ancestral.",
      exploreDescP1: "El santuario andino donde el",
      exploreDescHighlight: "refugio de montaña y el fuego sagrado",
      exploreDescP2:
        "se encuentran en una sola experiencia sensorial y consciente.",
      chaletLabel: "Refugio / Chalet",
      guestsLabel: "Huéspedes",
      datesLabel: "Fechas de Estadía",
      datesPlaceholder: "Elige fechas",
      consultBtn: "Consultar Disponibilidad",
      tableGuestsLabel: "Comensales",
      serviceLabel: "Horario del Fogón",
      reserveTableBtn: "Reservar Mesa en el Fogón",
      experienceTypeLabel: "Experiencia Deseada",
      stayInChalet: "Estadía en Chalet",
      lunchDinner: "Almuerzo o Cena en el Fogón",
      completeExperience: "Experiencia Completa (Chalet + Fogón)",
      exploreBtn: "Explorar Experiencia",
      scrollHint: "Desliza para adentrarte",
    },
    // Propósito
    proposito: {
      tagChalets: "[ Brandbook 2026 · Propósito Chalets ]",
      tagRestaurant: "[ Fogón & Huerto · Sabiduría de Origen ]",
      headingChalets: "Habitar el Silencio y la Belleza de la Montaña",
      headingRestaurant: "El Fuego Vivo y los Sabores del Huerto Andino",
      descChalets:
        "Pazionart no es solo un destino; es una experiencia de reconexión íntima con el bosque andino. Creamos refugios de alta montaña donde el diseño bioclimático se funde con la serenidad de la niebla.",
      descRestaurant:
        "Cada plato honra la tierra y la memoria campesina. Cocinamos a fuego lento sobre leña de poda controlada, usando ingredientes cultivados en nuestros bancales orgánicos y servidos en vajilla de barro cocido a mano.",
      trait1Title: "Arquitectura Bioclimática",
      trait1Desc: "Maderas certificadas y piedra de río que respetan la orografía natural.",
      trait2Title: "Gastronomía Regenerativa",
      trait2Desc: "Del huerto a la mesa, sin intermediarios y con respeto por los ciclos agrícolas.",
      trait3Title: "Hospitalidad del Corazón",
      trait3Desc: "Atención genuina y discreta para que tu estancia sea un descanso reparador.",
      trait4Title: "Arte & Barro Ancestral",
      trait4Desc: "Talleres y piezas únicas modeladas por artesanos de nuestra comunidad.",
      quote:
        '"El verdadero lujo contemporáneo no es el exceso, sino el silencio, el tiempo y el calor del fuego compartido."',
      manifestoBadge: "Manifiesto Pazionart",
    },
    // Portal Switch Cards
    portal: {
      chaletCardTag: "Mundo 01 · Hospitalidad",
      chaletCardTitle: "Los Chalets de Altura",
      chaletCardDesc:
        "Tres refugios de diseño orgánico con chimenea, tina de montaña y vistas panorámicas sobre el mar de niebla.",
      chaletCardBtn: "Ver Refugios & Disponibilidad",
      restaurantCardTag: "Mundo 02 · Gastronomía",
      restaurantCardTitle: "El Fogón Campesino",
      restaurantCardDesc:
        "Cocina de origen al rescoldo de brasas, ingredientes agroecológicos cosechados al amanecer y maridaje de altura.",
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
      tableBookingTitle: "Reservar Mesa en el Fogón",
      tableBookingDesc: "Mesa privada con velo de velas y chimenea.",
      guestsCount: "Comensales",
      serviceHour: "Servicio / Horario",
      tableDate: "Fecha Deseada",
      confirmBtn: "Confirmar Mesa vía WhatsApp",
    },
    // Values
    values: {
      tagChalets: "[ Brandbook 2026 · Sección Valores ]",
      tagRestaurant: "[ Fogón & Huerto · Brandbook Valores ]",
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
      fogon: "The Hearth",
      origen: "Origin",
      proposito: "Purpose",
      chalets: "Chalets",
      menu: "Menu",
      filosofia: "Philosophy",
      vivencias: "Experiences",
      contacto: "Contact",
      switch: "Switch",
      book: "Book",
      bookChalet: "Book Cabin / Chalet",
      bookTable: "Reserve Table at Hearth",
      navIndex: "Navigation Index",
      chaletsName: "Chalets",
      restaurantName: "The Hearth",
      sanctuaryName: "Sanctuary",
      taglineChalets: "Love · Nature · Art",
      taglineRestaurante: "Love · Fire · Earth",
    },
    // Dual Threshold
    threshold: {
      chaletsBadge: "Refuge & Hospitality",
      chaletsTitle: "Highland Chalets",
      chaletsDesc:
        "Organic architecture cabins suspended in the mountain mist. Crafted for conscious stillness, intimate connection, and harmony with the forest.",
      chaletsBtn: "Enter Chalets",
      restaurantBadge: "Origin Cuisine & Hearth",
      restaurantTitle: "Restaurant & Hearth",
      restaurantDesc:
        "The sacred ritual of open flame and artisanal clay pottery. Signature Andean farm-to-table cuisine born from high-altitude orchards.",
      restaurantBtn: "Enter Restaurant",
      medallionTag: "Two Souls · One Sanctuary",
      exploreBtn: "Explore the Whole Sanctuary",
    },
    // Hero
    hero: {
      chaletsTagline: "Love · Nature · Art — Highland Refuges",
      restaurantTagline: "Love · Fire · Earth — Flavors of Origin",
      exploreTagline: "Love · Nature · Art — Two Worlds · One Sanctuary",
      chaletsDescP1: "The bridge between organic architecture and",
      chaletsDescHighlight: "sacred pause",
      chaletsDescP2:
        ". Disconnect from the rush in our high mountain chalets designed to deeply inhabit the present.",
      restaurantDescP1: "The bridge between",
      restaurantDescHighlight: "live wood fire and organic garden",
      restaurantDescP2:
        "and sacred pause. Mountain flavors slowly cooked on live embers and served in ancestral clay pottery.",
      exploreDescP1: "The Andean sanctuary where",
      exploreDescHighlight: "mountain refuge and sacred fire",
      exploreDescP2:
        "meet in one singular conscious sensory immersion.",
      chaletLabel: "Refuge / Chalet",
      guestsLabel: "Guests",
      datesLabel: "Stay Dates",
      datesPlaceholder: "Pick dates",
      consultBtn: "Check Availability",
      tableGuestsLabel: "Diners",
      serviceLabel: "Hearth Service Time",
      reserveTableBtn: "Reserve Table at the Hearth",
      experienceTypeLabel: "Desired Experience",
      stayInChalet: "Stay in Chalet",
      lunchDinner: "Lunch or Dinner at the Hearth",
      completeExperience: "Full Immersion (Chalet + Hearth)",
      exploreBtn: "Explore Experience",
      scrollHint: "Scroll down to immerse",
    },
    // Propósito
    proposito: {
      tagChalets: "[ Brandbook 2026 · Chalet Purpose ]",
      tagRestaurant: "[ Hearth & Garden · Wisdom of Origin ]",
      headingChalets: "Inhabiting Silence and the Beauty of the Mountain",
      headingRestaurant: "Live Fire and Pure Flavors from the Andean Garden",
      descChalets:
        "Pazionart is not just a destination; it is an intimate reconnection with the Andean forest. We craft high-mountain refuges where bioclimatic design blends naturally with the serenity of morning mist.",
      descRestaurant:
        "Each course honors the soil and ancestral peasant wisdom. We cook slowly over controlled pruning oak wood, using ingredients cultivated in our own organic beds and served on handmade clay pottery.",
      trait1Title: "Bioclimatic Architecture",
      trait1Desc: "Certified timber and river stone that respect the natural topography.",
      trait2Title: "Regenerative Gastronomy",
      trait2Desc: "From orchard to table, direct and in deep respect of seasonal agricultural cycles.",
      trait3Title: "Heartfelt Hospitality",
      trait3Desc: "Genuine, gentle, and discreet attention so your stay becomes restorative rest.",
      trait4Title: "Art & Ancestral Clay",
      trait4Desc: "Workshops and unique pottery sculpted by local artisans of our community.",
      quote:
        '"True contemporary luxury is not excess, but stillness, time, and the warmth of shared fire."',
      manifestoBadge: "Pazionart Manifesto",
    },
    // Portal Switch Cards
    portal: {
      chaletCardTag: "World 01 · Hospitality",
      chaletCardTitle: "Highland Chalets",
      chaletCardDesc:
        "Three organic designer cabins featuring indoor wood fireplaces, mountain soak tubs, and panoramic views over the sea of clouds.",
      chaletCardBtn: "View Chalets & Availability",
      restaurantCardTag: "World 02 · Gastronomy",
      restaurantCardTitle: "The Peasant Hearth",
      restaurantCardDesc:
        "Origin cuisine cooked on glowing embers, agroecological ingredients harvested at dawn, and high-altitude pairing.",
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
      tableBookingTitle: "Reserve a Table at the Hearth",
      tableBookingDesc: "Private table with candlelight and natural stone fireplace.",
      guestsCount: "Diners",
      serviceHour: "Service / Schedule",
      tableDate: "Preferred Date",
      confirmBtn: "Confirm Table via WhatsApp",
    },
    // Values
    values: {
      tagChalets: "[ Brandbook 2026 · Values Section ]",
      tagRestaurant: "[ Hearth & Garden · Brandbook Values ]",
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
        "Direct reservation with no middleman. We will contact you directly to tailor every detail of your mountain stay.",
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
