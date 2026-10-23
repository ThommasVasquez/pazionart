"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoResize: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // ResizeObserver en document.body para recalcular lenis.limit
    // inmediatamente cuando imágenes o componentes dinámicos expandan la altura
    let resizeTimeout: NodeJS.Timeout;
    const handleDocumentResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 100);
    };

    const resizeObserver = new ResizeObserver(handleDocumentResize);
    if (typeof document !== "undefined" && document.body) {
      resizeObserver.observe(document.body);
    }

    const handleWindowLoad = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleWindowLoad);
    window.addEventListener("resize", handleDocumentResize);

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("resize", handleDocumentResize);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.__lenis = undefined;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
