
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const DragDropAnimation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.top < vh && rect.bottom > 0) {
        const progress = (vh - rect.top) / (vh + rect.height);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getCursorPosition = (p: number) => ({
    x: 5 + p * 85,
    y: 50 + Math.sin(p * Math.PI * 2) * 5,
  });

  const { x, y } = getCursorPosition(scrollProgress);
  const scale = 0.6 + scrollProgress * 0.8;

  const isHovering =
    (scrollProgress > 0.15 && scrollProgress < 0.35) ||
    (scrollProgress > 0.45 && scrollProgress < 0.65) ||
    scrollProgress > 0.75;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-96 max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl"
    >
      {/* UI MOCK */}
      <div className="absolute inset-0 p-8">
        <div className="h-full rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-6 border-b pb-4 text-sm font-medium text-gray-600">
            Formitekt – Form Builder
          </div>

          <div className="flex h-full items-center justify-around">
            {["Nome", "Email"].map((label, i) => {
              const active =
                (i === 0 && scrollProgress > 0.15 && scrollProgress < 0.35) ||
                (i === 1 && scrollProgress > 0.45 && scrollProgress < 0.65);

              return (
                <div
                  key={label}
                  className="w-48 rounded-lg border-2 bg-gray-50 p-4 transition-all"
                  style={{
                    borderColor: active ? "#06b6d4" : "#e5e7eb",
                    transform: active ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {label}
                  </label>
                  <div className="rounded border bg-white px-3 py-2 text-sm text-gray-400">
                    {label === "Nome"
                      ? "Inserisci nome…"
                      : "email@example.com"}
                  </div>
                </div>
              );
            })}

            <div
              className="rounded-lg bg-cyan-500 px-8 py-4 font-semibold text-white transition-all"
              style={{
                transform: scrollProgress > 0.75 ? "scale(1.1)" : "scale(1)",
                boxShadow:
                  scrollProgress > 0.75
                    ? "0 10px 25px rgba(6,182,212,.5)"
                    : "0 4px 6px rgba(0,0,0,.1)",
              }}
            >
              Invia
            </div>
          </div>
        </div>
      </div>

      {/* CURSORE (PNG – mano bianca reale) */}
      <div
        className="pointer-events-none absolute z-50 transition-transform duration-200"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-10%, -10%) scale(${scale}) rotate(-8deg)`,
        }}
      >
        {isHovering && (
          <div />
        )}

        <Box
          src={"/images/test2.PNG"}
          alt=""
          height={66}
          width={66}
          component="img"
         
        ></Box>
      </div>

      {/* PATH */}
      <svg className="pointer-events-none absolute inset-0 opacity-20">
        <line
          x1="5%"
          y1="50%"
          x2="90%"
          y2="50%"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>
    </div>
  );
};

export default DragDropAnimation;
