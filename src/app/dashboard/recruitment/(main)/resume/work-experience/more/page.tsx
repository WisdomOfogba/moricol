import React from "react";
import MoreWorkExperienceClient from "./_components/more-client";
import { routes } from "@/constants/routes";
import { getUserSession } from "@/lib/auth";
import resumeApi from "@/api/local-resume";

 async function getResume() {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }
  try {
    const {data}  = await resumeApi.retrieveResume({ userId: session.user.id as string });
    
    return data.work_experience;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

async function MoreWorkExperience() {
  const work_experience = await getResume();
  
  return (
    <MoreWorkExperienceClient
    work_experience={work_experience}
      next_route={routes.RECRUITMENT_EDUCATION}
      more_route={routes.RECRUITMENT_WORK_EXPERIENCE}
    />
  );
}

export default MoreWorkExperience;
