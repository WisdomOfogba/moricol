"use client"

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Switch } from "@/components/switch";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { BiUpload } from "react-icons/bi";
import Button from "@/components/button";

export default function LoanApplicationClient() {
  const [hasOutstandingLoan, setHasOutstandingLoan] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl bg-white shadow-lg">
        <form className="space-y-6 p-4 md:p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Provide the following information to be eligible for a loan
            </h2>

            <div>
              <Label htmlFor="bvn">BVN</Label>
              <Input id="bvn" placeholder="Please fill your BVN" />
            </div>

            <div>
              <Label htmlFor="work-address">Work Address *</Label>
              <Input id="work-address" placeholder="Enter your work address" />
            </div>

            <div>
              <Label htmlFor="work-status">Work Status *</Label>
              <Select>
                <SelectTrigger id="work-status">
                  <SelectValue placeholder="Select work status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bank-name">Bank Name *</Label>
              <Select>
                <SelectTrigger id="bank-name">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank1">Bank 1</SelectItem>
                  <SelectItem value="bank2">Bank 2</SelectItem>
                  <SelectItem value="bank3">Bank 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bank-branch">Bank Branch *</Label>
              <Input id="bank-branch" placeholder="Enter bank branch" />
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="outstanding-loan">
                Do you have any outstanding loan? *
              </Label>
              <Switch
                id="outstanding-loan"
                checked={hasOutstandingLoan}
                onCheckedChange={setHasOutstandingLoan}
              />
            </div>

            {hasOutstandingLoan && (
              <div>
                <Label htmlFor="loan-details">
                  How much loan do you owe? *
                </Label>
                <Input id="loan-details" placeholder="Enter loan amount" />
              </div>
            )}

            <div>
              <Label htmlFor="residential-address">
                Detailed Residential Address *
              </Label>
              <Input
                id="residential-address"
                placeholder="Enter your residential address"
              />
            </div>

            <div>
              <Label>Utility bill, Water bill, PHCN, or rent agreement *</Label>
              <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                <div className="space-y-1 text-center">
                  <BiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="monthly-income">Monthly Income *</Label>
              <Select>
                <SelectTrigger id="monthly-income">
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50000">₦0 - ₦50,000</SelectItem>
                  <SelectItem value="50001-100000">
                    ₦50,001 - ₦100,000
                  </SelectItem>
                  <SelectItem value="100001-200000">
                    ₦100,001 - ₦200,000
                  </SelectItem>
                  <SelectItem value="200001+">₦200,001+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Proof of Income (3-6 months bank statements, salary slips, etc.)
                *
              </Label>
              <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                <div className="space-y-1 text-center">
                  <BiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="income-proof-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="income-proof-upload"
                        name="income-proof-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="collateral">Collateral *</Label>
              <Input id="collateral" placeholder="Enter collateral details" />
            </div>

            <div>
              <Label>
                Proof of Collateral (Pictures, receipts, range of documents for
                collateral) *
              </Label>
              <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                <div className="space-y-1 text-center">
                  <BiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="collateral-proof-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="collateral-proof-upload"
                        name="collateral-proof-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label>Doctor's Report *</Label>
              <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                <div className="space-y-1 text-center">
                  <BiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="doctors-report-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="doctors-report-upload"
                        name="doctors-report-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Guarantor's Information *</h3>
              {[1, 2].map((guarantor) => (
                <div
                  key={guarantor}
                  className="space-y-4 rounded-md border border-gray-200 p-4"
                >
                  <div>
                    <Label htmlFor={`guarantor-name-${guarantor}`}>
                      Name of Guarantor {guarantor}
                    </Label>
                    <Input
                      id={`guarantor-name-${guarantor}`}
                      placeholder="Enter guarantor's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`guarantor-relationship-${guarantor}`}>
                      Relationship
                    </Label>
                    <Input
                      id={`guarantor-relationship-${guarantor}`}
                      placeholder="What is your relationship with this contact?"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`guarantor-address-${guarantor}`}>
                      Detailed Residential Address
                    </Label>
                    <Input
                      id={`guarantor-address-${guarantor}`}
                      placeholder="Enter guarantor's residential address"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`guarantor-phone-${guarantor}`}>
                      Phone
                    </Label>
                    <Input
                      id={`guarantor-phone-${guarantor}`}
                      placeholder="Enter guarantor's phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`guarantor-email-${guarantor}`}>
                      Email
                    </Label>
                    <Input
                      id={`guarantor-email-${guarantor}`}
                      placeholder="Enter guarantor's email"
                    />
                  </div>
                  <div>
                    <Label>
                      Utility bill, Water bill, PHCN, or rent agreement *
                    </Label>
                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                      <div className="space-y-1 text-center">
                        <BiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor={`guarantor-utility-upload-${guarantor}`}
                            className="relative cursor-pointer rounded-md bg-white font-medium text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id={`guarantor-utility-upload-${guarantor}`}
                              name={`guarantor-utility-upload-${guarantor}`}
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full rounded-lg bg-orange-500 py-3 text-white hover:bg-orange-600">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
