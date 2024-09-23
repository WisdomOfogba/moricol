import Button from "@/components/button";
import SummaryProductCard from "@/components/dashboard/summary-product-card";
// import Image from "next/image";

export default function page() {
  return (
    // <section className="rounded border border-gray-300">
    //   <div className="border-b border-gray-300 px-6 pt-5">
    //     <h2 className="inline-block border-b-2 border-b-primary-500 pb-5">
    //       My Orders
    //     </h2>
    //   </div>

    //   <ul>
    //     <li className="border border-b-gray-300 px-6 py-5 last:border-none">
    //       <OrderSummary />
    //     </li>
    //     <li className="border border-b-gray-300 px-6 py-5 last:border-none">
    //       <OrderSummary />
    //     </li>
    //   </ul>
    // </section>
    <OrderDetail />
  );
}

// function OrderSummary() {
//   return (
//     <article className="relative flex items-center gap-x-4">
//       <div className="relative h-[101.73px] w-[97px] overflow-hidden">
//         <Image
//           src="/images/dashboard/drug.png"
//           alt=""
//           fill
//           sizes="60px"
//           className="shrink-0"
//         />
//         <div className="abolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-[#0C0C0D75] p-1.5 text-xs font-bold text-white">
//           x1
//         </div>
//       </div>
//       <div>
//         <h3 className="mb-2 text-xs">
//           L&apos;Oréal, Revitalift Triple Power, Anti-Aging
//         </h3>
//         <div className="mb-2.5 text-xs text-gray-500">
//           <p>
//             Order Number:{" "}
//             <span className="mb-0.5 text-primary-500">00012345GT</span>
//           </p>
//           <p>
//             Order Number: <span className="text-primary-500">00012345GT</span>
//           </p>
//         </div>
//         <span className="rounded bg-[#1F922B] px-3 py-1 text-xs font-bold text-white">
//           Delivered
//         </span>
//       </div>
//       <button className="absolute right-8 top-0 text-xs font-bold text-[#E31E25]">
//         More Details
//       </button>
//     </article>
//   );
// }

function OrderDetail() {
  return (
    <section className="text-xs">
      <div className="border-b border-gray-300 px-6 pt-5">
        <h2 className="pb-5 font-bold text-primary-500">
          &larr; Order Details
        </h2>
      </div>

      <section className="my-7 flex justify-between">
        <div className="grid gap-y-0.5">
          <h3 className="font-bold text-primary-500">ORDER #001394834</h3>
          <p>2 Items</p>
          <p>Placed on 05-03-2023</p>
          <p>Total: ₦759.99</p>
        </div>
        <div className="flex flex-col gap-y-2.5">
          <Button className="w-fit py-2 font-bold">Track Order</Button>
          <Button className="w-fit py-2 font-bold" variant="outline">
            Cancel Order
          </Button>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="mb-4 font-bold text-primary-500">ITEMS IN YOUR ORDER</h3>
        <ul className="grid gap-y-1.5">
          <li>
            <article className="rounded border border-gray-300 px-3.5 py-5">
              <SummaryProductCard />
              <p className="mt-5">
                Our <span className="text-primary-500">return policy</span>{" "}
                applies to this item
              </p>
            </article>
          </li>
          <li>
            <article className="rounded border border-gray-300 px-3.5 py-5">
              <SummaryProductCard />
              <p className="mt-5">
                Our <span className="text-primary-500">return policy</span>{" "}
                applies to this item
              </p>
            </article>
          </li>
        </ul>
      </section>

      <div className="mb-3.5 flex gap-x-3.5">
        <section className="w-1/2 rounded border border-gray-300">
          <div className="border-b border-gray-300 px-6 pt-5">
            <h2 className="inline-block pb-5 font-bold text-primary-500">
              PAYMENT INFORMATION
            </h2>
          </div>

          <div className="px-6 py-5">
            <article className="mb-5">
              <h3 className="mb-1.5 font-bold text-primary-500">
                Payment Method
              </h3>
              <p>Pay on Delivery</p>
            </article>

            <article className="mb-5">
              <h3 className="mb-1.5 font-bold text-primary-500">
                Payment Details
              </h3>
              <ul className="grid gap-y-0.5">
                <li>Items total: ₦659.99</li>
                <li>Delivery Fees: ₦129.80</li>
                <li>Promotional Discount: - ₦59</li>
                <li>Total: ₦759.99</li>
              </ul>
            </article>
          </div>
        </section>
        <section className="w-1/2 rounded border border-gray-300">
          <div className="border-b border-gray-300 px-6 pt-5">
            <h2 className="inline-block pb-5 font-bold text-primary-500">
              DELIVERY INFORMATION
            </h2>
          </div>
          <div className="px-6 py-5">
            <article className="mb-5">
              <h3 className="mb-1.5 font-bold text-primary-500">
                Billing Address
              </h3>
              <p>C Darl Uzu</p>
              <p>Pay on Delivery</p>
              <p>
                Court Estate, Durumi | Federal Capital Territory - ABUJA- DURUMI
                | 900103
              </p>
            </article>

            <article className="mb-5">
              <h3 className="mb-1.5 font-bold text-primary-500">
                Delivery Address
              </h3>
              <p>C Darl Uzu</p>
              <p>Pay on Delivery</p>
              <p>
                Court Estate, Durumi | Federal Capital Territory - ABUJA- DURUMI
                | 900103
              </p>
            </article>
          </div>
        </section>
      </div>
      <p>
        <span className="font-bold text-primary-500">Contact Support</span> if
        you can help
      </p>
    </section>
  );
}
