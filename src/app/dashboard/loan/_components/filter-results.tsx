"use client";

import NoItemsFound from "@/components/no-item-found";
import { routes } from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { BiChevronRight } from "react-icons/bi";

function LoanFilterResults({
  loans,
  searchTerm,
}: {
  loans: { title: string; image: string }[];
  searchTerm: string;
}) {
  const filteredLoans =
    searchTerm === ""
      ? loans
      : loans.filter((loan) =>
          loan.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );

  return (
    <div className="space-y-4">
      {filteredLoans.map((item, index) => (
        <Link
          href={`${routes.LOANPOLICY}?cb=/offer/${item.title}`}
          key={index}
          className="group flex items-center rounded-lg bg-gray-50 bg-white p-4 shadow"
        >
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold">{item.title}</h3>
          </div>
          <BiChevronRight className="h-10 w-10 text-gray-400 group-hover:text-primary-500" />
        </Link>
      ))}

      {filteredLoans.length === 0 && <NoItemsFound />}
    </div>
  );
}

export default LoanFilterResults;
