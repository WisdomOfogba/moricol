import { routes } from "@/constants/routes";
import WorkExperienceClient from "../../../_components/work-experience-client";

export default function WorkExperience() {
  return (
    <WorkExperienceClient
      next_route={routes.RECRUITMENT_WORK_EXPERIENCE + "/more"}
    />
  );
}
