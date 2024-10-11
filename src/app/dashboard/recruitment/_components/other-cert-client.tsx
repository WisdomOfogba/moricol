"use client";
import { useState } from "react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import ContentLayout from "./content-layout";

export default function OtherCertificateClient({
  next_route,
}: {
  next_route: string;
}) {
  const [inProgress, setInProgress] = useState(false);

  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Other Certificates"
      step={3}
    >
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div>
              <Label
                htmlFor="bootcampOrOnlineLearning"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Bootcamp/Online Learning
              </Label>
              <Input
                type="text"
                id="bootcampOrOnlineLearning"
                name="bootcampOrOnlineLearning"
                className="w-full rounded border border-gray-300 p-2"
                placeholder="e.g. Udacity, Coursera, edX"
              />
            </div>
            <div>
              <Label
                htmlFor="courseLearnt"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Course Learnt
              </Label>
              <Input
                type="text"
                id="courseLearnt"
                name="courseLearnt"
                className="w-full rounded border border-gray-300 p-2"
                placeholder="e.g. Full Stack Web Development"
              />
            </div>
            <div className="flex items-center">
              <Input
                type="checkbox"
                id="inProgress"
                checked={inProgress}
                onChange={(e) => setInProgress(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
              />
              <Label
                htmlFor="inProgress"
                className="ml-2 block text-sm text-gray-900"
              >
                In Progress
              </Label>
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
          </div>

          <div>
            <Label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={8}
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Describe the skills and knowledge gained from this course or bootcamp"
            />
            <p className="mt-1 text-sm text-gray-500">Minimum 70 characters</p>
          </div>
        </div>
      </form>
    </ContentLayout>
  );
}
