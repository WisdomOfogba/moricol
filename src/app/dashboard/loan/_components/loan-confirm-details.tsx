import Button from "@/components/button";
import { ArrowRightSvg } from "@/components/svgs";
import { routes } from "@/constants/routes";
import Link from "next/link";

export default function LoanConfirmDetails({
  prevPage,
}: {
  prevPage: () => void;
}) {
  const loanDetails = [
    { label: "Medical Category", value: "Dental" },
    { label: "Loan Amount", value: "₦25,000" },
    { label: "Total Repayment Amount", value: "₦35,000" },
    { label: "First Repay Date", value: "5/December/2023" },
    { label: "Due Date", value: "22/Febuary.2024" },
    { label: "Account Name", value: "John Doe" },
    { label: "Bank Name", value: "First Bank" },
    { label: "Account Number", value: "****90765" },
  ];

  return (
    <div className="min-h-[60vh] bg-gray-100">
      <div className="border-b border-gray-300 px-4 py-2">
        <button
          className="flex items-center gap-x-2 text-sm font-bold text-primary-500"
          onClick={prevPage}
        >
          <ArrowRightSvg className="h-4 w-4" /> Go Back
        </button>
      </div>
      <div className="shadow-base bg-white">
        <div className="max-w-2xl p-4 md:p-6">
          <h2 className="mb-4 text-lg font-semibold">Confirm Your Loan</h2>

          <div className="space-y-4">
            {loanDetails.map((detail, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{detail.label}</span>
                <span className="font-medium">{detail.value}</span>
              </div>
            ))}
          </div>
          <Link href={routes.LOANVERIFICATION}>
            <Button className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-white hover:bg-primary-600">
              APPLY FOR LOAN
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
