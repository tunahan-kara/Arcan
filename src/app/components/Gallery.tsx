"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "./Section";

const images = [
  "/gallery/1.png",
  "/gallery/2.png",
  "/gallery/3.png",
  "/gallery/4.png",
  "/gallery/5.png",
  "/gallery/6.png",
  "/gallery/7.png",
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number>(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = useCallback(() => setOpen(false), []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, []);

  // ESC / ← / → kısayolları
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  // Modal açıkken body scroll kilidi
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <Section id="gallery" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Örnek Baskılar</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => openAt(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden rounded-lg shadow group focus:outline-none focus:ring-2 focus:ring-black/30"
              aria-label={`Görseli büyüt (${i + 1}/${images.length})`}
            >
              <Image
                src={src}
                alt={`Mockup ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={i < 2}
              />

              {/* Hover overlay + büyüteç */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      
      {/* LIGHTBOX MODAL */}
{open && (
  <motion.div
    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    onClick={close}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="relative w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Image
        key={images[index]}
        src={images[index]}
        alt={`Büyük Görsel ${index + 1}`}
        fill
        className="object-contain"
        sizes="100vw"
        priority
      />

      {/* Kapat butonu */}
      <button
        onClick={close}
        className="absolute top-3 right-3 rounded-full bg-black/60 text-white p-2 hover:bg-black/80 transition"
      >
        ✕
      </button>

      {/* Önceki / Sonraki */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-3 hover:bg-black/80 transition"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-3 hover:bg-black/80 transition"
      >
        ›
      </button>

      {/* Sayaç */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/80 bg-black/40 px-2 py-1 rounded">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  </motion.div>
)}

    </Section>
  );
}
