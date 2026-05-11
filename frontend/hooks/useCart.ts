import { useEffect, useState } from 'react';

export interface CartItem {
  id: number;
  name: string;
  priceCents: number;
  image?: string;
  qty: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: Omit<CartItem, 'qty'>) {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQty(id: number, qty: number) {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty } : p))
    );
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce(
    (sum, p) => sum + p.qty * (p.priceCents / 100),
    0
  );

  return { cart, addToCart, removeFromCart, updateQty, clearCart, total };
}