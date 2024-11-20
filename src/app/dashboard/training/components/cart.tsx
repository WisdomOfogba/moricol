"use client";
import { CartSvg } from "@/components/svgs";
import { routes } from "@/constants/routes";
import { useCart } from "@/lib/TrainingCartContext";
import Link from "next/link";
import React from "react";

const Cart = () => {
  const { cartCount } = useCart();

  return (
    <Link href={routes.TRAININGSHOPPINGCART} className="relative">
      <CartSvg />
      {cartCount > 0 && (
        <div className="absolute -top-[3px] left-[11px] flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-medium leading-none text-white">
          {cartCount}
        </div>
      )}
    </Link>
  );
};

export default Cart;
