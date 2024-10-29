"use client";
import React, { useState } from "react";
import JobDetailsForm from "../../../_components/employer/job-details-form";
import JobRoleDescriptionForm from "../../../_components/employer/job-description-client";
import PersonalDetailsClient from "../../../_components/employer/personal-details-client";
import CompanySetupClient from "../../../_components/employer/company-setup-client";
import PreviewJobClient from "../../../_components/employer/preview-job-client";
import { CreateJobParams } from "@/api/jobs";

function EmployerJobClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Omit<CreateJobParams, "userid" | "jobpostid" | "session">>({
    min_experience: 0,
    min_salary: 0,
    max_salary: 0,
    state: "",
    working_condition: "",
    job_level: "",
    job_type: "fulltime",
    candidate_title: "",
    company_email: "",
    company_name: "",
    company_logo: "",
    end_date: "",
    start_date: "",
    religion: [],
    marital_status: [],
    gender: [],
    description: "",
    country: "",
    company_bio: "",
    company_address: "",
    company_phone: "",
    academic_qualification: [],
    requirement: "",
    slot: 0,
  });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };



  return (
    <div>
      {step === 1 && <JobDetailsForm nextStep={nextStep} setFormData={setFormData} formData={formData} />}
      {step === 2 && <JobRoleDescriptionForm goBack={goBack} nextStep={nextStep} setFormData={setFormData} formData={formData} />}
      {step === 3 && <PersonalDetailsClient goBack={goBack} nextStep={nextStep} setFormData={setFormData} formData={formData as CreateJobParams} />}
      {step === 4 && <CompanySetupClient goBack={goBack} nextStep={nextStep} setFormData={setFormData} formData={formData} />}
      {step === 5 && <PreviewJobClient goBack={goBack} formData={formData} />}
    </div>
  );
}

export default EmployerJobClient;
