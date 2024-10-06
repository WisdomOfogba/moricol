"use client";
import { useState } from "react";

import Button from "@/components/button";
import { BiChevronLeft, BiChevronRight, BiInfoCircle } from "react-icons/bi";
import Link from "next/link";
import { routes } from "@/constants/routes";

export default function LoanOfferClient() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanDuration, setLoanDuration] = useState(50);

  const loanOptions = [25000, 40000, 50000];
  const durationOptions = [
    { days: 25, rate: 0.7 },
    { days: 40, rate: 0.8 },
    { days: 50, rate: 0.9 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl bg-white shadow-lg">
        <div className="p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between">
            <BiChevronLeft className="h-6 w-6 text-gray-400" />
            <span className="text-3xl font-bold text-red-500">
              ₦{loanAmount.toLocaleString()}
            </span>
            <BiChevronRight className="h-6 w-6 text-gray-400" />
          </div>

          <div className="mb-6 flex justify-between">
            {loanOptions.map((amount) => (
              <Button
                key={amount}
                variant={amount === loanAmount ? "primary" : "outline"}
                onClick={() => setLoanAmount(amount)}
                className={`w-24 ${amount === loanAmount ? "bg-orange-500 text-white" : "border-orange-500 text-orange-500"}`}
              >
                ₦{amount.toLocaleString()}
              </Button>
            ))}
          </div>

          <p className="mb-6 text-sm text-gray-600">
            Your loan amount range is ₦25,000 to ₦50,000
          </p>

          <div className="mb-6 grid grid-cols-3 gap-4">
            {durationOptions.map((option) => (
              <Button
                key={option.days}
                variant={option.days === loanDuration ? "primary" : "outline"}
                onClick={() => setLoanDuration(option.days)}
                className={`flex h-24 flex-col items-center justify-center ${
                  option.days === loanDuration
                    ? "border-red-500 bg-red-200"
                    : "bg-red-100"
                }`}
              >
                <span className="text-lg font-semibold">
                  {option.days} Days
                </span>
                <span className="text-sm">{option.rate.toFixed(2)}% Daily</span>
              </Button>
            ))}
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex justify-between">
              <span>How to pay back</span>
              <span>2 Installment for 50 days</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Daily</span>
              <span>0.8%</span>
            </div>
            <div className="flex justify-between">
              <span>Charges</span>
              <span>₦2,000</span>
            </div>
          </div>

          <div className="mb-6 flex items-start rounded-lg bg-orange-100 p-4">
            <BiInfoCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-orange-500" />
            <p className="text-sm">
              You need to pay back{" "}
              <span className="font-semibold">₦27,750</span> each installment in
              the next <span className="font-semibold">50Days</span>
            </p>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex justify-between">
              <span>Installment</span>
              <span>Total Amount</span>
              <span>Interest</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>2</span>
              <span>₦60,000</span>
              <span>₦10,500</span>
            </div>
          </div>

          <div className="mb-6 space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">First Installment</h3>
              <div className="grid grid-cols-4 gap-2 text-sm">
                <span>Due Date</span>
                <span>Repay Amount</span>
                <span>Principal</span>
                <span>Interest</span>
                <span>11 - 15 Sept</span>
                <span>₦27,750</span>
                <span>₦12,500</span>
                <span>₦5,250</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Second Installment</h3>
              <div className="grid grid-cols-4 gap-2 text-sm">
                <span>Due Date</span>
                <span>Repay Amount</span>
                <span>Principal</span>
                <span>Interest</span>
                <span>16 - 30 Sept</span>
                <span>₦27,750</span>
                <span>₦12,500</span>
                <span>₦5,250</span>
              </div>
            </div>
          </div>

          <Link href={routes.LOANVERIFICATION}>
            <Button className="w-full rounded-lg bg-orange-500 py-3 text-white hover:bg-orange-600">
              APPLY FOR THIS LOAN
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
