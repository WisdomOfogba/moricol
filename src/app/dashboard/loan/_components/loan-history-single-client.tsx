"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card, CardContent } from "@/components/card";
import Button from "@/components/button";
import NavigationBackBtn from "@/components/nav-back-btn";

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
}

export default function LoanHistorySingleClient({
  paymentSchedule,
  paymentHistory,
}: LoanHistoryProps) {
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
                    <p className="text-3xl font-bold">N30,000</p>
                  </div>
                  <div className="absolute right-[-10px] top-[-10px] h-12 w-12 rounded-full bg-red-500"></div>
                </div>
                <br />
                <hr />
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <p>Loan duration</p>
                    <p>4 mths</p>
                  </div>
                  <div>
                    <p>Next payment</p>
                    <p>Feb 29, 2023</p>
                  </div>
                  <div>
                    <p>Interest rate</p>
                    <p>6.5%</p>
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
                {paymentSchedule.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <div>
                      <p className="font-semibold">N{payment.amount}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <div>
                      <p className="font-semibold">N{payment.amount}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        payment.status === "Received Loan"
                          ? "bg-green-100 text-green-800"
                          : "text-primary-800 bg-primary-100"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <p className="mt-4 text-sm text-gray-600">
              Next payment due on 04/02/2023
            </p>
            <Button className="mt-4 w-full rounded-lg bg-primary-500 py-3 text-white hover:bg-primary-600">
              PAY NOW
            </Button>
          </div>
          ;
        </div>
      </div>
    </div>
  );
}
