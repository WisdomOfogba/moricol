import React from "react";
import MoreEducationClient from "../../../resume/education/more/_components/more-client";
import { routes } from "@/constants/routes";

function MoreEducation() {
  return (
    <MoreEducationClient
      next_route={routes.RECRUITMENT_FOREIGN_OTHER_CERTS}
      more_route={routes.RECRUITMENT_FOREIGN_EDUCATION}
    />
  );
}

export default MoreEducation;
