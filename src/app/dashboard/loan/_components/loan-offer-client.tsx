"use client";
import { useState } from "react";

import Button from "@/components/button";
import { BiChevronLeft, BiChevronRight, BiInfoCircle } from "react-icons/bi";
import Link from "next/link";
import { routes } from "@/constants/routes";

export default function LoanOfferClient({
  loan_category,
}: {
  loan_category: string;
}) {
  const [loanAmountIndex, setLoanAmountIndex] = useState(1); // Start with the second option (₦50,000)
  const loanOptions = [25000, 40000, 50000];
  const loanAmount = loanOptions[loanAmountIndex]; // Get the current loan amount based on the index
  const [loanDuration, setLoanDuration] = useState(50);

  const durationOptions = [
    { days: 25, rate: 0.7 },
    { days: 40, rate: 0.8 },
    { days: 50, rate: 0.9 },
  ];

  const handleLeftChevronClick = () => {
    setLoanAmountIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex,
    );
  };

  const handleRightChevronClick = () => {
    setLoanAmountIndex((prevIndex) =>
      prevIndex < loanOptions.length - 1 ? prevIndex + 1 : prevIndex,
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white">
        <div className="grid grid-cols-1 gap-x-8 p-4 md:p-6 xl:grid-cols-5">
          <section className="xl:col-span-3">
            <div className="mb-6 flex items-center justify-between bg-gray-100 p-3">
              <BiChevronLeft
                className="h-10 w-10 border-r border-gray-300 pr-2 text-gray-400 hover:text-primary-500"
                onClick={handleLeftChevronClick}
              />
              <span className="text-3xl font-bold text-red-500">
                ₦{loanAmount.toLocaleString()}
              </span>
              <BiChevronRight
                className="h-10 w-10 border-l border-gray-300 pl-2 text-gray-400 hover:text-primary-500"
                onClick={handleRightChevronClick}
              />
            </div>

            <div className="mb-6 flex justify-between">
              {loanOptions.map((amount, index) => (
                <Button
                  key={amount}
                  variant={index === loanAmountIndex ? "primary" : "outline"}
                  onClick={() => setLoanAmountIndex(index)}
                  className={`w-24 ${index === loanAmountIndex ? "bg-primary-500 text-white" : "border-primary-500 text-primary-500"}`}
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
                  <span className="text-sm">
                    {option.rate.toFixed(2)}% Daily
                  </span>
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

            <div className="mb-6 flex items-start rounded-lg bg-primary-100 p-4">
              <BiInfoCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary-500" />
              <p className="text-sm">
                You need to pay back{" "}
                <span className="font-semibold">₦27,750</span> each installment
                in the next <span className="font-semibold">50Days</span>
              </p>
            </div>

            <div className="mb-6">
              <table className="w-full">
                <thead>
                  <tr className="">
                    <th className="py-2 text-left">Installments</th>
                    <th className="py-2 text-left">Total Amount</th>
                    <th className="py-2 text-left">Interest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td>2</td>
                    <td>₦60,000</td>
                    <td>₦10,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="xl:col-span-2">
            <div className="mb-6 space-y-4">
              <div className="mb-4">
                <h3 className="mb-2 font-semibold">First Installment</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="py-2 text-left">Due Date</th>
                      <th className="py-2 text-left">Repay Amount</th>
                      <th className="py-2 text-left">Principal</th>
                      <th className="py-2 text-left">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11 - 15 Sept</td>
                      <td>₦27,750</td>
                      <td>₦12,500</td>
                      <td>₦5,250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Second Installment</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="py-2 text-left">Due Date</th>
                      <th className="py-2 text-left">Repay Amount</th>
                      <th className="py-2 text-left">Principal</th>
                      <th className="py-2 text-left">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>16 - 30 Sept</td>
                      <td>₦27,750</td>
                      <td>₦12,500</td>
                      <td>₦5,250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Link href={`${routes.LOANAPPLY}/${loan_category}`}>
              <Button className="w-full rounded-lg bg-primary-500 py-3 text-white hover:bg-primary-600">
                APPLY FOR THIS LOAN
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
