"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { BiX } from "react-icons/bi";
import { Badge } from "@/components/badge";
import ContentLayout from "../content-layout";
import { routes } from "@/constants/routes";

export default function PersonalDetailsClient() {
  const [qualifications, setQualifications] = useState(["BSC", "MSC"]);

  const removeQualification = (qual: string) => {
    setQualifications(qualifications.filter((q) => q !== qual));
  };

  return (
    <ContentLayout
      pageTitle="Required Personal Details"
      step={3}
      next_route={routes.RECRUITMENT_EMPLOYER_COMPANY_SETUP}
    >
      <form className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="academicQualification"
              className="block text-sm font-medium text-gray-700"
            >
              Academic Qualification
            </label>
            <div className="relative">
              <Select>
                <SelectTrigger id="academicQualification" className="w-full">
                  <SelectValue placeholder="Select qualifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BSC">BSC</SelectItem>
                  <SelectItem value="MSC">MSC</SelectItem>
                  <SelectItem value="PHD">PHD</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2 flex flex-wrap gap-2">
                {qualifications.map((qual) => (
                  <Badge
                    key={qual}
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    {qual}
                    <button
                      onClick={() => removeQualification(qual)}
                      className="ml-1 hover:text-yellow-900"
                    >
                      <BiX className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="candidateGender"
              className="block text-sm font-medium text-gray-700"
            >
              Candidate Gender
            </label>
            <Select>
              <SelectTrigger id="candidateGender" className="w-full">
                <SelectValue placeholder="Male" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="maritalStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Candidate Marital Status
            </label>
            <Select>
              <SelectTrigger id="maritalStatus" className="w-full">
                <SelectValue placeholder="Married" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="religion"
              className="block text-sm font-medium text-gray-700"
            >
              Candidate Religion
            </label>
            <Select>
              <SelectTrigger id="religion" className="w-full">
                <SelectValue placeholder="Christian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="christian">Christian</SelectItem>
                <SelectItem value="muslim">Muslim</SelectItem>
                <SelectItem value="hindu">Hindu</SelectItem>
                <SelectItem value="buddhist">Buddhist</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="timeframeFrom"
              className="block text-sm font-medium text-gray-700"
            >
              Timeframe for Posting (From)
            </label>
            <Select>
              <SelectTrigger id="timeframeFrom" className="w-full">
                <SelectValue placeholder="DEC, 22, 2023" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dec-22-2023">DEC, 22, 2023</SelectItem>
                <SelectItem value="dec-23-2023">DEC, 23, 2023</SelectItem>
                <SelectItem value="dec-24-2023">DEC, 24, 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="timeframeTo"
              className="block text-sm font-medium text-gray-700"
            >
              Timeframe for Posting (To)
            </label>
            <Select>
              <SelectTrigger id="timeframeTo" className="w-full">
                <SelectValue placeholder="DEC, 31, 2023" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dec-31-2023">DEC, 31, 2023</SelectItem>
                <SelectItem value="jan-01-2024">JAN, 01, 2024</SelectItem>
                <SelectItem value="jan-02-2024">JAN, 02, 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </ContentLayout>
  );
}
