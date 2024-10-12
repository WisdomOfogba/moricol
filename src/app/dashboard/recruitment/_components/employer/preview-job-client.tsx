import Button from "@/components/button";
import CreateJobSuccessModal from "./create-job-success-modal";

interface JobData {
  id: string;
  title: string;
  location: string;
  type: string;
  details: {
    experience: string;
    jobLevel: string;
    monthGrossSalary: string;
    monthNetSalary: string;
    qualification: string;
    gender: string;
    maritalStatus: string;
    religion: string;
  };
  description: string;
  requirements: string[];
}

const jobData: JobData = {
  id: "dgshdfg",
  title: "Senior Nurse",
  location: "Abuja",
  type: "(Full Time) (Onsite)",
  details: {
    experience: "2-4 Years",
    jobLevel: "Top Manager",
    monthGrossSalary: "₦350-400",
    monthNetSalary: "₦350-400",
    qualification: "BSC, MSC",
    gender: "All Gender",
    maritalStatus: "₦350-400",
    religion: "Christian",
  },
  description:
    "Collaborate with product management and engineering to define and implement innovative solutions for the product direction, visuals and experience. Execute all visual design stages from concept to final hand-off to engineering. Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks. Create wireframes, storyboards, user flows, process flows and site maps to effectively communicate interaction and design ideas. Present and defend designs and key milestone deliverables to peers and executive level stakeholders. Conduct user research and evaluate user feedback.",
  requirements: [
    "Identify problems based on the product vision / requirements and come up with delightful design solutions & deliverables.",
    "Conduct design process best practices across projects such as gathering insights, validating problems & solutions, delivering multiple fidelity levels of design, and ensure the final design is implemented properly on production.",
    "Collaborate with Interaction Designers (Design System team) to ensure the implementation of proper design components and patterns and/or improving existing design libraries.",
  ],
};

export default function PreviewJobClient() {
  return (
    <>
      <div className="min-h-screen">
        <div className="">
          <div className="rounded-lg bg-white p-6">
            <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <h1 className="mb-2 text-2xl font-bold">{jobData.title}</h1>
                <p className="text-gray-600">
                  {jobData.location} {jobData.type}
                </p>
              </div>
              <div className="mt-4 flex items-center md:mt-0">
                <Button className="rounded-lg bg-yellow-500 px-6 py-2 text-white transition duration-300 hover:bg-yellow-600">
                  Edit
                </Button>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4">
              <JobDetail
                title="Experience"
                value={jobData.details.experience}
              />
              <JobDetail title="Job Level" value={jobData.details.jobLevel} />
              <JobDetail
                title="Month Gross Salary"
                value={jobData.details.monthGrossSalary}
              />
              <JobDetail
                title="Month Net Salary"
                value={jobData.details.monthNetSalary}
              />
            </div>
            <div className="mb-8 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4">
              <JobDetail
                title="Qualification"
                value={jobData.details.qualification}
              />
              <JobDetail title="Gender" value={jobData.details.gender} />
              <JobDetail
                title="Marital Status"
                value={jobData.details.maritalStatus}
              />
              <JobDetail title="Religion" value={jobData.details.religion} />
            </div>
          </div>

          <div className="rounded-lg border-t bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Description</h2>
            <p className="text-gray-700">{jobData.description}</p>
          </div>

          <div className="mb-8 rounded-lg border-t bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Requirements</h2>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              {jobData.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center py-6 md:mt-0">
            <CreateJobSuccessModal />
          </div>
        </div>
      </div>
    </>
  );
}

function JobDetail({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="mb-1 text-sm font-medium text-gray-500">{title}</h3>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
