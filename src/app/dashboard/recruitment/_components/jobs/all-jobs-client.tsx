"use client";
import { useState } from "react";
import SearchAndFilter from "./search-filter";
import JobListings from "./jobs-listing";
import { JobPostResponse } from "@/definition";
import { routes } from "@/constants/routes";
import {  useRouter } from "next/navigation";
import Button from "@/components/button";
import NoJobsFound from "./no-jobs-found";



export interface Filters {
  jobType: string[];
  jobLevel: string[];
  salaryRange: string[];
}

export default function AllJobsClient({jobposts, type}: {jobposts: JobPostResponse[], type: string}) {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    jobType: [],
    jobLevel: [],
    salaryRange: [],
  });

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

 

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
       
          <div className="flex items-center justify-center">
            <Button 
              variant="outline" 
              onClick={() => router.replace(routes.RECRUITMENT_JOBS)}
              className={`uppercase ${type !== "general" ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              Careers
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.replace(routes.RECRUITMENT_JOBS + "?type=general")}
              className={`uppercase ${type === "general" ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              General Job
            </Button>
            </div>
            <JobListings jobs={jobposts}/>
      {jobposts.length === 0 && (
        <NoJobsFound/>
      )}
        
      </div>
    </div>
  );
}
