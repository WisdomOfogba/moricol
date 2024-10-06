import Button from "@/components/button";
import FileInput from "@/components/file-input";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useState } from "react";

interface GuarantorInfoProps {
  guarantor: number;
}

const GuarantorInfo: React.FC<GuarantorInfoProps> = ({ guarantor }) => (
  <div className="space-y-4 rounded-md border border-gray-200 p-4">
    <div>
      <Label className="block pb-2" htmlFor={`guarantor-name-${guarantor}`}>
        Name of Guarantor {guarantor}
      </Label>
      <Input
        id={`guarantor-name-${guarantor}`}
        placeholder="Enter guarantor's name"
      />
    </div>
    <div>
      <Label
        className="block pb-2"
        htmlFor={`guarantor-relationship-${guarantor}`}
      >
        Relationship
      </Label>
      <Input
        id={`guarantor-relationship-${guarantor}`}
        placeholder="What is your relationship with this contact?"
      />
    </div>
    <div>
      <Label className="block pb-2" htmlFor={`guarantor-address-${guarantor}`}>
        Detailed Residential Address
      </Label>
      <Input
        id={`guarantor-address-${guarantor}`}
        placeholder="Enter guarantor's residential address"
      />
    </div>
    <div>
      <Label className="block pb-2" htmlFor={`guarantor-phone-${guarantor}`}>
        Phone
      </Label>
      <Input
        id={`guarantor-phone-${guarantor}`}
        placeholder="Enter guarantor's phone"
      />
    </div>
    <div>
      <Label className="block pb-2" htmlFor={`guarantor-email-${guarantor}`}>
        Email
      </Label>
      <Input
        id={`guarantor-email-${guarantor}`}
        placeholder="Enter guarantor's email"
      />
    </div>
    <FileInput
      id={`guarantor-utility-upload-${guarantor}`}
      title="Utility bill, Water bill, PHCN, or rent agreement *"
    />
  </div>
);

function LoanApplyForm({
  loan_category,
  nextPage,
}: {
  loan_category: string;
  nextPage: () => void;
}) {
  const [hasOutstandingLoan, setHasOutstandingLoan] = useState<boolean>(false);

  return (
    <div className="min-h-screen">
      <div className="w-full bg-white">
        <form
          className="max-w-4xl space-y-6 p-4 md:p-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-5">
            <h2 className="text-lg font-semibold">
              Provide the following information to be eligible for a loan{" "}
              <span className="text-gray-200">({loan_category})</span>
            </h2>

            <div>
              <Label className="block pb-2" htmlFor="bvn">
                BVN
              </Label>
              <Input id="bvn" placeholder="Please fill your BVN" />
            </div>

            <div>
              <Label className="block pb-2" htmlFor="work-address">
                Work Address *
              </Label>
              <Input id="work-address" placeholder="Enter your work address" />
            </div>

            <div>
              <Label className="block pb-2" htmlFor="work-status">
                Work Status *
              </Label>
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
              <Label className="block pb-2" htmlFor="bank-name">
                Bank Name *
              </Label>
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
              <Label className="block pb-2" htmlFor="bank-branch">
                Bank Branch *
              </Label>
              <Input id="bank-branch" placeholder="Enter bank branch" />
            </div>

            <div className="space-x-2">
              <Label className="block pb-2">
                Do you have any outstanding loan? *
              </Label>
              <div className="flex gap-10 py-4">
                <div className="flex">
                  <input
                    type="radio"
                    id="outstanding-loan-yes"
                    name="outstanding-loan"
                    value="yes"
                    checked={hasOutstandingLoan === true}
                    onChange={() => setHasOutstandingLoan(true)}
                    className="h-4 w-4 border-gray-300 text-primary-500 focus:ring-primary-500 active:bg-primary-500"
                  />
                  <Label className="ml-1 block" htmlFor="outstanding-loan-yes">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="outstanding-loan-no"
                    name="outstanding-loan"
                    value="no"
                    checked={hasOutstandingLoan === false}
                    onChange={() => setHasOutstandingLoan(false)}
                    className="h-4 w-4 border-gray-300 text-primary-500 focus:ring-primary-500 active:bg-primary-500"
                  />
                  <Label className="ml-1 block" htmlFor="outstanding-loan-no">
                    No
                  </Label>
                </div>
              </div>
            </div>

            {hasOutstandingLoan && (
              <div>
                <Label className="block pb-2" htmlFor="loan-details">
                  How much loan do you owe? *
                </Label>
                <Input id="loan-details" placeholder="Enter loan amount" />
              </div>
            )}

            <div>
              <Label className="block pb-2" htmlFor="residential-address">
                Detailed Residential Address *
              </Label>
              <Input
                id="residential-address"
                placeholder="Enter your residential address"
              />
            </div>

            <FileInput title="Utility bill, Water bill, PHCN, or rent agreement *" />

            <div>
              <Label className="block pb-2" htmlFor="monthly-income">
                Monthly Income *
              </Label>
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

            <FileInput
              id="income-proof-upload"
              title="Proof of Income (3-6 months bank statements, salary slips, etc.) *"
            />

            <div>
              <Label className="block pb-2" htmlFor="collateral">
                Collateral *
              </Label>
              <Input id="collateral" placeholder="Enter collateral details" />
            </div>

            <FileInput
              id="collateral-proof-upload"
              title="Proof of Collateral (Pictures, receipts, range of documents for collateral) *"
            />

            <FileInput id="doctors-report-upload" title="Doctor's Report *" />

            <div className="space-y-4">
              <h3 className="font-semibold">Guarantor&apos;s Information *</h3>
              {[1, 2].map((guarantor) => (
                <GuarantorInfo key={guarantor} guarantor={guarantor} />
              ))}
            </div>
          </div>
          <Button
            onClick={nextPage}
            className="w-full rounded-lg bg-primary-500 py-3 text-white hover:bg-primary-600"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoanApplyForm;
