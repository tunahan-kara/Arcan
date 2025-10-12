"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const images = [
  "/hero/1.png", 
  "/hero/2.png",
  "/hero/3.png",  
  "/hero/4.png",


  ]; 

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-neutral-900"
    >
      {/* BLUR DOLGU (cover) */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={"bg-" + images[index]}
            src={images[index]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            aria-hidden
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ÖN PLAN (contain) */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={"fg-" + images[index]}
            src={images[index]}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
      </div>

      {/* METİN & CTA */}
      <div className="relative z-10 text-center px-4 text-white">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow">
          Fotoğrafını Alüminyumda Ölümsüzleştir
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto drop-shadow">
          Görselini yükle, boyutunu seç, biz üretelim ve kapına gelsin.
        </p>
        <Link
          href="/order"
          className="inline-flex mt-8 px-6 py-3 rounded-xl bg-black text-white font-medium shadow hover:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          Görselini Yükle
        </Link>
      </div>
    </section>
  );
}
