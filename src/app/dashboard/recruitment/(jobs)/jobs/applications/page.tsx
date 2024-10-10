"use client";
import { useState } from "react";
import SearchAndFilter from "../../../_components/jobs/search-filter";
import { BiStar } from "react-icons/bi";
import { Filters } from "../../../_components/jobs/all-jobs-client";
import Link from "next/link";
import { routes } from "@/constants/routes";

export interface JobApplication {
  id: number;
  title: string;
  company: string;
  location: string;
  appliedDate: string;
  jobType: "Full Time" | "Part Time";
  jobLevel: "Senior Level" | "Junior Level";
  logo: string;
  starred: boolean;
  closeDate: string;
  status: "Open" | "Closed";
}

const jobApplications: JobApplication[] = [
  {
    id: 1,
    title: "Professional Nurse",
    company: "Company A",
    location: "Abuja, Nigeria",
    appliedDate: "2 days ago",
    jobType: "Full Time",
    jobLevel: "Senior Level",
    logo: "https://api.dicebear.com/6.x/initials/svg?seed=CompanyA",
    starred: false,
    closeDate: "2023-12-31",
    status: "Open",
  },
  {
    id: 2,
    title: "Professional Nurse",
    company: "Company B",
    location: "Abuja, Nigeria",
    appliedDate: "2 days ago",
    jobType: "Part Time",
    jobLevel: "Junior Level",
    logo: "https://api.dicebear.com/6.x/initials/svg?seed=CompanyB",
    starred: false,
    closeDate: "2023-06-30",
    status: "Closed",
  },
  // Add more job application listings as needed
];

export default function JobApplicationsClient() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    jobType: [],
    jobLevel: [],
    salaryRange: [],
  });
  const [applicationList, setApplicationList] = useState(jobApplications);

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

  const toggleStar = (id: number) => {
    setApplicationList((prevApplications) =>
      prevApplications.map((application) =>
        application.id === id
          ? { ...application, starred: !application.starred }
          : application,
      ),
    );
  };

  // const filteredApplications = applicationList.filter((application) => {
  //   return (
  //     (filters.jobType.length === 0 ||
  //       filters.jobType.includes(application.jobType)) &&
  //     (filters.jobLevel.length === 0 ||
  //       filters.jobLevel.includes(application.jobLevel))
  //   );
  // });

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <SearchAndFilter
          filters={filters}
          showFilters={showFilters}
          toggleFilter={toggleFilter}
          setShowFilters={setShowFilters}
        />
        <div className="space-y-4">
          {applicationList.map((application) => (
            <div
              key={application.id}
              className="rounded-lg bg-white p-4 shadow-sm lg:flex lg:justify-between"
            >
              <div className="mb-2 flex items-center">
                <button
                  onClick={() => toggleStar(application.id)}
                  className="mr-4 text-2xl"
                >
                  <BiStar
                    className={
                      application.starred ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                </button>
                <img
                  src={application.logo}
                  alt={application.company}
                  className="mr-4 h-12 w-12 rounded-full"
                />
                <div>
                  <Link
                    href={
                      routes.RECRUITMENT_JOBS + "/details/" + application.id
                    }
                  >
                    <h2 className="text-lg font-semibold">
                      {application.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {application.company} • {application.location}{" "}
                    <span className="uppercase text-secondary-500">
                      • CLOSING : {application.closeDate}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4">
                <button
                  className={`w-full rounded-lg px-4 py-2 text-white transition duration-300 md:w-auto ${
                    application.status === "Open"
                      ? "bg-green-500 hover:bg-primary-500"
                      : "bg-red-500 hover:bg-secondary-500"
                  }`}
                >
                  {application.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
