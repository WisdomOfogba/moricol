import React from "react";
import Bio from "../../_components/bio";
import { routes } from "@/constants/routes";

function Resume() {
  return <Bio next_route={routes.RECRUITMENT_WORK_EXPERIENCE} />;
}

export default Resume;
