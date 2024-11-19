"use client";
import { CircleCancel, StarSVG } from "@/components/svgs";
import React from "react";
import Image from "next/image";
import { useCart } from "@/lib/TrainingCartContext";

const CartDetails = () => {
  const { cart , removeFromCart } = useCart();

  const handleCancel = ({cart}: {cart: string}) => {
    removeFromCart(cart);
  }

  return (
    <div>
      {cart.length === 0 ? (
        <div className="flex h-40 items-center justify-center">
          Your Cart is Empty
        </div>
      ) : (
        <div>
          {cart.map((cart, i) => (
            <article
              key={i}
              className="grid grid-cols-[3fr_1fr_1fr] items-center gap-x-6 border-b border-b-[#E9EAF0] px-6 py-6 last:border-none"
            >
              <div className="flex items-center gap-x-5">
                <button className="cursor-pointer" onClick={() => handleCancel({cart: cart._id})}>
                  <CircleCancel />
                </button>
                <article className="flex gap-x-5 text-[#1D2026]">
                  <div className="relative h-[120px] w-40 overflow-hidden">
                    <Image
                      src={cart.thumbnail}
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-x-2 text-sm font-medium">
                        <StarSVG fill="#FD8E1F" />
                        <p>
                          {cart.rating}{" "}
                          <span className="text-[#8C94A3]">
                            (451434 Review)
                          </span>
                        </p>
                      </div>
                      {/* Course title */}
                      <h3 className="mb-6 w-[312px] font-medium">
                        {cart.title}
                      </h3>
                    </div>

                    {/* if there are more than two authors use the dot separator else comot am */}
                    <div className="text-sm text-[#4E5566]">
                      <span className="mr-1.5 text-[#A1A5B3]">Course by:</span>
                      {cart.instructors.map((instructor, i) => (
                        <span key={i}>
                          <div className="mx-1.5 inline-block h-1 w-1 rounded-full bg-[#4E5566]" />{" "}
                          {instructor.instructor}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
              <div className="text-lg font-medium text-primary-500">
                ₦{cart.price}
              </div>

              <button className="text-left font-semibold text-primary-500">
                Move to Wishlist
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartDetails;
