"use client";

import Button from "@/components/button";
import SummaryProductCard from "@/components/dashboard/summary-product-card";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { formatNaira } from "@/util/currency-format";
import { calculateTotal } from "@/util/get-total";
import { useEffect, useState } from "react";
import { AddressParams } from "../account/addresses/page";
import onlinePharmacyApi from "@/api/online-pharmacy";
import { useSession } from "next-auth/react";
import Address from "../components/Address";
import { useRouter } from "next/navigation";
import { storeToLocalStorage } from "@/util/store-to-localstorage";
import { Order, Product } from "@/lib/features/cartSlice";
import { PrescriptionParams } from "../prescription/[id]/page";
import { setCart } from "@/lib/features/cartSlice";
export default function Checkout() {
  const { data: session } = useSession();
  const router = useRouter();
  const [address, setAddress] = useState<AddressParams>();
  const [loaded, setLoaded] = useState<boolean>(false);
  // const [link, setLink] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [coupon, setCouponId] = useState<string>("");
  const cart = useAppSelector((state) => state.drugcart.cart);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const checkPrescription = (cart: Product[]) => {
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].prescription) {
        return true;
      }
    }
    return false;
  };

  const handleCoupon = async () => {
    await onlinePharmacyApi
      .useCoupon(session!, {
        //@ts-expect-error: 'there'll be id'
        userid: session?.user.id,
        coupon,
        amount: calculateTotal(cart),
      })
      .then((s) => {
        if (s.data) {
          // console.log(s);
          setTotalAmount(s.data);
          enqueueSnackbar({
            variant: "success",
            message: "Coupon successfully applied!",
          });
        } else {
          enqueueSnackbar({ variant: "error", message: s.message });
        }
      })
      .catch((err: Error) =>
        enqueueSnackbar({ variant: "error", message: err.message }),
      );
  };
  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const order: Order = {
      // @ts-expect-error: 'id' is not a property of 'session'
      userid: session?.user.id,
      total_amount: totalAmount,
      delivery_fee: deliveryFee,
      prescription_needed: checkPrescription(cart),
      couponid: null,
      coupon_used: coupon != "",
      items: cart,
      addressid: address?._id ?? "",
      report: [
        {
          name: "",
          upload: "",
        },
      ],
      nin: "",
    };

    if (checkPrescription(cart)) {
      const presDetails = localStorage.getItem("nin");
      if (presDetails) {
        const userPresDetails: PrescriptionParams = JSON.parse(presDetails);

        await onlinePharmacyApi
          .createOrder(session!, {
            ...order,
            report: [
              {
                name: userPresDetails.name,
                upload: userPresDetails.fileName,
              },
            ],
            nin: userPresDetails.nin,
          })
          .then(() => {
            localStorage.removeItem("cart");
            enqueueSnackbar(
              "Pending Order successfully created. Payment can be made after Doctor's approval",
              { variant: "success" },
            );
            router.push("/dashboard/pharmarcy/account");
            // localStorage.removeItem("nin");
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar(err, { variant: "error" });
          });
      } else {
        enqueueSnackbar("NIN missing! ", { variant: "error" });
      }
    } else {
      await onlinePharmacyApi
        .makePayment(
          session!,
          // @ts-expect-error: 'id' is not a property of 'session'
          session?.user.id,
          session?.user.email,

          totalAmount + deliveryFee,
        )
        .then((val) => {
          storeToLocalStorage({
            service: "onlinePharmacy",
            toSend: order,
            link: "/dashboard/pharmarcy",
          });
          localStorage.removeItem("cart");
          router.push(val.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const existingCart = localStorage.getItem("cart");
      if (existingCart) {
        const newCart: Product[] = JSON.parse(existingCart);
        dispatch(setCart(newCart));
      }
      await onlinePharmacyApi
        .getAddress(
          session!,
          // @ts-expect-error: 'id' is not a property of 'session'
          session?.user.id,
        )
        .then(async (s) => {
          // console.log(s);
          setAddress(s.data);
          setLoaded(true);
          setTotalAmount(calculateTotal(cart));
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchDeliveryFee = async () => {
      if (loaded)
        await onlinePharmacyApi
          .deliveryFee(session!, {
            //@ts-expect-error: therell
            addressid: address._id,
            //@ts-expect-error: therell
            userid: session?.user.id,
            productorders: cart.map((c) => c._id),
          })
          .then((s) => {
            setDeliveryFee(s.data);
          })
          .catch((err) => console.log(err));
    };
    fetchDeliveryFee();
  }, [loaded]);

  return (
    <main className="px-8 py-6 pb-20">
      <section className="mb-9">
        <div className="flex items-center justify-between border-b border-[#D2D2D2] pb-3">
          <h1 className="shrink-0 text-lg font-semibold text-primary-500">
            Checkout
          </h1>
        </div>
      </section>

      <div className="items-start gap-x-8 lg:flex">
        <section className="grow">
          <section className="mb-9">
            <div className="mb-3 flex items-center justify-between border-b border-[#D2D2D2]">
              <h2 className="shrink-0 pt-5 font-semibold text-primary-500">
                Delivery Address
              </h2>
            </div>

            {address && (
              <Address
                key={0}
                firstname={address.firstname}
                lastname={address.lastname}
                defaultaddress={address.defaultaddress}
                address={address.address}
                phone={address.phone}
                postalcode={address.postalcode}
                state={address.state}
                city={address.city}
                country={address.country}
                _id={address._id}
                show={false}
              />
            )}
          </section>
        </section>
        <section className="grid w-full shrink-0 gap-y-2 md:w-[372px]">
          <h2 className="shrink-0 font-semibold text-primary-500">
            Order Summary
          </h2>

          <article className="rounded border border-[#9F9FA0] bg-gray-100">
            <div className="grid gap-y-5 px-5 py-6">
              {cart.map((product, i) => (
                <SummaryProductCard
                  key={i}
                  name={product.name}
                  imageUrl={product.coverimage}
                  qty={product.quantity}
                  price={product.subprice}
                />
              ))}
            </div>

            <div className="gap-y-2.5 border-y border-y-gray-300 px-6 py-6 text-primary-500">
              <p className="flex justify-between">
                Subtotal <span>{formatNaira(totalAmount)}</span>
              </p>
              <p className="flex justify-between">
                Delivery Fees <span>₦{deliveryFee}</span>
              </p>
            </div>
            <div className="px-5 py-6">
              <p className="flex justify-between font-bold text-primary-500">
                Total <span>{formatNaira(totalAmount + deliveryFee)}</span>
              </p>
            </div>
          </article>
          <article className="rounded border border-[#9F9FA0] bg-gray-100">
            <p className="px-5 py-3 text-xs">
              Have a coupon?{" "}
              <span className="text-primary-500">
                Click here to enter your code
              </span>
            </p>
          </article>
          <article className="rounded border border-[#9F9FA0] p-5 text-xs">
            <p className="mb-2.5">
              If you have a coupon code, please apply it below.
            </p>
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCouponId(e.target.value)}
              className="mb-3 h-10 w-full rounded border bg-gray-100 px-5 py-3 outline-none"
            />
            <Button
              variant="outline"
              className="w-fit py-2.5 text-xs font-bold"
              onClick={handleCoupon}
            >
              Apply Coupon
            </Button>
          </article>
          <Button
            onClick={handlePayment}
            className="inline-block rounded-lg bg-primary-500 py-3 text-center font-semibold text-white"
          >
            Place Order
          </Button>
        </section>
      </div>
    </main>
  );
}
