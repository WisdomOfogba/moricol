import React from "react";
import MoreOtherCertClient from "./_component/more-client";
import { routes } from "@/constants/routes";

function MoreOtherCert() {
  return (
    <MoreOtherCertClient
      next_route={routes.RECRUITMENT_FOREIGN_REF}
      more_route={routes.RECRUITMENT_FOREIGN_OTHER_CERTS}
    />
  );
}

export default MoreOtherCert;
