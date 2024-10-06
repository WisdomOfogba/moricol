import NavigationBackBtn from "@/components/nav-back-btn";
import React from "react";
import LoanHistoryClient from "../_components/loan-history-client";

function LoanHistory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const loanData = [
    {
      id: "A1B2",
      amount: 30000,
      duration: 5,
      initiatedOn: "Feb 1, 2023",
      status: "Active",
    },
    {
      id: "C3D4",
      amount: 30000,
      duration: 5,
      initiatedOn: "Feb 1, 2023",
      status: "Pending",
    },
    {
      id: "E5F6",
      amount: 30000,
      duration: 5,
      initiatedOn: "Feb 1, 2023",
      status: "Pending",
    },
    {
      id: "G7H8",
      amount: 30000,
      duration: 5,
      initiatedOn: "Feb 1, 2023",
      status: "Approved",
    },
    {
      id: "I9J0",
      amount: 30000,
      duration: 5,
      initiatedOn: "Feb 1, 2023",
      status: "Approved",
    },
    {
      id: "K1L2",
      amount: 30000,
      duration: 5,
      initiatedOn: "Feb 1, 2023",
      status: "Approved",
    },
  ];

  return (
    <div>
      <div className="border-b border-gray-300 px-4 py-2">
        <NavigationBackBtn />
      </div>
      <LoanHistoryClient
        loanData={loanData}
        view={(searchParams.v as string) ?? "pending"}
      />
    </div>
  );
}

export default LoanHistory;
