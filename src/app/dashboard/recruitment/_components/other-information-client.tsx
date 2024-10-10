"use client";

import { useState } from "react";
import { BiChevronDown, BiX } from "react-icons/bi";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/input";
import ContentLayout from "./content-layout";

interface Tag {
  id: number;
  text: string;
}

export default function OtherInformationClient({
  next_route,
}: {
  next_route: string;
}) {
  const [skills, setSkills] = useState<Tag[]>([
    { id: 1, text: "Bookkeeping" },
    { id: 2, text: "Taxation" },
  ]);
  const [languages, setLanguages] = useState<Tag[]>([
    { id: 1, text: "English" },
    { id: 2, text: "French" },
  ]);
  const [hobbies, setHobbies] = useState<Tag[]>([
    { id: 1, text: "Reading" },
    { id: 2, text: "Taxation" },
  ]);
  const [noticePeriod, setNoticePeriod] = useState("Immediately");

  const addTag = (
    section: "skills" | "languages" | "hobbies",
    text: string,
  ) => {
    const newTag = { id: Date.now(), text };
    switch (section) {
      case "skills":
        setSkills([...skills, newTag]);
        break;
      case "languages":
        setLanguages([...languages, newTag]);
        break;
      case "hobbies":
        setHobbies([...hobbies, newTag]);
        break;
    }
  };

  const removeTag = (
    section: "skills" | "languages" | "hobbies",
    id: number,
  ) => {
    switch (section) {
      case "skills":
        setSkills(skills.filter((skill) => skill.id !== id));
        break;
      case "languages":
        setLanguages(languages.filter((language) => language.id !== id));
        break;
      case "hobbies":
        setHobbies(hobbies.filter((hobby) => hobby.id !== id));
        break;
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    section: "skills" | "languages" | "hobbies",
  ) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      addTag(section, e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Other Information"
      step={6}
    >
      <form className="space-y-6">
        <div>
          <Label
            htmlFor="skills"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Skills
          </Label>
          <div className="flex flex-wrap gap-2 rounded border border-gray-300 p-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-sm"
              >
                {skill.text}
                <button
                  type="button"
                  onClick={() => removeTag("skills", skill.id)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <BiX size={14} />
                </button>
              </span>
            ))}
            <Input
              type="text"
              id="skills"
              className="flex-grow bg-transparent outline-none"
              placeholder="Add a skill"
              onKeyDown={(e) => handleKeyDown(e, "skills")}
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="languages"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Languages
          </Label>
          <div className="flex flex-wrap gap-2 rounded border border-gray-300 p-2">
            {languages.map((language) => (
              <span
                key={language.id}
                className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-sm"
              >
                {language.text}
                <button
                  type="button"
                  onClick={() => removeTag("languages", language.id)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <BiX size={14} />
                </button>
              </span>
            ))}
            <Input
              type="text"
              id="languages"
              className="flex-grow bg-transparent outline-none"
              placeholder="Add a language"
              onKeyDown={(e) => handleKeyDown(e, "languages")}
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="hobbies"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Hobbies
          </Label>
          <div className="flex flex-wrap gap-2 rounded border border-gray-300 p-2">
            {hobbies.map((hobby) => (
              <span
                key={hobby.id}
                className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-sm"
              >
                {hobby.text}
                <button
                  type="button"
                  onClick={() => removeTag("hobbies", hobby.id)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <BiX size={14} />
                </button>
              </span>
            ))}
            <Input
              type="text"
              id="hobbies"
              className="flex-grow bg-transparent outline-none"
              placeholder="Add a hobby"
              onKeyDown={(e) => handleKeyDown(e, "hobbies")}
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="noticePeriod"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Notice Period for Resumption
          </Label>
          <div className="relative">
            <select
              id="noticePeriod"
              value={noticePeriod}
              onChange={(e) => setNoticePeriod(e.target.value)}
              className="w-full appearance-none rounded border border-gray-300 bg-yellow-100 p-2"
            >
              <option>Immediately</option>
              <option>1 week</option>
              <option>2 weeks</option>
              <option>1 month</option>
            </select>
            <BiChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
          </div>
        </div>
      </form>
    </ContentLayout>
  );
}
