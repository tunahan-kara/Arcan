// app/cart/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../store/cart";

export default function CartPage() {
  const { items, removeItem, updateQty, clear } = useCart();
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Geri Butonu */}
      <div className="mb-6">
        <Link
          href="/#product"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-neutral-50 transition text-sm"
        >
          ← Alışverişe Devam Et
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Sepet</h1>

      {items.length === 0 ? (
        <div className="rounded-lg border p-8 bg-white">
          <p className="text-neutral-600">Sepetiniz boş.</p>
          <Link
            href="/#product"
            className="inline-flex mt-4 px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition"
          >
            Ürünlere Dön
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr,320px] gap-8">
          {/* Liste */}
          <div className="space-y-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex gap-4 rounded-lg border bg-white p-4 items-center"
              >
                <div className="relative w-24 h-24 rounded overflow-hidden bg-neutral-100">
                  {it.previewUrl ? (
                    <Image
                      src={it.previewUrl}
                      alt={it.filename ?? "Önizleme"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-xs text-neutral-500">
                      Önizleme yok
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-medium">
                    {it.size} • {it.orientation === "portrait" ? "Dikey" : "Yatay"}
                  </div>
                  <div className="text-xs text-neutral-500">
                    Fit: {it.fitMode === "contain" ? "Sığdır" : "Kırp & Doldur"}
                    {it.filename ? ` • Dosya: ${it.filename}` : ""}
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm">Adet</label>
                    <input
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) =>
                        updateQty(
                          it.id,
                          Math.max(1, parseInt(e.target.value || "1", 10))
                        )
                      }
                      className="w-16 rounded border px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold">₺{it.price * it.qty}</div>
                  <button
                    className="mt-2 text-sm text-red-600 hover:underline"
                    onClick={() => removeItem(it.id)}
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Özet */}
          <div className="rounded-lg border bg-white p-4 h-fit">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span className="font-medium">₺{total}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>Kargo</span>
              <span>Ödeme aşamasında</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Toplam</span>
              <span>₺{total}</span>
            </div>

            <button
              className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition"
              onClick={() => alert("Ödeme entegrasyonu Gün 8’de bağlanacak.")}
            >
              Ödemeye Geç
            </button>

            <button
              className="w-full mt-2 text-sm text-neutral-600 hover:underline"
              onClick={clear}
            >
              Sepeti Temizle
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
