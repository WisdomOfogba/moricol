import React from "react";
import { routes } from "@/constants/routes";
import MoreWorkExperienceClient from "../../../resume/work-experience/more/_components/more-client";

function MoreWorkExperience() {
  return (
    <MoreWorkExperienceClient
      next_route={routes.RECRUITMENT_FOREIGN_EDUCATION}
      more_route={routes.RECRUITMENT_FOREIGN_WORK_EXPERIENCE}
    />
  );
}

export default MoreWorkExperience;
