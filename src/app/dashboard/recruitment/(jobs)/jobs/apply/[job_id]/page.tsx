import resumeApi from "@/api/local-resume";
import ApplySuccessModal from "@/app/dashboard/recruitment/_components/jobs/apply-success-modal";
import FileInput from "@/components/file-input";
import { routes } from "@/constants/routes";
import { UserResumeResponse } from "@/definition";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Apply for Job",
  description: "Apply for a job with your credentials",
};

async function getResume() {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }
  try {
    const {data: local} : {data: UserResumeResponse} = await resumeApi.retrieveResume({ userId: session.user.id as string, type: 'local' });
    const {data: foreign} : {data: UserResumeResponse} = await resumeApi.retrieveResume({ userId: session.user.id as string, type: 'foreign' });
    
    return {local, foreign}
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
async function ApplyJob() {
  const {local, foreign} = await getResume();
  return (
    <div className="relative min-h-screen">
      <h1 className="font-semibold">APPLY WITH YOUR CREDENTIALS</h1>
      <FileInput title="" caption="Upload Cover Letter" />
      <FileInput title="" caption="Upload CV" />
      <div className="mt-6"></div>
      <ApplySuccessModal />

      <div className="flex w-full items-center gap-3 py-5">
        <div className="w-full border-t border-black/20" />
        <p>OR</p>
        <div className="w-full border-t border-black/20" />
      </div>

      <div>
        <h1 className="font-semibold">APPLY WITH YOUR MORICOL RESUME</h1>
        <p>Select which resume you have created to be used to apply for this job</p>
      </div>

  
      <div className="flex w-full justify-start gap-4 lg:gap-8 items-center py-5">
        
       {local &&   <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
            APPLY WITH LOCAL RESUME
          </button>}
      {local && foreign &&  <span className="text-gray-500">|</span>}
       {foreign &&   <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
            APPLY WITH FOREIGN RESUME
          </button>}
        </div>

     <Link href={routes.RECRUITMENT_JOBS_RESUME} className="px-4 text-md hover:text-yellow-500 py-2 underline font-semibold text-gray-700 hover:bg-gray-50">
            VIEW YOUR SAVED RESUME
          </Link>
    
    </div>
  );
}

export default ApplyJob;
