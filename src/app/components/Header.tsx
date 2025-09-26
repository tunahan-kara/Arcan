"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={140} height={40} priority />
        </Link>

        <div className="hidden md:flex gap-6 text-sm">
          {/* Ana sayfa bölümleri -> mutlak anchor: /#id */}
          <Link href="/#how" className="hover:underline underline-offset-4">
            Nasıl Çalışır
          </Link>
          <Link href="/#gallery" className="hover:underline underline-offset-4">
            Örnekler
          </Link>
          {/* Ürün artık ayrı sayfada */}
          <Link href="/order" className="hover:underline underline-offset-4">
            Ürün
          </Link>
          <Link href="/#faq" className="hover:underline underline-offset-4">
            SSS
          </Link>
          <Link href="/#contact" className="hover:underline underline-offset-4">
            İletişim
          </Link>
        </div>
      </nav>
    </header>
  );
}
