import React from "react";
import { routes } from "@/constants/routes";
import ContentLayout from "../../../_components/content-layout";
import FileInput from "@/components/file-input";

function CV() {
  return (
    <ContentLayout
      next_route={routes.RECRUITMENT_PREVIEW_FOREIGN_RESUME}
      pageTitle="Upload CV"
      step={9}
    >
      <FileInput title="" />
    </ContentLayout>
  );
}

export default CV;
