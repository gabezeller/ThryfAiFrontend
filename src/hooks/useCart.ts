import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  productName: string;
  price: number;
  imageUrl: string;
  gender: string;
  description?: string;
}

const CART_STORAGE_KEY = 'thryft-cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Item already in cart, don't add duplicate
        return prevCart;
      }
      // Add new item to cart
      return [...prevCart, item];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const isInCart = (itemId: number) => {
    return cart.some((item) => item.id === itemId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getCartTotal,
    cartCount: cart.length,
  };
}
