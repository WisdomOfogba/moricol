"use client";

import onlinePharmacyApi from "@/api/online-pharmacy";
import SummaryProductCard from "@/components/dashboard/summary-product-card";
// import { DownloadSvg } from "@/components/svgs";
import { routes } from "@/constants/routes";
import useOrders from "@/hooks/useOrders";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AddressParams } from "./addresses/page";
import { convertDate } from "@/util/get-total";
import { Loader2 } from "lucide-react";
import Button from "@/components/button";
import { storeToLocalStorage } from "@/util/store-to-localstorage";
import { useRouter } from "next/navigation";
import { DownloadSvg } from "@/components/svgs";

export interface Order {
  createdAt: string;
  delivery_address: AddressParams;
  trackingid: string;
  _id: string;
  order_returned: boolean;
  order_paid: boolean;
  paymentid: string;
  status: "delivered" | "pending" | "returned" | "approved";
  total_amount: number;
  userid: string;
  delivery_fee: number;
  items: [
    {
      price: number;
      productid: {
        coverimage: string;
        name: string;
        _id: string;
      };
      quantity: number;
      subprice: number;
      _id: string;
      variant: [
        {
          price: number;
          value: string;
          variant_type: string;
        },
      ];
    },
  ];
}
export interface OrderList {
  data: Order[];
}
export default function MyOrders() {
  const { data: session } = useSession();
  const { state, setItem, item } = useOrders();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await onlinePharmacyApi
        .getAllOrders(
          session!,
          // @ts-expect-error: 'id' is not a property of 'session'
          session?.user.id,
        )
        .then((s) => {
          setOrders(
            s.data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            ),
          );
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [session]);
  // console.log(orders);
  return (
    // <OrdersProvider>
    <OrdersContent />
    // {/* </OrdersProvider> */}
  );

  function OrdersContent() {
    const pageToLoad =
      state === "list" ? (
        <OrdersList />
      ) : state === "pending" ? (
        <PendingDetail />
      ) : state === "delivered" ? (
        <DeliveredDetails />
      ) : state === "returned" ? (
        <ReturnedDetails />
      ) : (
        <PendingDetail />
      );

    return pageToLoad;
  }

  function OrdersList() {
    // console.log(orders);
    return (
      <section className="rounded border border-gray-300">
        <div className="border-b border-gray-300 pt-5">
          <h2 className="inline-block border-b-2 border-b-primary-500 px-6 pb-5 font-semibold text-primary-500">
            My Orders
          </h2>
        </div>

        <ul>
          {orders ? (
            orders
              // .sort(
              //   (a, b) =>
              //     new Date(b.createdAt).getTime() -
              //     new Date(a.createdAt).getTime(),
              // )
              // .slice(0, 5)
              .map((order, i) => (
                <li
                  key={i}
                  className="border border-b-gray-300 px-6 py-5 last:border-none"
                >
                  <OrderSummary
                    productNames={order.items
                      .filter((e) => e.productid != null)
                      .map((e) => e.productid.name)
                      .join(", ")}
                    imageUrl={order.items[0].productid?.coverimage}
                    index={i}
                    status={order.status}
                    orderDate={order.createdAt}
                    orderId={order._id}
                  />
                </li>
              ))
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin" />
              <p>Please wait. Loading your orders.</p>
            </div>
          )}
        </ul>
      </section>
    );
  }

  function OrderSummary({
    status,

    imageUrl,
    productNames,
    orderId,
    orderDate,
    index,
  }: {
    status: "delivered" | "pending" | "returned" | "approved";

    orderId: string;
    orderDate: string;
    index: number;
    imageUrl: string;
    productNames: string;
  }) {
    const { setState } = useOrders();

    const bgColor =
      status === "delivered"
        ? "#1F922B"
        : status === "pending"
          ? "#E2AC5A"
          : status === "approved"
            ? "#660066"
            : "#59B2F3";

    const statusText =
      status === "delivered"
        ? "Delivered"
        : status === "pending"
          ? "Pending Approval"
          : status === "approved"
            ? "Approved - Proceed to pay"
            : "Returned Order";

    const setParticularItem = async (index: number) => {
      setItem(index);
    };

    const displayOrderCardDetails = async (index: number) => {
      await setParticularItem(index).then(() => {
        status === "delivered"
          ? setState("delivered")
          : status === "pending"
            ? setState("pending")
            : status === "approved"
              ? setState("approved")
              : setState("returned");
      });
      // .finally(() => console.log(item, index));

      // })
    };

    return (
      <article className="relative flex items-center gap-x-4">
        <div className="relative h-[101.73px] w-[97px] overflow-hidden">
          <Image
            src={imageUrl ?? "/images/dashboard/drug.png"}
            alt=""
            fill
            sizes="60px"
            className="shrink-0"
          />
          <div className="abolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-[#0C0C0D75] p-1.5 text-xs font-bold text-white">
            x1
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs">
            {productNames
              ? productNames
              : "Oréal, Revitalift Triple Power, Anti-Aging"}
          </h3>
          <div className="mb-2.5 text-xs text-gray-500">
            <p>
              Order Number:{" "}
              <span className="mb-0.5 text-primary-500">
                #{orderId.slice(0, 10)}
              </span>
            </p>
            <p>
              Order Date:{" "}
              <span className="text-primary-500">{convertDate(orderDate)}</span>
            </p>
          </div>
          <span
            className="rounded px-3 py-1 text-xs font-bold text-white"
            style={{ background: bgColor }}
          >
            {statusText}
          </span>
        </div>
        <button
          className="absolute -top-3 right-2 text-xs font-bold text-[#E31E25] lg:right-8 lg:top-0"
          // value={[orderId, userId ]}
          onClick={() => {
            displayOrderCardDetails(index);
            // setItem(index);
            // console.log(item, index);
          }}
        >
          More Details
        </button>
      </article>
    );
  }

  function PendingDetail() {
    const { setState } = useOrders();
    const makePayment = async () => {
      storeToLocalStorage({
        service: "onlinePharmacy",
        //@ts-expect-error: there'll be id
        toSend: orders[item]._id,
        link: "/dashboard/pharmarcy",
      });
      await onlinePharmacyApi
        .makePayment(
          session!,
          // @ts-expect-error: 'id' is not a property of 'session'
          session?.user.id,
          session?.user.email,

          // @ts-expect-error: 'id' is not a property of 'session'
          orders[item].total_amount,
        )
        .then((val) => router.push(val.data))
        .catch((err) => console.log(err));
    };

    return orders ? (
      <section className="text-xs">
        <div>
          <button
            className="pb-5 text-xs font-bold text-primary-500"
            onClick={() => setState("list")}
          >
            &larr; My Orders
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-[#D2D2D2] pb-3">
          <h2 className="shrink-0 text-lg font-semibold text-primary-500">
            Order Details
          </h2>
        </div>

        <section className="my-7 flex justify-between">
          <div className="grid gap-y-0.5">
            <h3 className="font-bold text-primary-500">
              ORDER #{orders[item]._id.slice(0, 5)}
            </h3>
            <p>{orders[item].items.length} Item(s)</p>
            <p>
              Placed on{" "}
              {orders[item].createdAt
                ? convertDate(orders[item].createdAt)
                : ""}
            </p>
            <p>Total: ₦{orders[item].total_amount}</p>
          </div>
          <div className="flex flex-col gap-y-2.5">
            {/* <Link
              href={routes.PHARMARCYORDERTRACKING}
              className="w-fit rounded-lg bg-primary-500 px-5 py-3 font-bold text-white hover:bg-primary-500/90"
            >
              Track Order
            </Link> */}
            {/* <Button className="w-fit py-2 font-bold" variant="outline">
              Cancel Order
            </Button> */}
          </div>
        </section>

        <section className="mb-3">
          <h3 className="mb-4 font-bold text-primary-500">
            ITEMS IN YOUR ORDER
          </h3>
          <ul className="grid gap-y-1.5">
            {orders[item].items.map((p) => (
              <li key={p._id}>
                <article className="rounded border border-gray-300 px-3.5 py-5">
                  <SummaryProductCard
                    name={p.productid?.name}
                    imageUrl={p.productid?.coverimage}
                    qty={p.quantity}
                    price={p.price}
                  />
                  <p className="mt-5">
                    Our <span className="text-primary-500">return policy</span>{" "}
                    applies to this item
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
        {orders[item].status == "approved" && !orders[item].order_paid && (
          <Button
            onClick={makePayment}
            className="my-3 w-fit rounded-lg bg-primary-500 px-5 py-3 font-bold text-white hover:bg-primary-500/90"
            variant="outline"
          >
            Pay for your pending order
          </Button>
        )}

        <div className="mb-3.5 w-full md:flex md:gap-x-3.5">
          <section className="mb-5 rounded border border-gray-300 md:w-1/2">
            <div className="border-b border-gray-300 px-6 pt-5">
              <h2 className="inline-block pb-5 font-bold text-primary-500">
                PAYMENT INFORMATION
              </h2>
            </div>

            <div className="px-6 py-5">
              <article className="mb-5">
                <h3 className="mb-1.5 font-bold text-primary-500">
                  Payment Details
                </h3>
                <ul className="grid gap-y-0.5">
                  <li>Items total: ₦{orders[item].total_amount}</li>
                  <li>Delivery Fees: ₦{orders[item].delivery_fee}</li>

                  <li>
                    Total: ₦
                    {(orders[item].total_amount ?? 0) +
                      (orders[item].delivery_fee ?? 0)}
                  </li>
                </ul>
              </article>
            </div>
          </section>
          <section className="rounded border border-gray-300 md:w-1/2">
            <div className="border-b border-gray-300 px-6 pt-5">
              <h2 className="inline-block pb-5 font-bold text-primary-500">
                DELIVERY INFORMATION
              </h2>
            </div>
            <div className="px-6 py-5">
              <article className="mb-5 capitalize">
                <h3 className="mb-1.5 font-bold text-primary-500">
                  Delivery Address
                </h3>
                {/* <p className="mb-4">Pay on Delivery</p> */}
                <p>{`${orders[item].delivery_address.firstname} 
                ${orders[item].delivery_address.lastname} | 
                `}</p>

                <p>
                  {`${orders[item].delivery_address.address ?? "Court Estate, Durumi"} | 
                  ${orders[item].delivery_address.city} -  
                ${orders[item].delivery_address.state} -
                ${orders[item].delivery_address.country} |
                ${orders[item].delivery_address.postalcode}`}
                  {/* Court Estate, Durumi | Federal Capital Territory - ABUJA-
                  DURUMI | 900103 */}
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
    ) : (
      <div className="w-full items-center justify-center py-10">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  function DeliveredDetails() {
    const { setState } = useOrders();
    // console.log(orders[item]);
    return orders ? (
      <section className="mb-14">
        <div className="">
          <button
            className="pb-5 text-xs font-bold text-primary-500"
            onClick={() => setState("list")}
          >
            &larr; My Orders
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-[#D2D2D2] pb-3">
          <h2 className="shrink-0 text-lg font-semibold text-primary-500">
            Order Items
          </h2>
        </div>

        <table className="my-6 w-full">
          <thead>
            <tr className="bg-gray-100 text-xs text-primary-500">
              <th className="w-1/2 px-6 py-3 text-left">Items in your order</th>
              <th className="w-[10%] text-left">Price</th>
              <th className="w-[10%] text-left">Qty</th>
              <th className="w-[10%] text-left">Total</th>
              <th className="w-3/5"></th>
            </tr>
          </thead>
          <tbody>
            {orders[item].items.map((it, index) => (
              <tr key={index} className="border-b border-b-gray-100 text-xs">
                <td className="flex items-center gap-x-7 px-6 py-3.5">
                  <div className="relative h-[75px] w-[79px] overflow-hidden text-xs">
                    <Image
                      src={
                        it.productid.coverimage ?? "/images/dashboard/drug.png"
                      }
                      alt=""
                      className=""
                      fill
                      sizes="79px"
                    />
                  </div>
                  {it.productid.name ?? "Some drug"}
                </td>
                <td className="text-primary-500">₦{it.price}</td>
                <td className="py-3.5">
                  <div className="flex w-fit items-center gap-x-3 rounded border px-3.5 py-2">
                    <p className="font-bold">{it.quantity}</p>
                  </div>
                </td>
                <td>
                  <span className="text-primary-500">
                    ₦{it.quantity * it.price}
                  </span>
                </td>
                <td>
                  <div className="flex flex-col justify-end gap-x-4 gap-y-2 font-bold text-primary-500 md:flex-row">
                    <Link
                      href={
                        routes.PHARMARCYPRODUCTREVIEW + `/${it.productid._id}`
                      }
                    >
                      Rate this item
                    </Link>
                    <Link
                      href={
                        routes.PHARMARCYRETURNPOLICY + `/${orders[item]._id}`
                      }
                    >
                      Return this item
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-6 rounded border bg-[#F1F1F5] px-8 py-7 text-xs text-primary-500">
          <div className="flex justify-between font-bold">
            <h4>Total</h4>
            <p>₦{orders[item].total_amount}</p>
          </div>
        </div>
      </section>
    ) : (
      <div className="w-full items-center justify-center py-10">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  function ReturnedDetails() {
    interface ReturnedOrder {
      approved: boolean;
      receipt: string;
      productid: {
        coverimage: string;
        name: string;
      };
      quantity: number;
      subprice: number;
    }

    const { setState } = useOrders();
    const [returnOrder, setReturnOrder] = useState<ReturnedOrder>();
    useEffect(() => {
      const returnedOrders = async () => {
        await onlinePharmacyApi
          .getReturnOrder(session!, {
            // @ts-expect-error: there'll be id
            userid: session?.user.id,
            // @ts-expect-error: there'll be id
            orderid: orders[item]._id,
          })
          .then((s) => {
            console.log(s.data);
            setReturnOrder(s.data);
          })
          .catch((err) => console.log(err));
      };
      returnedOrders();
    }, []);

    return returnOrder ? (
      <section>
        <div>
          <button
            className="pb-5 text-xs font-bold text-primary-500"
            onClick={() => setState("list")}
          >
            &larr; My Orders
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-[#D2D2D2] pb-3">
          <h2 className="shrink-0 text-lg font-semibold text-primary-500">
            Returned Items
          </h2>
        </div>

        <div className="grid gap-y-6">
          {/* {orders[item].items.map((item, index) => ( */}
          <ReturnedItemCard
            // key={index}
            name={returnOrder.productid.name}
            imageUrl={returnOrder.productid.coverimage}
            total={returnOrder.subprice}
            returnType={returnOrder.approved}
            qty={returnOrder.quantity}
            receipt={returnOrder.receipt}
          />

          {/* ))} */}
        </div>
      </section>
    ) : (
      <div className="w-full items-center justify-center py-10">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  function ReturnedItemCard({
    imageUrl,
    total,
    name,
    returnType,
    qty,
    receipt,
  }: {
    imageUrl: string;
    total: number;
    name: string;
    returnType: boolean;
    qty: number;
    receipt?: string;
  }) {
    const textColor = returnType ? "#22C55E" : "#D81302";
    return (
      <article>
        <p
          className="mb-1.5 text-right text-xs font-semibold capitalize"
          style={{ color: textColor }}
        >
          Return{" "}
          {returnType == null
            ? "Not yet processed"
            : returnType == true
              ? "Approved"
              : "Declined"}
        </p>
        <div className="relative flex gap-x-3 rounded border border-[#CACACA] px-4 py-5 text-xs">
          <div className="relative h-[97.1px] w-[101.73px]">
            <Image src={imageUrl ?? "/images/client.jpg"} alt="" fill />
          </div>
          <div>
            <p className="mb-1 text-[#2C2D33]">
              {name ?? "L&apos;Oréal, Revitalift Triple Power, Anti-Aging"}{" "}
            </p>
            <p className="text-[#636985]">Total: ₦{total}</p>
            <p className="text-[#636985]">Qty: {qty}</p>
          </div>

          {returnType && (
            <a
              href={receipt}
              download="receipt.pdf"
              className="absolute bottom-6 right-5 flex flex-col items-center rounded-lg border border-dotted border-primary-500 bg-[#F2EAEA] px-16 py-2 text-sm"
            >
              <DownloadSvg />
              Download Receipt
            </a>
          )}
        </div>
      </article>
    );
  }
}
