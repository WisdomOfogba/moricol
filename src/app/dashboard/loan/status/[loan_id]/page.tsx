import React from "react";
import { getUserSession } from "@/lib/auth";
import loanApi from "@/api/loan";
import { DeclinedLoanComponent } from "../../history/[loan_id]/declined/page";
import { LoanApprovedComponent } from "../../history/[loan_id]/approved/page";


async function getLoanData(loanid: string) {
    try {
        const session = await getUserSession();
        if (!session || !session.user || !('id' in session.user)) {
            throw new Error('User session is invalid or user ID is missing');
        }
        const { data: loanData } = await loanApi.checkApprovedLoan({ userid: session.user.id, loanid, session });
        return loanData;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to get loan data');
    }
}

export const metadata = {
    title: "Loan Status",
    description: "view your loan status",
}

async function LoanHistorySingle({ params }: { params: { loan_id: string } }) {
    const loanData = await getLoanData(params.loan_id);
    console.log(loanData);

    return (
        <>
            {!loanData && <DeclinedLoanComponent />}
            {loanData && <LoanApprovedComponent />}
        </>
    );
}

export default LoanHistorySingle;
