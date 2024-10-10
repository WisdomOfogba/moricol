import React from "react";
import EducationClient from "../../../_components/education-client";
import { routes } from "@/constants/routes";

function Education() {
  return (
    <EducationClient
      next_route={routes.RECRUITMENT_FOREIGN_EDUCATION + "/more"}
    />
  );
}

export default Education;
