"use client";

import { useState, useMemo } from "react";
import Button from "@/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { routes } from "@/constants/routes";
import Link from "next/link";

const jobData = [
  {
    id: 1,
    companyName: "Uninform Technologies",
    jobTitle: "Professional Developer",
    datePosted: "2023-06-22",
    jobPostEnds: "2023-08-22",
    status: "PAY",
    hired: false,
  },
  {
    id: 2,
    companyName: "Uninform Technologies",
    jobTitle: "Professional Developer",
    datePosted: "2023-06-23",
    jobPostEnds: "2023-08-23",
    status: "PENDING",
    hired: false,
  },
  {
    id: 3,
    companyName: "Uninform Technologies",
    jobTitle: "Professional Developer",
    datePosted: "2023-06-24",
    jobPostEnds: "2023-08-24",
    status: "DENIED",
    hired: false,
  },
  {
    id: 4,
    companyName: "Uninform Technologies",
    jobTitle: "Professional Developer",
    datePosted: "2023-06-25",
    jobPostEnds: "2023-08-25",
    status: "PAY",
    hired: false,
  },
  {
    id: 5,
    companyName: "Uninform Technologies",
    jobTitle: "Professional Developer",
    datePosted: "2023-06-26",
    jobPostEnds: "2023-08-26",
    status: "PAY",
    hired: false,
  },
  {
    id: 6,
    companyName: "Uninform Technologies",
    jobTitle: "Professional Developer",
    datePosted: "2023-06-27",
    jobPostEnds: "2023-08-27",
    status: "HIRED",
    hired: true,
  },
  {
    id: 7,
    companyName: "Uninform Technologies",
    jobTitle: "Professional Developer",
    datePosted: "2023-06-28",
    jobPostEnds: "2023-08-28",
    status: "HIRED",
    hired: true,
  },
];

export default function JobsPostedClient() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredAndSortedJobs = useMemo(() => {
    return jobData
      .filter((job) => (activeTab === "ongoing" ? !job.hired : job.hired))
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return (
            new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
          );
        } else {
          return (
            new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
          );
        }
      });
  }, [activeTab, sortOrder]);

  return (
    <div className="min-h-screen">
      <div className="mb-6 flex items-center justify-end">
        <Link href={routes.RECRUITMENT_EMPLOYER}>
          <Button className="w-fit bg-primary-500 text-sm text-white hover:bg-primary-600">
            CREATE A NEW JOB POSTING
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-2 ${activeTab === "ongoing" ? "bg-primary-500 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing Jobs
          </button>
          <button
            className={`flex-1 px-4 py-2 ${activeTab === "hired" ? "bg-primary-500 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab("hired")}
          >
            Hired Jobs
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4 flex justify-between">
            <h1 className="font-bold md:text-2xl">My Posted Job List</h1>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Date posted</TableHead>
                <TableHead>Job Post Ends</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.companyName}</TableCell>
                  <TableCell>{job.jobTitle}</TableCell>
                  <TableCell>
                    {new Date(job.datePosted).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(job.jobPostEnds).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        job.status === "PAY"
                          ? "bg-green-500 text-white"
                          : job.status === "PENDING"
                            ? "bg-yellow-500 text-white"
                            : job.status === "HIRED"
                              ? "bg-blue-500 text-white"
                              : "bg-red-500 text-white"
                      }`}
                    >
                      {job.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
