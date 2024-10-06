import Button from "@/components/button";
import NavigationBackBtn from "@/components/nav-back-btn";
import { routes } from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { BiDownload } from "react-icons/bi";

function LoanApproved() {
  return (
    <>
      <div className="border-b border-gray-300 px-4 py-2">
        <NavigationBackBtn />
      </div>
      <div className="flex h-[80vh] flex-col items-center justify-center rounded-lg p-8">
        <div className="mb-8 flex w-full max-w-[370px] flex-col items-center">
          <h1>Receipt for Payment </h1>
          <div className="mt-5 w-full border border-gray-200 p-8 text-center">
            <Link href="/path/to/download/loan_receipt.pdf" download>
              <Button
                variant="text"
                className="mt-2 flex items-center justify-center gap-4 text-secondary-500"
              >
                <BiDownload /> Download Receipt
              </Button>
            </Link>
          </div>
        </div>
        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Yay! your loan has been approved
        </h3>
        <p className="mb-6 max-w-md text-center text-gray-600">
          Congratulations, your loan has been approved. And funds has been
          disbursed to the designated account you provided.
        </p>

        <Link
          href={routes.LOANDASHBOARDHOME as string}
          className="w-full max-w-[350px]"
        >
          <Button className="mt-10 w-full lg:max-w-[360px]">DONE</Button>
        </Link>
      </div>
    </>
  );
}

export default LoanApproved;
