"use client";
import { useState } from "react";

import { Filters } from "../../../_components/jobs/all-jobs-client";
import SearchAndFilter from "../../../_components/jobs/search-filter";
import JobListings from "../../../_components/jobs/jobs-listing";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  jobType: "Full Time" | "Part Time";
  jobLevel: "Senior Level" | "Junior Level";
  logo: string;
  starred: boolean;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Professional Nurse",
    company: "Company A",
    location: "Abuja, Nigeria",
    postedDate: "2 days ago",
    jobType: "Full Time",
    jobLevel: "Senior Level",
    logo: "https://api.dicebear.com/6.x/initials/svg?seed=CompanyA",
    starred: true,
  },
  {
    id: 2,
    title: "Professional Nurse",
    company: "Company B",
    location: "Abuja, Nigeria",
    postedDate: "2 days ago",
    jobType: "Part Time",
    jobLevel: "Junior Level",
    logo: "https://api.dicebear.com/6.x/initials/svg?seed=CompanyB",
    starred: true,
  },
  // Add more job listings as needed
];

export default function AllJobsClient() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    jobType: [],
    jobLevel: [],
    salaryRange: [],
  });
  const [jobList, setJobList] = useState(jobs);

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

  const toggleStar = (id: number) => {
    setJobList((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, starred: !job.starred } : job,
      ),
    );
  };

  const filteredJobs = jobList.filter((job) => {
    return (
      (filters.jobType.length === 0 || filters.jobType.includes(job.jobType)) &&
      (filters.jobLevel.length === 0 || filters.jobLevel.includes(job.jobLevel))
    );
  });

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

        <JobListings jobs={filteredJobs} toggleStar={toggleStar} />
      </div>
    </div>
  );
}
