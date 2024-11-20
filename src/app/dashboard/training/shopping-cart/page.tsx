<<<<<<< HEAD
"use client";
=======
"use client"
import { ArrowRightSvg } from "@/components/svgs";
>>>>>>> 2d2a2a37f30e333d63524f8c747bf7f7d6888b86
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
    <main>
      <section className="mb-6 flex flex-col items-center justify-between gap-y-4 bg-[#F5F7FA] px-8 py-10">
        <h1 className="text-2xl font-semibold text-[#1D2026]">Shopping Cart</h1>
        {/* <BreadCrumb /> */}
<<<<<<< HEAD
        <p className="text-sm text-[#6E7485]">
          <Link href="/dashboard/training">Home</Link>/ Shopping Cart
        </p>
=======
        <p className="text-sm text-[#6E7485]"><Link href="/dashboard/training">Home</Link>/ Shopping Cart</p>
>>>>>>> 2d2a2a37f30e333d63524f8c747bf7f7d6888b86
      </section>

      <div className="px-14">
        <section>
          <h3 className="mb-6 text-xl font-semibold text-[#1D2026]">
            Shopping Cart ({cartCount})
          </h3>
          <div className="mb-10 flex gap-x-6">
            <section className="w-full">
              <div className="border border-[#E9EAF0]">
                <div className="grid grid-cols-[3fr_1fr_1fr] gap-x-6 border-b border-b-[#E9EAF0] px-6 py-5 text-sm font-medium text-[#4E5566]">
                  <h3>COURSE</h3>
                  <h3>PRICES</h3>
                  <h3>ACTION</h3>
                </div>
                {/* <Wishlists /> */}
                <CartDetails />
              </div>
            </section>

            <section className="grid w-full max-w-[312px] shrink-0 gap-y-4 p-6">
              <p className="flex items-center justify-between text-sm">
                <span className="text-[#6E7485]">Subtotal</span>
                <span className="font-medium text-[#1D2026]">₦{sum} NAIRA</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span className="text-[#6E7485]">Coupon Discount</span>
                <span className="font-medium text-[#1D2026]">0%</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span className="text-[#6E7485]">Taxs</span>
                <span className="font-medium text-[#1D2026]">₦0 NAIRA</span>
              </p>
              <hr />
              <p className="flex items-center justify-between text-[#202029]">
                Total:{" "}
<<<<<<< HEAD
                <span className="text-2xl font-semibold">₦{sum} NAIRA</span>
              </p>
              <MakeTrainingPaymentButton
                courses={cart.map((cart) => ({
                  courseid: cart._id,
                  amount: cart.price,
                  coursetype: cart.coursetype
                }))}
              />
=======
                <span className="text-2xl font-semibold">₦{sum - (sum * 0.08) + 17.99} NAIRA</span>
              </p>
              <Link
                href={routes.TRAININGCHECKOUT}
                className="flex w-full items-center justify-center gap-x-3 bg-primary-500 py-3 font-semibold text-white"
              >
                Proceed to Checkout{" "}
                <ArrowRightSvg stroke="#ffffff" className="-rotate-180" />
              </Link>
>>>>>>> 2d2a2a37f30e333d63524f8c747bf7f7d6888b86
              <hr className="my-2" />
              <div>
                <h3 className="mb-4 text-sm font-medium text-[#1D2026]">
                  Apply coupon code
                </h3>
                <div className="flex justify-between border py-1.5 pl-4 pr-1.5">
                  <input
                    type="text"
                    className="none text-sm text-[#8C94A3] focus:outline"
                    placeholder="Coupon code"
                  />
                  <button className="bg-black px-4 py-3 text-sm font-semibold text-white">
                    Apply
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
