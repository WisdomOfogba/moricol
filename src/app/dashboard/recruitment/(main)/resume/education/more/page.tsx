import React from "react";
import MoreEducationClient from "./_components/more-client";
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
    
    return data.education;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

async function MoreEducation() {
  const education = await getResume();
  return (
    <MoreEducationClient
      next_route={routes.RECRUITMENT_REF}
      more_route={routes.RECRUITMENT_EDUCATION}
      education={education}
    />
  );
}

export default MoreEducation;
