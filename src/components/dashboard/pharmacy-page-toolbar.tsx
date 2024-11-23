"use client";
import { cn } from "@/util/cn";
import { HeartSVG } from "../svgs";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SavedProducts } from "@/app/dashboard/pharmarcy/account/saved-items/page";
import onlinePharmacyApi from "@/api/online-pharmacy";
import { Product, setCart } from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hook";

export default function PageToolBar() {
  const { data: session } = useSession();
  const [savedProducts, setSavedProducts] = useState<SavedProducts[]>([]);
  const cart = useSelector((state: RootState) => state.drugcart.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await onlinePharmacyApi
        .getSavedProduct(
          session!,
          //@ts-expect-error: threll be id
          session?.user.id,
        )
        .then((res) => {
          setSavedProducts(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      const newCart: Product[] = JSON.parse(existingCart);
      dispatch(setCart(newCart));
    }
  }, []);

  return (
    <section className="border-b-grey-300 flex items-end justify-end gap-y-5 border-b px-5 py-5 lg:gap-x-10 lg:px-14">
      <div className="flex gap-x-7 justify-self-end">
        <Link
          href="/dashboard/pharmarcy/account/saved-items"
          className="relative"
        >
          <HeartSVG />
          <NumberBadge
            qty={savedProducts.filter((s) => s.productid != null).length}
            className="absolute -right-2 -top-1"
          />
        </Link>
        <Link href={routes.PHARMARCYCART} className="relative">
          <CartSVG />
          <NumberBadge qty={cart.length} className="absolute -right-2 -top-1" />
        </Link>
      </div>
    </section>
  );
}

function CartSVG() {
  return (
    <svg
      width="43"
      height="44"
      viewBox="0 0 43 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6779 36.6097C15.4094 36.6097 16.0023 36.0168 16.0023 35.2853C16.0023 34.5539 15.4094 33.9609 14.6779 33.9609C13.9465 33.9609 13.3535 34.5539 13.3535 35.2853C13.3535 36.0168 13.9465 36.6097 14.6779 36.6097Z"
        stroke="#E29A13"
        strokeWidth="2.6488"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.2189 36.6097C33.9504 36.6097 34.5433 36.0168 34.5433 35.2853C34.5433 34.5539 33.9504 33.9609 33.2189 33.9609C32.4875 33.9609 31.8945 34.5539 31.8945 35.2853C31.8945 36.0168 32.4875 36.6097 33.2189 36.6097Z"
        stroke="#E29A13"
        strokeWidth="2.6488"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.08203 7.47266H9.37962L13.3528 29.9874H34.5432"
        stroke="#E29A13"
        strokeWidth="2.6488"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3539 24.6893H34.0012C34.1544 24.6894 34.3028 24.6364 34.4213 24.5394C34.5398 24.4423 34.621 24.3072 34.651 24.1571L37.0349 12.2375C37.0542 12.1414 37.0518 12.0422 37.0281 11.9471C37.0043 11.852 36.9598 11.7633 36.8976 11.6875C36.8354 11.6118 36.7572 11.5507 36.6686 11.5088C36.58 11.4669 36.4832 11.4452 36.3852 11.4453H10.7051"
        stroke="#E29A13"
        strokeWidth="2.6488"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NumberBadge({ className, qty }: { className?: string; qty?: number }) {
  return (
    <div
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-full bg-[#E31E25] text-white",
        className,
      )}
    >
      {qty ? String(qty) : "0"}
    </div>
  );
}
