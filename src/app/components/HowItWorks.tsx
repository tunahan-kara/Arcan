"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { Upload, Square, CreditCard, Truck } from "lucide-react";

// Stagger için varyantlar
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const steps = [
  { icon: Upload,      title: "Görselini Yükle", desc: "Fotoğrafını yükle, baskıya hazırla." },
  { icon: Square,      title: "Boyut Seç",       desc: "A4, A3, A2 veya A1 arasından seç." },
  { icon: CreditCard,  title: "Ödeme Yap",       desc: "Güvenli ödeme yöntemleriyle tamamla." },
  { icon: Truck,       title: "Kargoda",         desc: "Ürün hazırlanır ve kapına gelir." },
];

export default function HowItWorks() {
  return (
    <Section id="how" className="bg-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
          Nasıl Çalışır?
        </h2>

        <motion.div
          className="grid gap-6 md:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={item}
              className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <step.icon className="w-10 h-10 text-black mb-4" />
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-600">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
