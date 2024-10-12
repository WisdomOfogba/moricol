import Button from "@/components/button";
import NavigationBackBtn from "@/components/nav-back-btn";
import { routes } from "@/constants/routes";
import Link from "next/link";
import React from "react";

const bankAccounts = [
  {
    id: 1,
    accountNumber: "1234567890",
    bankName: "Bank A",
    accountName: "John Dont",
  },
  {
    id: 2,
    accountNumber: "0987654321",
    bankName: "Bank B",
    accountName: "John Doe",
  },
  {
    id: 3,
    accountNumber: "1122334455",
    bankName: "Bank C",
    accountName: "John DOe",
  },
  {
    id: 4,
    accountNumber: "5566778899",
    bankName: "Bank D",
    accountName: "John Doe",
  },
];

function LoanAccounts() {
  return (
    <div>
      <div className="border-b border-gray-300 px-4 py-2">
        <NavigationBackBtn />
      </div>
      <div className="px-4">
        <div className="md: grid grid-cols-1 grid-cols-2 gap-4 py-4 lg:grid-cols-3">
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="transform rounded-lg border bg-white p-6 shadow-sm transition-transform"
            >
              <p className="text-gray-600">{account.accountNumber}</p>
              <h2 className="text-lg font-bold">{account.bankName}</h2>
              <br />
              <p className="text-gray-600"> {account.accountName}</p>
            </div>
          ))}
        </div>
        <Link href={routes.LOANACCOUNTSNEW as string}>
          <Button className="mt-10 lg:max-w-[300px]">
            ADD ANOTHER ACCOUNT
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LoanAccounts;
