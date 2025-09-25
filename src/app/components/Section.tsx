"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function Section({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.section
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
