"use client";
import Button from "@/components/button";
import ModalLayout from "@/components/layouts/modal-layout";
import Image from "next/image";
import React, { useState } from "react";

function ApplySuccessModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsModalOpen(true)}>
        CONTINUE
      </Button>

      {isModalOpen && (
        <ModalLayout>
          <article className="flex w-full max-w-[806px] flex-col items-center justify-center rounded-lg bg-white px-7 py-10">
            <div className="relative mb-7 h-40 w-40 overflow-hidden rounded-full">
              <Image
                src="/images/SUCCESS.png"
                alt=""
                fill
                sizes="128px"
                className="h-full object-contain"
              />
            </div>
            <h3 className="mb-8 max-w-[635px] text-center text-2xl font-medium">
              Application Successful!
            </h3>

            <div className="mb-7 space-y-3.5 text-center font-medium text-[#667085]">
              <p>Your application has been submitted successfully.</p>
            </div>

            <Button onClick={() => setIsModalOpen(false)}>OKAY</Button>
          </article>
        </ModalLayout>
      )}
    </>
  );
}

export default ApplySuccessModal;
