import Button from "@/components/button";
import NavigationBackBtn from "@/components/nav-back-btn";
import { routes } from "@/constants/routes";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { LoanHistoryType } from "../history/page";
import loanApi from "@/api/loan";
import NoItemsFound from "@/components/no-item-found";

export const metadata = {
  title: "Accounts | Moricol Loans",
  description: "view your loan accounts",
}


async function getAccountsData() {
  try {
    const session = await getUserSession();
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: accountsData } = await loanApi.retrieveAllAccounts({ userid: session.user.id, session });
    return accountsData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get loan data');
  }
}


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

async function LoanAccounts() {
  const accountsData = await getAccountsData();
  console.log(accountsData);
  return (
    <div className="pb-10">
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
        {/* not found */}
        {accountsData.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8 h-32 w-32">
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <circle cx="100" cy="100" r="80" fill="#F0F0F0" />
                <path
                  d="M100 50C72.3858 50 50 72.3858 50 100C50 127.614 72.3858 150 100 150C127.614 150 150 127.614 150 100C150 72.3858 127.614 50 100 50ZM87.5 112.5L75 125L100 150L125 125L112.5 112.5L100 125L87.5 112.5ZM112.5 87.5L125 75L100 50L75 75L87.5 87.5L100 75L112.5 87.5Z"
                  fill="#E0E0E0"
                />
                <circle cx="100" cy="100" r="30" fill="#D1D5DB" />
                <path
                  d="M105 95H95V85H105V95ZM105 115H95V100H105V115Z"
                  fill="#9CA3AF"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-gray-800">
              No Accounts Found
            </h3>
            <p className="mb-6 max-w-sm text-center text-gray-600">
              You've not added any accounts yet
            </p>
          </div>
        )}
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
