// app/store/cart.ts
import { create } from "zustand";
import { nanoid } from "nanoid";

export type SizeKey = "A4" | "A3" | "A2" | "A1";
export type Orientation = "portrait" | "landscape";
export type FitMode = "contain" | "cover";

export type CartItem = {
  id: string;                 // satır id (sepet içi)
  size: SizeKey;
  orientation: Orientation;
  fitMode: FitMode;
  price: number;
  qty: number;
  // Opsiyonel: önizleme ve dosya bilgisi
  previewUrl?: string | null; // object URL
  filename?: string | null;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          id: nanoid(),
          qty: item.qty ?? 1,
          ...item,
        },
      ],
    })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((it) => it.id !== id) })),
  updateQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((it) => (it.id === id ? { ...it, qty } : it)),
    })),
  clear: () => set({ items: [] }),
}));
