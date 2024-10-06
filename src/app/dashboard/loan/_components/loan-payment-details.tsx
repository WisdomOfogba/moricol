import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Input } from "@/components/input";
import Button from "@/components/button";
import { ArrowRightSvg } from "@/components/svgs";

function LoanPaymentDetails({
  nextPage,
  prevPage,
}: {
  nextPage: () => void;
  prevPage: () => void;
}) {
  return (
    <div className="min-h-[50vh] bg-white">
      <div className="border-b border-gray-300 bg-gray-50 px-4 py-2">
        <button
          className="flex items-center gap-x-2 text-sm font-bold text-primary-500"
          onClick={prevPage}
        >
          <ArrowRightSvg className="h-4 w-4" /> Go Back
        </button>
      </div>

      <div className="max-w-xl p-4 md:p-6">
        <p className="mb-6 text-gray-700">
          Provide details of the account you would like to get the loan to
        </p>

        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="bank"
              className="block text-sm font-medium text-gray-700"
            >
              Choose bank
            </label>
            <Select>
              <SelectTrigger id="bank" className="w-full bg-white">
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank1">Bank 1</SelectItem>
                <SelectItem value="bank2">Bank 2</SelectItem>
                <SelectItem value="bank3">Bank 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="account-number"
              className="block text-sm font-medium text-gray-700"
            >
              Bank account number
            </label>
            <Input
              type="text"
              id="account-number"
              placeholder="Enter your account number"
              className="w-full"
            />
          </div>

          <Button
            onClick={nextPage}
            className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-white hover:bg-primary-600"
          >
            CONTINUE
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoanPaymentDetails;
