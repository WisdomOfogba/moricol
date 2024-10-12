"use client";
import { useState } from "react";
import SearchAndFilter from "./search-filter";
import JobListings from "./jobs-listing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

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
    starred: false,
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
    starred: false,
  },
  // Add more job listings as needed
];

export interface Filters {
  jobType: string[];
  jobLevel: string[];
  salaryRange: string[];
}

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

        {/* Tabs */}
        <Tabs defaultValue="Careers" className="mb-4 md:mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="Careers"
              className="bg-gray-100 uppercase data-[state=active]:bg-primary-500 data-[state=active]:text-white"
            >
              Careers
            </TabsTrigger>
            <TabsTrigger
              value="General Job"
              className="bg-gray-100 uppercase data-[state=active]:bg-primary-500 data-[state=active]:text-white"
            >
              General Job
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Careers">
            <JobListings jobs={filteredJobs} toggleStar={toggleStar} />
          </TabsContent>
          <TabsContent value="General Job">
            <JobListings jobs={filteredJobs} toggleStar={toggleStar} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
