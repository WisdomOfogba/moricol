import { routes } from "@/constants/routes";
import WorkExperienceClient from "../../../_components/work-experience-client";

export default function WorkExperience() {
  return (
    <WorkExperienceClient
      work_experience={[]}
      next_route={routes.RECRUITMENT_FOREIGN_WORK_EXPERIENCE + "/more"}
    />
  );
}
