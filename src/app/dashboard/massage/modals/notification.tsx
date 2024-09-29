"use client";

import Button from "@/components/button";
import ModalLayout from "@/components/layouts/modal-layout";
import { CancelSvg } from "@/components/svgs";
import Image from "next/image";
import { useState } from "react";

export default function PaymentSuccessful() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsModalOpen(true)}>
        Pay ₦5,700 <span>{">"}</span>
      </Button>

      {isModalOpen && (
        <ModalLayout>
          <article className="relative flex w-[806px] flex-col items-center justify-center rounded-lg bg-white py-12">
            <button
              className="absolute right-3.5 top-5 mb-1 ml-auto flex h-5 w-5 items-center justify-center rounded-full border-2 border-secondary-500"
              onClick={() => setIsModalOpen(false)}
            >
              <CancelSvg stroke="#D81302" className="h-3 w-3" />
            </button>
            <Image
              src="/images/dashboard/payment-success.png"
              alt=""
              width={261}
              height={174}
            />
            <h3 className="mb-3.5 font-medium text-[#374151]">
              Send me a reminder Via
            </h3>

            <form>
              <section className="flex w-full max-w-[621px] justify-between">
                <div>
                  <input type="checkbox" />
                  <label htmlFor="">Email Notification</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label htmlFor="">SMS</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label htmlFor="">Push Notification</label>
                </div>
              </section>
              <Button>SET REMINDER</Button>
            </form>
          </article>
        </ModalLayout>
      )}
    </>
  );
}
