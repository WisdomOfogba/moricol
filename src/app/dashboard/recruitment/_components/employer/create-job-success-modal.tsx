"use client";
import Button from "@/components/button";
import ModalLayout from "@/components/layouts/modal-layout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function CreateJobSuccessModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-yellow-500 px-6 py-2 text-white transition duration-300 hover:bg-yellow-600"
      >
        CREATE JOB
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
              JOB CREATED
            </h3>

            <div className="mb-7 space-y-3.5 text-center font-medium text-[#667085]">
              You have successfully added a job post for job seeker to apply
              for.Our Teams will review your application and reach out to you
              Via Email
            </div>

            <Button onClick={() => setIsModalOpen(false)}>OKAY</Button>
            <Link href="#" className="primary-color pt-5">
              Set a Notification for when they apply
            </Link>
          </article>
        </ModalLayout>
      )}
    </>
  );
}

export default CreateJobSuccessModal;
