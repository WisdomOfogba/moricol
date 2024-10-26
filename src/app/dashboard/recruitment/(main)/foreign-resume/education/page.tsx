import React from "react";
import EducationClient from "../../../_components/education-client";
import { routes } from "@/constants/routes";

function Education() {
  return (
    <EducationClient
      education={[]}
      next_route={routes.RECRUITMENT_FOREIGN_EDUCATION + "/more"}
    />
  );
}

export default Education;
