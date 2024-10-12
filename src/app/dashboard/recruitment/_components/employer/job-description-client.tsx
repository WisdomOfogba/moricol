"use client";

import { useState } from "react";
import { Textarea } from "@/components/textarea";
import { Input } from "@/components/input";
import ContentLayout from "../content-layout";
import { routes } from "@/constants/routes";

export default function JobRoleDescriptionForm() {
  const [description, setDescription] = useState("");

  return (
    <ContentLayout
      pageTitle="Job role description"
      next_route={routes.RECRUITMENT_EMPLOYER_PERSONAL}
      step={2}
    >
      <h2 className="mb-6 text-2xl font-bold"></h2>
      <form className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Describe job role
          </label>
          <div className="relative mt-1">
            <Textarea
              id="jobDescription"
              name="jobDescription"
              rows={6}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Keep records of each medical records ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              Minimum 70 characters
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="requirements"
            className="block text-sm font-medium text-gray-700"
          >
            Requirements
          </label>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Created [accounting rule], which resulted in [percentage improvement]"
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Built/designd [project] using [skills/technologies]"
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Lead [initiative], generating a [numerical impact]"
              className="w-full"
            />
          </div>
        </div>
      </form>
    </ContentLayout>
  );
}
