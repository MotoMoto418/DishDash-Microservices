"use client";

import { CartContextProvider } from "@/hooks/useCart";
import React from "react";

export default function CartProvider({ children }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
