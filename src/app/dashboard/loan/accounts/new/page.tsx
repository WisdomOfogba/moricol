'use client'

import Button from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import NavigationBackBtn from "@/components/nav-back-btn";
import React, { useState } from "react";

function LoanAccountsNew() {
  const [accountDetails, setAccountDetails] = useState<{
    accountNumber: string;
    bankName: string;
    accountName: string;
  }>({
    accountNumber: '',
    bankName: '',
    accountName: '',
  });

  return (
    <div>
      <div className="border-b border-gray-300 px-4 py-2">
        <NavigationBackBtn />
      </div>
      <form className="max-w-xl px-4 py-4">
        <h1>Fill the form below to add a new account.</h1>
        <br />
        <div className="mb-4">
          <Label htmlFor="accountNumber" className="block pb-2 text-gray-700">
            Account Number
          </Label>
          <Input
            type="text"
            id="accountNumber"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter account number"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="bankName" className="block pb-2 text-gray-700">
            Bank Name
          </Label>
          <Input
            type="text"
            id="bankName"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter bank name"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="accountName" className="block pb-2 text-gray-700">
            Account Name
          </Label>
          <Input
            type="text"
            id="accountName"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter account name"
          />
        </div>
        <Button className="mt-10 lg:max-w-[360px]">Submit</Button>
      </form>
    </div>
  );
}

export default LoanAccountsNew;
