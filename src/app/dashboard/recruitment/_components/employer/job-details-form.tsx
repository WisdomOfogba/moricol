import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { BiX } from "react-icons/bi";
import ContentLayout from "../content-layout";
import { routes } from "@/constants/routes";

export default function JobDetailsForm() {
  return (
    <ContentLayout
      step={1}
      next_route={routes.RECRUITMENT_EMPLOYER_JOB_DESC}
      pageTitle="Job Details"
    >
      <form className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="candidateTitle">Candidate Title</Label>
            <Input id="candidateTitle" placeholder="Payable accountant" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobType">Job type</Label>
            <Select>
              <SelectTrigger id="jobType" className="w-full">
                <SelectValue placeholder="Full time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fullTime">Full time</SelectItem>
                <SelectItem value="partTime">Part time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <div className="relative">
              <Input id="country" value="Nigeria" readOnly className="pr-8" />
              <BiX className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <div className="relative">
              <Input id="state" value="Abuja" readOnly className="pr-8" />
              <BiX className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobLevel">Job Level</Label>
            <div className="relative">
              <Input
                id="jobLevel"
                value="Top Manager"
                readOnly
                className="pr-8"
              />
              <BiX className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="workingCondition">Working condition</Label>
            <div className="relative">
              <Input
                id="workingCondition"
                value="Remote"
                readOnly
                className="pr-8"
              />
              <BiX className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="minSalary">Min. Monthly Net Salary</Label>
            <Input id="minSalary" placeholder="₦ 250,000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxSalary">Max. Monthly Net Salary</Label>
            <Input id="maxSalary" placeholder="₦ 450,000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minExperience">Min. Experience required</Label>
            <Input id="minExperience" placeholder="0 years" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="candidatesWanted">
              How many Candidates do you want?
            </Label>
            <Input
              id="candidatesWanted"
              placeholder="Enter number of candidates"
            />
          </div>
        </div>
      </form>
    </ContentLayout>
  );
}
