"use client";

import { createContext, useContext, useState } from "react";

type OrderState = "list" | "pending" | "delivered" | "returned" | "approved";

interface OrderContextType {
  state: OrderState;
  setState: React.Dispatch<React.SetStateAction<OrderState>>;
  item: number;
  setItem: React.Dispatch<React.SetStateAction<number>>;
}

const OrdersContext = createContext<OrderContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OrderState>("list");
  const [item, setItem] = useState<number>(0);

  return (
    <OrdersContext.Provider value={{ state, setState, item, setItem }}>
      {children}
    </OrdersContext.Provider>
  );
}

export default function useOrders() {
  const context = useContext(OrdersContext);

  if (context === undefined) {
    throw new Error("useOrders must be used within an Ordersprovider");
  }

  return context;
}
