"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Updated CourseData Type
export type Coursedata = {
  _id: string;
  title: string;
  price: number;
  coursetype: string;
  instructors: {
    instructor: string;
  }[];
  rating: number;
  thumbnail: string
};

type CartContextType = {
  cart: Coursedata[];
  addToCart: (item: Coursedata) => void;
  removeFromCart: (id: string) => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Coursedata[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Coursedata) => {
    setCart((prevCart) => {
      const exists = prevCart.some((cartItem) => cartItem._id === item._id);
      if (exists) return prevCart;

      // Adding coursehey
      return [...prevCart, { ...item, coursetype: item.coursetype }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
