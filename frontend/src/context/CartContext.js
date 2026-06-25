import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const { isLoggedIn, token } = useAuth();

  const fetchCart = async () => {
    try {
      const res = await cartAPI.get();
      setCart(res.data);
      setCartCount(res.data?.items?.length || 0);
    } catch (err) {
      console.error('Cart fetch error:', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchCart();
    } else {
      setCart(null);
      setCartCount(0);
    }
  }, [isLoggedIn, token]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await cartAPI.add(productId, quantity);
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    await cartAPI.remove(productId);
    await fetchCart();
  };

  const updateCart = async (productId, quantity) => {
    await cartAPI.update(productId, quantity);
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, fetchCart, addToCart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);