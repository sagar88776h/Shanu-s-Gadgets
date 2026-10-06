import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer / desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "button, a, [role='button'], input, textarea, select, .cursor-interactive"
      );

      const customTextAttr = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

      if (customTextAttr) {
        setIsHovered(true);
        setCursorText(customTextAttr);
      } else if (interactive) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-all duration-200 ${
          cursorText
            ? "w-20 h-20 bg-white/90 text-black font-semibold text-xs tracking-wider shadow-2xl backdrop-blur-md"
            : isHovered
            ? "w-12 h-12 bg-white/20 border border-white/40 backdrop-blur-sm scale-110"
            : "w-3.5 h-3.5 bg-white/90 shadow-md"
        } ${isClicking ? "scale-90 opacity-70" : ""}`}
      >
        {cursorText && (
          <span className="animate-fade-in uppercase text-[10px] font-bold tracking-widest text-dark-950 select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
