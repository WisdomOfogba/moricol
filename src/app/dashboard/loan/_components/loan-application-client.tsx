"use client";

import LoanApplyForm from "./loan-apply-form";
import LoanConfirmDetails from "./loan-confirm-details";
import LoanPaymentDetails from "./loan-payment-details";
import { useState } from "react";

export default function LoanApplicationClient({
  loan_category,
}: {
  loan_category: string;
}) {
  const [page, setPage] = useState<"form" | "banks" | "confirm">("form");

  const nextPage = () => {
    if (page === "form") {
      setPage("banks");
    } else if (page === "banks") {
      setPage("confirm");
    }
  };

  const prevPage = () => {
    if (page === "banks") {
      setPage("form");
    } else if (page === "confirm") {
      setPage("banks");
    }
  };

  return (
    <>
      {page === "form" && (
        <LoanApplyForm loan_category={loan_category} nextPage={nextPage} />
      )}
      {page === "banks" && (
        <LoanPaymentDetails nextPage={nextPage} prevPage={prevPage} />
      )}
      {page === "confirm" && <LoanConfirmDetails prevPage={prevPage} />}
    </>
  );
}
