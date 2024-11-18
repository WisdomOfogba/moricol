"use client";

import { CourseApi } from "@/api/training";
import { storeToLocalStorage } from "@/util/store-to-localstorage";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";

const MakeTrainingPaymentButton = ({
  price,
  courseid,
  type,
  button,
}: {
  price: number;
  courseid: string;
  type: string;
  button: string;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handlePay = async () => {
    storeToLocalStorage({
      service: "training",
      link: pathname,
      toSend: {
        userid: session?.user.id,
        amount: price,
        coursetype: type,
        courseid,
      },
    });
    try {
      setIsLoading(true);
      const response = await CourseApi.makePayment(
        session?.user.id as string,
        session?.user.email as string,
        price,
        session as Session,
      );
      window.open(response.data, "_self");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error making payment", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {button === "now" ? (
        <button
          className="inline-block w-full bg-primary-100 p-3 text-center text-lg font-semibold text-primary-500"
          onClick={handlePay}
        >
          {isLoading ? "Loading..." : "Buy now"}
        </button>
      ) : (
        <button
          className="inline-block w-full border border-[#E9EAF0] py-3 text-center text-sm font-semibold"
          onClick={handlePay}
        >
          {isLoading ? "Loading..." : "Buy Course"}
        </button>
      )}
    </>
  );
};

export default MakeTrainingPaymentButton;
