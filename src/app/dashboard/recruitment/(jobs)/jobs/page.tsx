import React from "react";
import AllJobsClient from "../../_components/jobs/all-jobs-client";
import { getUserSession } from "@/lib/auth";
import { JobPostResponse } from "@/definition";
import jobsApi from "@/api/jobs";


export const metadata = {
  title: "All Jobs available for you | Moricol",
  description: "Find your dream job with Moricol",
};


async function getAllJobs(type: string) {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }

  try {
    const { data: jobposts } : { data: JobPostResponse[] } = await jobsApi.retrieveAllJobPosts({session, state: '', moricol_job: type !== 'general', job_level: [], job_type: [], page: 1, max_salary: [], min_salary : []});

    return jobposts;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

async function Jobs({ searchParams }: { searchParams: { type: string } }) {
  const jobposts = await getAllJobs(searchParams.type);
  return (
    <div>
      <AllJobsClient jobposts={jobposts} type={searchParams.type} />
    </div>
  );
}

export default Jobs;
