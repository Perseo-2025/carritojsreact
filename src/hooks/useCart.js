import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";


export const useCart = () => {
  
    const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex((e) => e.id === item.id);
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEM) return;
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }

  }

  function eliminarElemento(id) {
    setCart((prevCart) => prevCart.filter((e) => e.id !== id));
  }

  function decrementElement(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEM)
        return { ...item, quantity: item.quantity - 1 };
      return item;
    });
    setCart(updateCart);
  }

  function incrementaElement(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEM)
        return { ...item, quantity: item.quantity + 1 };
      return item;
    });
    setCart(updateCart);
  }

  function removeAllElement() {
    setCart([]);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart]) ;

  
  return { 
    data, 
    cart, 
    addToCart, 
    removeAllElement, 
    eliminarElemento, 
    decrementElement, 
    incrementaElement,
    isEmpty,
    cartTotal
    };
};
