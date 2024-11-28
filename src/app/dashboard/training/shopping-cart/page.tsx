"use client";
import Link from "next/link";
import CartDetails from "../components/cart-details";
import { useCart } from "@/lib/TrainingCartContext";
import MakeTrainingPaymentButton from "../components/make-training-payments";

export default function ShoppingCard() {
  const { cart, cartCount } = useCart();

  const getSum = () => {
    const total = cart.map((cart) => cart.price);
    const sum = total.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  };
  const sum = getSum();

  return (
    <main className="w-full">
      <section className="mb-6 flex flex-col items-center justify-between gap-y-4 bg-[#F5F7FA] px-4 md:px-14 py-10">
        <h1 className="text-2xl font-semibold text-[#1D2026]">Shopping Cart</h1>
        {/* <BreadCrumb /> */}
        <p className="text-sm text-[#6E7485]">
          <Link href="/dashboard/training">Home</Link>/ Shopping Cart
        </p>
      </section>

      <div className="px-4 md:px-14">
        <section>
          <h3 className="mb-6 text-center text-xl font-semibold text-[#1D2026]">
            Shopping Cart ({cartCount})
          </h3>
          <div className="mb-10 flex flex-col items-center gap-6 px-4 xl:flex-row xl:items-start">
            <section className="w-full overflow-x-scroll">
              <div className={`border border-[#E9EAF0] ${cartCount > 0 ? "w-min" : "w-full"}`}>
                <div className="grid grid-cols-[3fr_1fr_1fr] w-full gap-x-6 border-b border-b-[#E9EAF0] px-6 py-5 text-sm font-medium text-[#4E5566]">
                  <h3>COURSE</h3>
                  <h3>PRICES</h3>
                  <h3>ACTION</h3>
                </div>
                {/* <Wishlists /> */}
                <div>
                  <CartDetails />
                </div>
              </div>
            </section>

            <section className="grid w-full shrink-0 gap-y-4 p-6 xl:max-w-[312px]">
              <p className="flex items-center justify-between text-sm">
                <span className="text-[#6E7485]">Subtotal</span>
                <span className="font-medium text-[#1D2026]">₦{sum} NAIRA</span>
              </p>
              <hr />
              <p className="flex items-center justify-between text-[#202029]">
                Total:{" "}
                <span className="text-2xl font-semibold">₦{sum} NAIRA</span>
              </p>
              <MakeTrainingPaymentButton
                button="now"
                type
                courses={cart.map((cart) => ({
                  courseid: cart._id,
                  amount: cart.price,
                  coursetype: cart.coursetype,
                }))}
              />
              <hr className="my-2" />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
