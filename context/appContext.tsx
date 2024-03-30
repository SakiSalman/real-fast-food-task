"use client"
import { ProductModels } from "@/models/ProductModel";
import React, { createContext, useState } from "react";
interface ContextValue {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  cartOpen: boolean,
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>
  quantity: number,
  setQuantity: React.Dispatch<React.SetStateAction<number>>,
  products: ProductModels[],
  setProducts: React.Dispatch<React.SetStateAction<ProductModels[]>>
}

const defaultValue: ContextValue = {
  cart: [],
  setCart: () => { },
  cartOpen: false,
  setCartOpen: () => { },
  total: 0,
  setTotal: () => { },
  quantity: 0,
  setQuantity: () => { },
  products: [],
  setProducts: () => { },
};

export const AppContext = createContext(defaultValue);

export const AppContextProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [products, setProducts] = useState<ProductModels[]>([]);

  const contextValue: ContextValue = {
    cart,
    setCart,
    setCartOpen,
    cartOpen,
    total,
    setTotal,
    quantity,
    setQuantity,
    products,
    setProducts
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
