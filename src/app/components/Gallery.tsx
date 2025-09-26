"use client";

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
  return (
    <Section id="gallery" className="bg-neutral-50 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Örnek Baskılar</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <motion.div
  key={i}
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, delay: i * 0.05 }}
  viewport={{ once: true }}
  className="relative aspect-[4/5] overflow-hidden rounded-lg shadow group"
>
  <Image
    src={src}
    alt={`Mockup ${i + 1}`}
    fill
    className="object-cover transition-transform duration-500 group-hover:scale-105"
    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
    priority={i < 2}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
    </svg>
  </div>
</motion.div>

          ))}
        </div>
      </div>
    </Section>
  );
}
