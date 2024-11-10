"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card, CardContent } from "@/components/card";
import Button from "@/components/button";
import NavigationBackBtn from "@/components/nav-back-btn";
import { LoanHistorySingleProps } from "../history/[loan_id]/page";
import { formatDateToWords } from "@/util/format-dates-words";

interface PaymentSchedule {
  amount: number;
  date: string;
  id: string | number;
  status: string;
}

interface PaymentHistory {
  amount: number;
  date: string;
  id: string | number;
  status: string;
}

interface LoanHistoryProps {
  paymentSchedule: PaymentSchedule[];
  paymentHistory: PaymentHistory[];
  loanData: LoanHistorySingleProps;
}

export default function LoanHistorySingleClient({
  // paymentSchedule,
  // paymentHistory,
  loanData
}: LoanHistoryProps) {


  const { loan, loanhistory } = loanData;
  const { total_days, amount, status, daily_interest, installment_period } = loan;

  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-300 px-4 py-2">
        <NavigationBackBtn />
      </div>
      <div className="max-w-2xl">
        <div className="p-4 md:p-6">
          <div>
            <Card className="relative mb-6 overflow-hidden rounded-xl bg-primary-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Loan amount</p>
                    <p className="text-3xl font-bold">₦{amount.toLocaleString('en-NG')}</p>
                  </div>
                  <div className={`absolute right-[-10px] top-[-10px] h-12 w-12 rounded-full ${status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <br />
                <hr />
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <p>Loan duration</p>
                    <p>{total_days} days</p>
                  </div>
                  <div>
                    <p>Next payment</p>
                    <p>Feb 29, 2023</p>
                  </div>
                  <div>
                    <p>Interest rate</p>
                    <p>{daily_interest}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="schedule">
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="schedule" className="space-y-4">
                {installment_period.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <div>
                      <p className="font-semibold">N{payment.repay_amount.toLocaleString('en-NG')}</p>
                      <p className="text-sm text-gray-600">{formatDateToWords(payment.due_date)}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${payment.loan_paid === true
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {payment.loan_paid === true ? "Paid" : "Pending"}
                    </span>
                  </div>
                ))}
                {installment_period.length === 0 && (
                  <div className="flex items-center justify-center py-10">
                    <p className="text-sm text-gray-600">No payment schedule</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                {loanhistory.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <div>
                      <p className="font-semibold">N{payment.amount}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${payment.status === "Received Loan"
                        ? "bg-green-100 text-green-800"
                        : "text-primary-800 bg-primary-100"
                        }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                ))}

                {loanhistory.length === 0 && (
                  <div className="flex items-center justify-center py-10">
                    <p className="text-sm text-gray-600">No payment history</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <p className="mt-4 text-sm text-gray-600">
              Next payment due on {(() => {
                const nextPayment = installment_period.find((payment, index) =>
                  !payment.loan_paid && index > installment_period.findIndex(p => p.loan_paid)
                );
                return nextPayment?.due_date ? formatDateToWords(nextPayment.due_date) : 'No upcoming payments';
              })()}
            </p>
            <Button className="mt-4 w-full rounded-lg bg-primary-500 py-3 text-white hover:bg-primary-600">
              PAY NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
