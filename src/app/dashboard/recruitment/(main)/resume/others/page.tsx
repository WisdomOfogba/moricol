import React from "react";
import OtherInformationClient from "../../../_components/other-information-client";
import { routes } from "@/constants/routes";

function OtherInformation() {
  return <OtherInformationClient next_route={routes.RECRUITMENT_CONTACT} />;
}

export default OtherInformation;
