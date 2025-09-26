"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
  maxSizeMB?: number; // varsayılan 12MB
};

export default function UploadBox({ value, onChange, maxSizeMB = 12 }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  // Drag & drop
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  // Preview URL
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

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
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        {!preview ? (
          <>
            <p className="text-sm text-neutral-700">
              Görselinizi buraya sürükleyip bırakın veya
            </p>
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
          <div className="relative">
            {/* Önizleme */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Önizleme"
              className="mx-auto max-h-72 rounded-lg object-contain"
            />
            <div className="mt-3 flex items-center justify-center gap-3">
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
