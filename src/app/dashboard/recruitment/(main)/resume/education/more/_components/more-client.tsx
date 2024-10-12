"use client";
import ContentLayout from "@/app/dashboard/recruitment/_components/content-layout";
import Link from "next/link";
import { useState } from "react";
import { BiBriefcase, BiChevronRight } from "react-icons/bi";
import { BsFillPlusSquareFill, BsTrash2 } from "react-icons/bs";

interface Education {
  id: number;
  title: string;
  certificate: string;
  startDate: string;
  endDate: string;
}

export default function MoreEducationClient({
  next_route,
  more_route,
}: {
  next_route: string;
  more_route: string;
}) {
  const [experiences, setExperiences] = useState<Education[]>([
    {
      id: 1,
      title: "University of Ife [4.2 CGPA]",
      certificate: "BSC Accounting",
      startDate: "Jan 2020",
      endDate: "2021",
    },
    {
      id: 2,
      title: "University of Ife [4.2 CGPA]",
      certificate: "BSC Accounting",
      startDate: "Jan 2020",
      endDate: "2021",
    },
    {
      id: 3,
      title: "University of Ife [4.2 CGPA]",
      certificate: "BSC Accounting",
      startDate: "Jan 2020",
      endDate: "2021",
    },
    {
      id: 4,
      title: "University of Ife [4.2 CGPA]",
      certificate: "BSC Accounting",
      startDate: "Jan 2020",
      endDate: "Present",
    },
  ]);

  const addExperience = () => {
    const newExperience: Education = {
      id: experiences.length + 1,
      title: "New Position",
      certificate: "New certificate",
      startDate: "Start Date",
      endDate: "End Date",
    };
    setExperiences([...experiences, newExperience]);
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Your educational qualifications"
      step={3}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {experiences.map((experience) => (
          <div key={experience.id}>
            <div className="rounded-lg bg-[#FFF8E7] p-4 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BiBriefcase className="text-3xl text-gray-500" />
                  <div>
                    <h3 className="font-semibold">{experience.title}</h3>
                    <p className="text-sm text-gray-600">
                      {experience.certificate}
                    </p>
                    <p className="text-sm text-gray-500">{`${experience.startDate} - ${experience.endDate}`}</p>
                  </div>
                </div>
                <BiChevronRight className="text-3xl text-gray-400" />
              </div>
            </div>
            <button
              onClick={() => deleteExperience(experience.id)}
              className="mt-2 flex items-center text-sm text-red-500"
            >
              Delete <BsTrash2 className="ml-1 h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <Link
        href={more_route}
        onClick={addExperience}
        className="mt-4 flex items-center font-semibold"
      >
        <BsFillPlusSquareFill className="mr-2" /> Add more Education
      </Link>
    </ContentLayout>
  );
}
