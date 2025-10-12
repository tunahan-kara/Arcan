"use client";

import Link from "next/link";
import { useCart } from "../store/cart";

export default function CartButton() {
  const count = useCart((s) => s.items.reduce((sum, it) => sum + it.qty, 0));

  return (
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
  );
}
