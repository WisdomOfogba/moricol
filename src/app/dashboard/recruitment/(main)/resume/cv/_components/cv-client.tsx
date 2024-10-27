"use client";

import React, { useState } from "react";
import FileInput from "@/components/file-input";
import ContentLayout from "@/app/dashboard/recruitment/_components/content-layout";
import { useRouter } from "next/navigation";


function CVClient({ next_route, upload }: { next_route: string, upload: { cv: string, picture: string } }) {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const navigateToNextPage = async () => {
        router.push(next_route);
    };

    const handleNext = async () => {
        navigateToNextPage();
    };

    
  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Upload CV"
      step={9}
      isLoading={isLoading}
      nextFunction={handleNext}
    >
      <FileInput title="" />
    </ContentLayout>
  );
}

export default CVClient;
