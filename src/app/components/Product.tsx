"use client";

import { useMemo, useState } from "react";
import Section from "./Section";
import UploadBox from "./UploadBox";

type SizeKey = "A4" | "A3" | "A2" | "A1";
type Orientation = "portrait" | "landscape";
type FitMode = "contain" | "cover";

const SIZES: Array<{ key: SizeKey; label: string; cm: [number, number] }> = [
  { key: "A4", label: "A4", cm: [21.0, 29.7] },
  { key: "A3", label: "A3", cm: [29.7, 42.0] },
  { key: "A2", label: "A2", cm: [42.0, 59.4] },
  { key: "A1", label: "A1", cm: [59.4, 84.1] },
];

const PRICE: Record<SizeKey, number> = { A4: 400, A3: 400, A2: 400, A1: 400 };

// göreceli preview ölçeği
const PREVIEW_SCALE: Record<SizeKey, number> = { A4: 0.78, A3: 0.86, A2: 0.93, A1: 1.0 };

// Baskı için minimum DPI eşiği (200–300 yaygın; 200 daha esnek)
const MIN_DPI = 200;

export default function Product() {
  const [selected, setSelected] = useState<SizeKey | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [fitMode, setFitMode] = useState<FitMode>("contain");
  const [imgMeta, setImgMeta] = useState<{ width: number; height: number } | null>(null);

  const price = selected ? PRICE[selected] : 400;

  // Hedef cm (yönü uygula)
  const targetCm = useMemo(() => {
    if (!selected) return null;
    const [w, h] = SIZES.find(s => s.key === selected)!.cm;
    return orientation === "portrait" ? { w, h } : { w: h, h: w };
  }, [selected, orientation]);

  // Önizleme oranı
  const aspectRatio = useMemo(() => {
    const ratioPortrait = 210 / 297; // ≈0.707
    return orientation === "portrait" ? ratioPortrait : 1 / ratioPortrait;
  }, [orientation]);

  // Önizleme göreceli genişlik
  const previewScale = useMemo(() => (selected ? PREVIEW_SCALE[selected] : 0.86), [selected]);

  // Çözünürlük yeterli mi? (piksel >= cm * DPI / 2.54)
  const resolutionWarning = useMemo(() => {
    if (!imgMeta || !targetCm) return null;
    const reqW = Math.round((targetCm.w / 2.54) * MIN_DPI);
    const reqH = Math.round((targetCm.h / 2.54) * MIN_DPI);
    const ok = imgMeta.width >= reqW && imgMeta.height >= reqH;
    return { ok, reqW, reqH };
  }, [imgMeta, targetCm]);

  const canBuy = Boolean(selected && file && consent && (resolutionWarning?.ok ?? true));

  return (
    <Section id="product" className="bg-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Alüminyum Baskı</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Yükleme + Ayarlar */}
          <div className="rounded-xl">
            <UploadBox
              value={file}
              onChange={setFile}
              maxSizeMB={25}
              aspectRatio={aspectRatio}
              rotate90={orientation === "landscape"}
              previewScale={previewScale}
              fitMode={fitMode}
              onFitModeChange={setFitMode}
              onImageInfo={setImgMeta}
            />

            {/* Yön (toggle) */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg border text-sm ${orientation === "portrait" ? "bg-black text-white" : "bg-white hover:bg-neutral-50"}`}
                onClick={() => setOrientation("portrait")}
              >
                Dikey
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg border text-sm ${orientation === "landscape" ? "bg-black text-white" : "bg-white hover:bg-neutral-50"}`}
                onClick={() => setOrientation("landscape")}
              >
                Yatay
              </button>
            </div>

            <p className="mt-2 text-xs text-neutral-500">
              Desteklenen formatlar: JPG, PNG • Maks. 25MB • Fit: {fitMode === "contain" ? "Sığdır (boşluk bırakabilir)" : "Kırp & Doldur (taşanı kırpar)"}
            </p>

            {/* Çözünürlük uyarısı */}
            {imgMeta && targetCm && (
              <div className={`mt-2 text-xs ${resolutionWarning?.ok ? "text-green-700" : "text-red-600"}`}>
                Yüklenen görsel: {imgMeta.width}×{imgMeta.height} px — Hedef {targetCm.w}×{targetCm.h} cm için önerilen min. {Math.round((targetCm.w / 2.54) * MIN_DPI)}×{Math.round((targetCm.h / 2.54) * MIN_DPI)} px
                {!resolutionWarning?.ok && (
                  <span className="block">
                    • Görsel bu boyut için düşük çözünürlükte. Daha küçük bir boyut seçebilir veya farklı görsel yükleyebilirsin.
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Seçimler */}
          <div className="space-y-6">
            <p className="text-sm text-neutral-600">
              Tek ürün, dört boyut seçeneği. Görselini yükle, boyutunu seç; sığdırma veya kırpma tercihini yap.
            </p>

            {/* Boyut Seçimi */}
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-neutral-800">Boyut Seç</legend>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(({ key, label, cm }) => {
                  const active = selected === key;
                  const cmTxt = `${cm[0]} × ${cm[1]} cm`;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelected(key)}
                      aria-pressed={active}
                      aria-label={`${label} (${cmTxt}) seç`}
                      className={[
                        "px-3 py-2 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-black/30",
                        active ? "border-black bg-black text-white" : "border-neutral-300 bg-white hover:border-neutral-400",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-neutral-500 h-4">
                {selected ? `${selected} • ${targetCm?.w} × ${targetCm?.h} cm • ${orientation === "portrait" ? "Dikey" : "Yatay"}` : "Bir boyut seçin"}
              </p>
            </fieldset>

            {/* Fiyat */}
            <div>
              <div className="text-xs text-neutral-500">Fiyat</div>
              <div className="text-2xl font-semibold">₺{price}</div>
            </div>

            {/* Onay kutusu */}
            <div className="space-y-2 text-xs text-neutral-700">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>KVKK ve telif beyanını okudum, onaylıyorum. <em className="text-neutral-500">(Metinler Gün 9’da eklenecek)</em></span>
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
                  `Seçilen: ${selected} (${orientation})\nFit: ${fitMode}\nFiyat: ₺${price}\nDosya: ${file?.name}\n\n(Ödeme entegrasyonu Gün 8’de eklenecek.)`
                );
              }}
            >
              Satın Al
            </button>

            <p className="text-[11px] leading-relaxed text-neutral-500">
              * Sığdır: Görselin tamamı görünür, yanlarda boşluk olabilir. Kırp & Doldur: Plakayı tam doldurur, kenarlardan kırpabilir.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
