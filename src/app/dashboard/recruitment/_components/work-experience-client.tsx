"use client";
import { useState } from "react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import ContentLayout from "./content-layout";

export default function WorkExperienceClient({
  next_route,
}: {
  next_route: string;
}) {
  const [currentlyWork, setCurrentlyWork] = useState(false);

  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Work Experience (Including Study, atleast 10years)"
      step={2}
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Payable accountant"
            />
          </div>
          <div>
            <Label
              htmlFor="company"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Company
            </Label>
            <Input
              type="text"
              id="company"
              name="company"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Enter company name"
            />
          </div>
        </div>
        <div className="flex items-center">
          <Input
            type="checkbox"
            id="currentlyWork"
            checked={currentlyWork}
            onChange={(e) => setCurrentlyWork(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
          />
          <Label
            htmlFor="currentlyWork"
            className="ml-2 block text-sm text-gray-900"
          >
            I currently work here
          </Label>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label
              htmlFor="started"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Started
            </Label>
            <Input
              type="date"
              id="started"
              name="started"
              className="w-full rounded border border-gray-300 p-2"
              disabled={currentlyWork}
            />
          </div>
          <div>
            <Label
              htmlFor="ended"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Ended
            </Label>
            <Input
              type="date"
              id="ended"
              name="ended"
              className="w-full rounded border border-gray-300 p-2"
              disabled={currentlyWork}
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="previousEmployer"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Previous Employer
          </Label>
          <Input
            type="text"
            id="previousEmployer"
            name="previousEmployer"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Payable accountant"
          />
        </div>
        <div>
          <Label
            htmlFor="reasonForLeaving"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Reason for leaving
          </Label>
          <Textarea
            rows={6}
            id="reasonForLeaving"
            name="reasonForLeaving"
            placeholder="Lorem ipsum dolor sit amet consectetur. Faucibus rutrum eget vel viverra eget etiam sit. Dictum vivamus amet diam sit nulla ut mattis pulvinar. Turpis in purus dui gravida risus massa. Sed tortor non diam non aenean gravida turpis."
          />
          <p className="mt-1 text-sm text-gray-500">Minimum 70 characters</p>
        </div>
      </form>
    </ContentLayout>
  );
}
