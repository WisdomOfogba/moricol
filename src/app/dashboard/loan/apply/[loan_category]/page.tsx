import React from "react";
import LoanApplicationClient from "../../_components/loan-application-client";

function LoanApplication({ params }: { params: { loan_category: string } }) {
  return <LoanApplicationClient loan_category={params.loan_category} />;
}

export default LoanApplication;
