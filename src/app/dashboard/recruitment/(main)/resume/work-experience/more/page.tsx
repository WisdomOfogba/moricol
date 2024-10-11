import React from "react";
import MoreWorkExperienceClient from "./_components/more-client";
import { routes } from "@/constants/routes";

function MoreWorkExperience() {
  return (
    <MoreWorkExperienceClient
      next_route={routes.RECRUITMENT_EDUCATION}
      more_route={routes.RECRUITMENT_WORK_EXPERIENCE}
    />
  );
}

export default MoreWorkExperience;
