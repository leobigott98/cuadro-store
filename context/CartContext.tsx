import React, { createContext, ReactNode, useContext, useState } from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  images: any[]; // require() for assets
};

type CartItem = Product & { quantity: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;  // ✅ NEW
  clearCart: () => void;
  openQuickView: boolean;
  setOpenQuickView: (value: boolean) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openQuickView, setOpenQuickView] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setOpenQuickView(true); // Open quickview
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) } // prevent 0 or negative
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,   // ✅ now available in context
        clearCart,
        openQuickView,
        setOpenQuickView,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
