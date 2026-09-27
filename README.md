# Pazionart — Experiencia Web Inmersiva

> **AMOR · NATURALEZA · ARTE**  
> *El puente entre la sabiduría artesanal rural y la pausa consciente que buscan tanto locales como el viajero moderno.*

---

## 🌿 Identidad Gráfica & Sistema de Marca

Este proyecto implementa con fidelidad absoluta las directrices del **Brandbook oficial de Pazionart**:

### Paleta de Fusión
- **Noche** (`#212B20`): Verde bosque ultra profundo, elegancia orgánica y base de contraste.
- **Tierra** (`#8D996E`): Verde salvia/oliva botánico, serenidad y equilibrio natural.
- **Alma** (`#A45D41`): Terracota cálida y arcilla, calidez humana y artesanía.
- **Luz** (`#F5F2ED`): Blanco lino/marfil cálido, pureza, luz natural y legibilidad.

### Tipografía
- **Tipografía Oficial (Display & Body):** **Montserrat** (Google Fonts).
- **Logotipo:** Trazos caligráficos fluidos con vectorización en SVG para máxima nitidez en pantallas retina.
- **Patrón Modular:** Modulación geométrica orgánica integrada como textura sutil al 5% en transiciones.

---

## ✨ Características Técnicas

- **Framework:** Next.js 15+ (App Router con TypeScript).
- **Animaciones Cinemáticas:** GSAP con `ScrollTrigger` y scrolling fluido con `Lenis`.
- **Secciones Full-Page (100vh):** 6 secciones a pantalla completa con navegación lateral flotante (`01 / 06`) y reveal secuencial.
- **Atmósfera Sonora Multisensorial:** Sintetizador biofílico de brisa y bosque integrado con Web Audio API (sin dependencias pesadas).
- **Arquitectura de Chalets:** Módulo de presentación interactiva con especificaciones de confort y drawer de reservas conectado a WhatsApp directo.
- **Despliegue Estático:** `output: 'export'` configurado en `next.config.ts`, optimizado para **Cloudflare Pages**.

---

## 🚀 Despliegue en Cloudflare Pages mediante GitHub

1. Sube este repositorio a tu cuenta de **GitHub**.
2. Ingresa a tu panel de **Cloudflare Dashboard** → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Selecciona tu repositorio `pazionart.com`.
4. Configura los parámetros de compilación:
   - **Framework preset:** `Next.js (Static HTML Export)`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
5. Haz clic en **Save and Deploy**. Cloudflare distribuirá la web en su red perimetral global con máxima velocidad y SSL automático.

---

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Generar build de producción para Cloudflare Pages (carpeta /out)
npm run build
```
