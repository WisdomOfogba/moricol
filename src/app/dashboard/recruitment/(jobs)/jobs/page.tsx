import React from "react";
import AllJobsClient from "../../_components/jobs/all-jobs-client";

export const metadata = {
  title: "All Jobs available for you | Moricol",
  description: "Find your dream job with Moricol",
};

function Jobs() {
  return (
    <div>
      <AllJobsClient />
    </div>
  );
}

export default Jobs;
