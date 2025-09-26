"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface SectionProps {
  id?: string;
  className?: string;
}

export default function Section({ id, className = "", children }: PropsWithChildren<SectionProps>) {
  return (
    <motion.section
      id={id}
      className={`py-20 md:py-28 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
