import { BiStar } from "react-icons/bi";
import { Job } from "./all-jobs-client";
import Link from "next/link";
import { routes } from "@/constants/routes";

interface JobListingsProps {
  jobs: Job[];
  toggleStar: (id: number) => void;
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, toggleStar }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="rounded-lg bg-white p-4 shadow-sm xl:flex xl:justify-between"
        >
          <div className="mb-2 flex items-center">
            <button
              onClick={() => toggleStar(job.id)}
              className="mr-4 text-2xl"
            >
              <BiStar
                className={job.starred ? "text-yellow-500" : "text-gray-300"}
              />
            </button>
            <img
              src={job.logo}
              alt={job.company}
              className="mr-4 h-12 w-12 rounded-full"
            />
            <div>
              <Link href={routes.RECRUITMENT_JOBS + "/details/" + job.id}>
                <h2 className="text-lg font-semibold">{job.title}</h2>
              </Link>
              <p className="text-gray-600">
                {job.company} • {job.location} • {job.postedDate}
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4">
            <div className="mb-2 flex flex-wrap gap-2 md:mb-0">
              <span
                className={`rounded-full px-3 py-1 text-sm ${job.jobType === "Full Time" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"}`}
              >
                {job.jobType}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm ${job.jobLevel === "Senior Level" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
              >
                {job.jobLevel}
              </span>
            </div>
            <Link
              href={routes.RECRUITMENT_JOBS + "/details/" + job.id}
              className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-white transition duration-300 hover:bg-yellow-600 md:w-auto"
            >
              Apply Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
