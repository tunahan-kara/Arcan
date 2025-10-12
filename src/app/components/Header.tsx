"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../store/cart";

export default function Header() {
  const count = useCart((s) => s.items.reduce((n, it) => n + it.qty, 0));

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        {/* Sol: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png" // logonun yolu (public/logo.png olmalı)
            alt="Logo"
            width={120}      // logo boyutu: ihtiyaca göre ayarlayabilirsin
            height={32}
            priority
          />
        </Link>

        {/* Orta: Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#gallery" className="hover:underline">Örnekler</a>
          <a href="#product" className="hover:underline">Ürün</a>
          <a href="#how" className="hover:underline">Nasıl Çalışır</a>
          <a href="#faq" className="hover:underline">SSS</a>
          <a href="#contact" className="hover:underline">İletişim</a>
        </nav>

        {/* Sağ: Sepet butonu */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white hover:bg-neutral-50 transition text-sm"
          aria-label={`Sepete git (${count} ürün)`}
        >
          🛒 Sepet
          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded bg-black text-white text-xs">
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}
