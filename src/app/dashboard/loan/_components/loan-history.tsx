"use client";

import { SettingFilter } from "@/components/svgs/loan-svg";
import { routes } from "@/constants/routes";
import { LoanHistoryItem } from "@/definition";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function LoanHistory({ loans }: { loans: LoanHistoryItem[] }) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const filteredLoans = loans.filter(
    (loan) => filterStatus === "All" || loan.status === filterStatus,
  );

  return (
    <div className="space-y-4">
      <div className="relative mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Loan History</h2>
        <button
          className="cursor-pointer text-gray-500"
          title="open filter menu"
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
        >
          <SettingFilter />
        </button>
        {isFilterMenuOpen && (
          <div className="absolute right-0 top-full mt-2 rounded-md bg-white py-2 shadow-lg">
            <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => setFilterStatus("All")}
            >
              All
            </button>
            <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => setFilterStatus("Approved")}
            >
              Approved
            </button>
            <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => setFilterStatus("Declined")}
            >
              Declined
            </button>
          </div>
        )}
      </div>
      {filteredLoans.map((item, index) => (
        <Link
          href={routes.LOANDASHBOARDHOME + "/id"}
          key={index}
          className="group flex items-center rounded-lg bg-gray-50 bg-white p-4 shadow"
        >
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
            {item.status === "Approved" ? (
              <FaCheckCircle className="text-2xl text-green-500" />
            ) : (
              <FaExclamationCircle className="text-2xl text-red-500" />
            )}
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          <BiChevronRight className="h-10 w-10 text-gray-400 group-hover:text-primary-500" />
        </Link>
      ))}
    </div>
  );
}

export default LoanHistory;
