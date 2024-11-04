import React from "react";
import LoanHistorySingleClient from "../../_components/loan-history-single-client";
import { getUserSession } from "@/lib/auth";
import loanApi from "@/api/loan";


async function getLoanData(loanid: string) {
  try {
    const session = await getUserSession();
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: loanData } = await loanApi.retrieveSingleLoan({ userid: session.user.id, loanid, session });
    return loanData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get loan data');
  }
}

async function LoanHistorySingle({ params }: { params: { loan_id: string } }) {
  const loanData = await getLoanData(params.loan_id);
  console.log(loanData);
  const paymentSchedule = [
    { id: 143, amount: 7000.56, date: "Jan 14,2023", status: "Paid" },
    { id: 232, amount: 7000.56, date: "Jan 24,2023", status: "Pending" },
    { id: 309, amount: 7000.56, date: "Jan 14,2023", status: "Pending" },
    { id: 40, amount: 7000.56, date: "Jan 14,2023", status: "Pending" },
  ];

  const paymentHistory = [
    { id: 168, amount: 7000.56, date: "Jan 14,2023", status: "Received Loan" },
    { id: 221, amount: 7000.56, date: "Jan 24,2023", status: "Paid" },
    { id: 36, amount: 7000.56, date: "Jan 14,2023", status: "Paid" },
    { id: 4390, amount: 7000.56, date: "Jan 14,2023", status: "Paid" },
  ];
  return (
    <LoanHistorySingleClient
      paymentHistory={paymentHistory}
      paymentSchedule={paymentSchedule}
    />
  );
}

export default LoanHistorySingle;
