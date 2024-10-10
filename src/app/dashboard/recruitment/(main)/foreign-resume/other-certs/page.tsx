import React from "react";
import OtherCertificateClient from "../../../_components/other-cert-client";
import { routes } from "@/constants/routes";

function OtherCerts() {
  return (
    <OtherCertificateClient
      next_route={routes.RECRUITMENT_FOREIGN_OTHER_CERTS + "/more"}
    />
  );
}

export default OtherCerts;
