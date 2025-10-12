"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FitMode = "contain" | "cover";

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
  maxSizeMB?: number;           // varsayılan 12MB
  aspectRatio?: number;         // w/h (A-serisi dikey ≈ 0.707)
  rotate90?: boolean;           // 90° çevir
  previewScale?: number;        // önizleme çerçevesinin göreceli genişliği (A1>A4)
  fitMode?: FitMode;            // sığdır (contain) / kırp-doldur (cover)
  onFitModeChange?: (m: FitMode) => void;
  onImageInfo?: (info: { width: number; height: number }) => void; // doğal piksel
  frameSrc?: string;            // üst katmana bindirilecek şeffaf ortalı PNG
  wallSrc?: string;             // arka plan (opsiyonel)
};

export default function UploadBox({
  value,
  onChange,
  maxSizeMB = 12,
  aspectRatio = 0.707,
  rotate90 = false,
  previewScale = 0.9,
  fitMode = "contain",
  onFitModeChange,
  onImageInfo,
  frameSrc,
  wallSrc,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cover moduna özel: zoom & pan
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const validate = (file: File) => {
    const typeOk = ["image/jpeg", "image/png"].includes(file.type);
    if (!typeOk) return "Lütfen JPG veya PNG formatında görsel yükleyin.";
    const sizeOk = file.size <= maxSizeMB * 1024 * 1024;
    if (!sizeOk) return `Dosya boyutu ${maxSizeMB}MB’ı geçemez.`;
    return null;
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || !files[0]) return;
      const file = files[0];
      const err = validate(file);
      if (err) {
        setError(err);
        onChange(null);
        return;
      }
      setError(null);
      onChange(file);
    },
    [onChange]
  );

  // Preview URL
  useEffect(() => {
    if (!value) {
      setPreview(null);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  // Doğal piksel bilgisini bildir
  useEffect(() => {
    if (!preview || !onImageInfo) return;
    const img = new Image();
    img.onload = () => onImageInfo({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = preview;
  }, [preview, onImageInfo]);

  // Drag & drop
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setDragOver(true); };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setDragOver(false); };

  // Pan (sürükle) sadece cover modunda aktif
  const onPointerDown = (e: React.PointerEvent) => {
    if (fitMode !== "cover") return;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    dragStart.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div className="space-y-2">
      <div
        className={[
          "relative rounded-xl border border-dashed p-6 text-center transition",
          dragOver ? "border-black bg-black/5" : "border-neutral-300 bg-neutral-100/70",
        ].join(" ")}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        role="button"
        aria-label="Görsel yükleme alanı"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
      >
        {!preview ? (
          <>
            <p className="text-sm text-neutral-700">Görselinizi buraya sürükleyin veya</p>
            <button
              type="button"
              className="mt-3 inline-flex px-3 py-2 rounded-lg border bg-white hover:bg-neutral-50 transition text-sm"
              onClick={() => inputRef.current?.click()}
            >
              Dosya Seç (JPG/PNG)
            </button>
            <p className="mt-2 text-xs text-neutral-500">Maksimum {maxSizeMB}MB</p>
          </>
        ) : (
          <div className="space-y-3">
            {/* Önizleme sahnesi: duvar + kullanıcı görseli + çerçeve */}
            <div
              className="relative mx-auto rounded-lg shadow border border-neutral-200 overflow-hidden select-none"
              style={{
                aspectRatio,
                width: `${Math.round(520 * previewScale)}px`,
                maxWidth: "100%",
                backgroundColor: "#eee",
                backgroundImage: wallSrc ? `url(${wallSrc})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: fitMode === "cover" ? (dragging ? "grabbing" : "grab") : "default",
                touchAction: "none",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* Kullanıcı görseli */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Önizleme"
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-300"
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate90 ? 90 : 0}deg) scale(${zoom})`,
                  objectFit: fitMode === "contain" ? "contain" : "cover",
                  zIndex: 1,
                }}
              />

              {/* Çerçeve overlay */}
              {frameSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={frameSrc}
                  alt="Çerçeve"
                  className="absolute inset-0 h-full w-full pointer-events-none select-none"
                  style={{ zIndex: 2 }}
                />
              )}
            </div>

            {/* Kontroller */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border bg-white hover:bg-neutral-50 transition text-sm"
                onClick={() => inputRef.current?.click()}
              >
                Değiştir
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 transition text-sm"
                onClick={() => onChange(null)}
              >
                Kaldır
              </button>

              {/* Fit mode toggle */}
              <div className="inline-flex rounded-lg overflow-hidden border ml-2">
                <button
                  type="button"
                  className={`px-3 py-1.5 text-sm ${fitMode === "contain" ? "bg-black text-white" : "bg-white"}`}
                  onClick={() => onFitModeChange?.("contain")}
                >
                  Sığdır
                </button>
                <button
                  type="button"
                  className={`px-3 py-1.5 text-sm ${fitMode === "cover" ? "bg-black text-white" : "bg-white"}`}
                  onClick={() => onFitModeChange?.("cover")}
                >
                  Kırp & Doldur
                </button>
              </div>

              {/* Zoom (cover modunda anlamlı) */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-neutral-600">Yakınlaştır</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat((e.target as HTMLInputElement).value))}
                />
                <button
                  type="button"
                  className="px-2 py-1 rounded border text-xs bg-white"
                  onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}
                >
                  Sıfırla
                </button>
              </div>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <div className="text-xs text-red-600">{error}</div>}
    </div>
  );
}
