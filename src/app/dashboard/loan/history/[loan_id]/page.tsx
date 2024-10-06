import React from "react";
import LoanHistorySingleClient from "../../_components/loan-history-single-client";

function LoanHistorySingle() {
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
