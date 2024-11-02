import React from "react";
import LoanOfferClient from "../../_components/loan-offer-client";
import { getUserSession } from "@/lib/auth";
import { LoanCategory, LoanDetails } from "@/definition";
import loanApi from "@/api/loan";

export const metadata = {
  title: "Loan Offer | Moricol",
  description: "View loan offer",
};


async function getLoanCategories(id: string) {
  try {
    const session = await getUserSession();
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: loanData }: { data: LoanDetails } = await loanApi.retrieveSingleCategory({ userid: session.user.id, id, session });
    return loanData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get loan data');
  }
}



async function LoanOffer({ params }: { params: { loan_category: string } }) {
  const loanDetails = await getLoanCategories(params.loan_category);
  console.log(loanDetails);

  return <LoanOfferClient loanDetails={loanDetails} />;
}

export default LoanOffer;
