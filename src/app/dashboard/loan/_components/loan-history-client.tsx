"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card, CardContent } from "@/components/card";
import Link from "next/link";
import { routes } from "@/constants/routes";

interface LoanData {
  amount: number;
  duration: number;
  initiatedOn: string;
  status: string;
  id: string | number;
}

interface LoanHistoryProps {
  loanData: LoanData[];
}

interface LoanCardProps {
  loan: LoanData;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan }) => (
  <Card className="bg-gray-50">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">Loan Amount: {loan.amount}</p>
          <p className="text-sm text-gray-600">
            Duration: {loan.duration} Months
          </p>
        </div>
        <Link
          href={
            loan.status === "Approved"
              ? `${routes.LOANHISTORY}/${loan.id}/approved`
              : loan.status === "Active"
                ? `${routes.LOANHISTORY}/${loan.id}`
                : "#"
          }
        >
          <span
            className={
              loan.status === "Approved"
                ? "font-bold text-green-500"
                : "text-primary-500"
            }
          >
            {loan.status === "Approved"
              ? "View Receipt"
              : loan.status === "Active"
                ? "View/Pay back"
                : loan.status}
          </span>
        </Link>
      </div>
      <p className="mt-2 text-right text-sm text-gray-600">
        {loan.status === "Pending" && "Initiated on:"}
        {loan.initiatedOn}
      </p>
    </CardContent>
  </Card>
);

export default function LoanHistoryClient({
  loanData,
  view = "pending",
}: LoanHistoryProps & { view: string }) {
  const [activeTab, setActiveTab] = useState(view);

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl">
        <div className="p-4 md:p-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending Loans</TabsTrigger>
              <TabsTrigger value="approved">Approved Loans</TabsTrigger>
              <TabsTrigger value="active">Active Loans</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4 space-y-4">
              {loanData
                .filter((loan) => loan.status === "Pending")
                .map((loan, index) => (
                  <LoanCard key={index} loan={loan} />
                ))}
            </TabsContent>
            <TabsContent value="approved" className="mt-4 space-y-4">
              {loanData
                .filter((loan) => loan.status === "Approved")
                .map((loan, index) => (
                  <LoanCard key={index} loan={loan} />
                ))}
            </TabsContent>
            <TabsContent value="active" className="mt-4 space-y-4">
              {loanData
                .filter((loan) => loan.status === "Active")
                .map((loan, index) => (
                  <LoanCard key={index} loan={loan} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
