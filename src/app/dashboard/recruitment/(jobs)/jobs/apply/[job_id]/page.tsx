import { ResumeView } from "@/app/dashboard/recruitment/(main)/preview/page";
import ApplySuccessModal from "@/app/dashboard/recruitment/_components/jobs/apply-success-modal";
import FileInput from "@/components/file-input";
import React from "react";

function ApplyJob() {
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

      <div className="flex w-full justify-end gap-4 md:gap-8">
        <div className="space-x-4">
          <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
            CREATE CV/APPLY MANUALLY
          </button>
          <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
            EDIT RESUME
          </button>
        </div>
      </div>
      <div className="rounded-lg bg-white p-2">
        <ResumeView />
      </div>
    </div>
  );
}

export default ApplyJob;
