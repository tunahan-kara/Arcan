"use client";

import { useState } from "react";
import Section from "./Section";
import UploadBox from "./UploadBox";

type SizeKey = "A4" | "A3" | "A2" | "A1";

const SIZES: Array<{ key: SizeKey; label: string; cm: string }> = [
  { key: "A4", label: "A4", cm: "21 × 29.7 cm" },
  { key: "A3", label: "A3", cm: "29.7 × 42 cm" },
  { key: "A2", label: "A2", cm: "42 × 59.4 cm" },
  { key: "A1", label: "A1", cm: "59.4 × 84.1 cm" },
];

const PRICE: Record<SizeKey, number> = { A4: 400, A3: 400, A2: 400, A1: 400 };

const MIN_PX: Record<SizeKey, string> = {
  A4: "≈ 1650 × 2350 px",
  A3: "≈ 2340 × 3300 px",
  A2: "≈ 3300 × 4680 px",
  A1: "≈ 4680 × 6620 px",
};

export default function Product() {
  const [selected, setSelected] = useState<SizeKey | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const price = selected ? PRICE[selected] : 400;
  const minPx = selected ? MIN_PX[selected] : null;
  const cmInfo = selected ? SIZES.find((s) => s.key === selected)?.cm : null;

  const canBuy = Boolean(selected && file && consent);

  return (
    <Section id="product" className="bg-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Alüminyum Baskı</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Yükleme Alanı */}
          <div className="rounded-xl">
            <UploadBox value={file} onChange={setFile} maxSizeMB={25} />
            <p className="mt-2 text-xs text-neutral-500">
              Desteklenen formatlar: JPG, PNG • Maks. 25MB
            </p>
          </div>

          {/* Seçimler */}
          <div className="space-y-6">
            <p className="text-sm text-neutral-600">
              Tek ürün, dört boyut seçeneği. Görselini yükle, boyutunu seç, biz üretelim.
            </p>

            {/* Boyut Seçimi */}
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-neutral-800">Boyut Seç</legend>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(({ key, label, cm }) => {
                  const active = selected === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelected(key)}
                      aria-pressed={active}
                      aria-label={`${label} (${cm}) seç`}
                      className={[
                        "px-3 py-2 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-black/30",
                        active
                          ? "border-black bg-black text-white"
                          : "border-neutral-300 bg-white hover:border-neutral-400",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-neutral-500 h-4">
                {cmInfo ? `${selected} • ${cmInfo}` : "Bir boyut seçin"}
              </p>
            </fieldset>

            {/* Fiyat */}
            <div className="flex items-end gap-3">
              <div>
                <div className="text-xs text-neutral-500">Fiyat</div>
                <div className="text-2xl font-semibold">₺{price}</div>
              </div>
            </div>

            {/* Önerilen çözünürlük */}
            <div className="text-xs text-neutral-600">
              {minPx ? (
                <>Önerilen minimum çözünürlük: <span className="font-medium">{minPx}</span></>
              ) : (
                <>Seçtiğin boyuta göre önerilen çözünürlük gösterilecektir.</>
              )}
            </div>

            {/* Onay kutusu */}
            <div className="space-y-2 text-xs text-neutral-700">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  KVKK ve telif beyanını okudum, onaylıyorum.
                  <em className="text-neutral-500"> (Metinler Gün 9’da eklenecek)</em>
                </span>
              </label>
            </div>

            {/* Satın Al */}
            <button
              type="button"
              disabled={!canBuy}
              className={[
                "inline-flex items-center justify-center px-4 py-2 rounded-lg text-white transition",
                canBuy ? "bg-black hover:bg-neutral-800" : "bg-neutral-400 cursor-not-allowed",
              ].join(" ")}
              onClick={() => {
                if (!canBuy) return;
                alert(
                  `Seçilen boyut: ${selected}\nFiyat: ₺${price}\nDosya: ${file?.name}\n\nÖdeme entegrasyonu Gün 8’de eklenecek.`
                );
              }}
            >
              Satın Al
            </button>

            <p className="text-[11px] leading-relaxed text-neutral-500">
              * Satın almadan önce KVKK & telif onayı alınacaktır. Ekran–baskı arasında küçük renk farkları görülebilir.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
