"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text" | "drag">("default");

  useEffect(() => {
    // Only enable on desktop devices with hover support
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(cursor, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;

      gsap.set(follower, {
        x: pos.x,
        y: pos.y,
      });
    });

    window.addEventListener("mousemove", handleMouseMove);

    // Dynamic cursor states on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const type = target.getAttribute("data-cursor");
        if (type === "explore") {
          setCursorVariant("hover");
          setCursorText("EXPLORAR");
        } else if (type === "drag") {
          setCursorVariant("drag");
          setCursorText("DESLIZAR");
        } else if (type === "reserve") {
          setCursorVariant("hover");
          setCursorText("RESERVAR");
        } else if (type === "view") {
          setCursorVariant("hover");
          setCursorText("VER");
        }
      } else if ((e.target as HTMLElement).closest("a, button, input, select")) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Tiny leading dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#A45D41] pointer-events-none z-[100] transition-opacity duration-300 hidden md:block"
        style={{ willChange: "transform" }}
      />

      {/* Smooth fluid follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99] flex items-center justify-center transition-all duration-300 -translate-x-1/2 -translate-y-1/2 hidden md:flex ${
          cursorVariant === "hover" && cursorText
            ? "w-24 h-24 bg-[#A45D41]/85 backdrop-blur-sm text-[#F5F2ED] text-[10px] tracking-[0.2em] font-mono border border-[#F5F2ED]/30 scale-100 shadow-2xl"
            : cursorVariant === "hover"
            ? "w-12 h-12 bg-transparent border border-[#8D996E] scale-125"
            : cursorVariant === "drag"
            ? "w-20 h-20 bg-[#212B20]/90 text-[#8D996E] border border-[#8D996E] text-[9px] tracking-widest font-mono"
            : "w-8 h-8 bg-transparent border border-[#8D996E]/40 scale-100"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && <span className="animate-pulse">{cursorText}</span>}
      </div>
    </>
  );
}
