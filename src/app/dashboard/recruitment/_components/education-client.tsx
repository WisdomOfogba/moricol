"use client";
import { useState } from "react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import ContentLayout from "./content-layout";

export default function EducationClient({
  next_route,
}: {
  next_route: string;
}) {
  const [inView, setInView] = useState(false);

  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Academic History"
      step={3}
    >
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div>
              <Label
                htmlFor="school"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                School
              </Label>
              <Input
                type="text"
                id="school"
                name="school"
                className="w-full rounded border border-gray-300 p-2"
                placeholder="University of Ife"
              />
            </div>
            <div>
              <div>
                <Label
                  htmlFor="degree"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Degree/Specialization
                </Label>
                <Input
                  type="text"
                  id="degree"
                  name="degree"
                  className="w-full rounded border border-gray-300 p-2"
                  placeholder="BS Accounting"
                />
              </div>

              <div className="flex items-center pt-5">
                <Input
                  type="checkbox"
                  id="inView"
                  checked={inView}
                  onChange={(e) => setInView(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                />
                <Label
                  htmlFor="inView"
                  className="ml-2 block text-sm text-gray-900"
                >
                  in view
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="schoolStarted"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  School Started
                </Label>
                <Input
                  type="date"
                  id="schoolStarted"
                  name="schoolStarted"
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>
              <div>
                <Label
                  htmlFor="schoolEnded"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  School Ended
                </Label>
                <Input
                  type="date"
                  id="schoolEnded"
                  name="schoolEnded"
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="grade"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Grade
              </Label>
              <Input
                type="text"
                id="grade"
                name="grade"
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Enter Grade"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="courseDescription"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Course Description
            </Label>
            <Textarea
              id="courseDescription"
              name="courseDescription"
              rows={8}
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Studied accounting principles in Taxation"
            />
            <p className="mt-1 text-sm text-gray-500">Minimum 70 characters</p>
          </div>
        </div>
      </form>
    </ContentLayout>
  );
}
