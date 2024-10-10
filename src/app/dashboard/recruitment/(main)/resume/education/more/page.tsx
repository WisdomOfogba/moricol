import React from "react";
import MoreEducationClient from "./_components/more-client";
import { routes } from "@/constants/routes";

function MoreEducation() {
  return (
    <MoreEducationClient
      next_route={routes.RECRUITMENT_REF}
      more_route={routes.RECRUITMENT_EDUCATION}
    />
  );
}

export default MoreEducation;
