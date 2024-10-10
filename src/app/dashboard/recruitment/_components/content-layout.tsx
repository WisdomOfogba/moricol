import React from "react";
import NextBackButtons from "./next-back-buttons";
import { ProgressBar } from "./progress-bar";

interface ContentLayoutProps {
  step: number;
  pageTitle: string;
  children: React.ReactNode;
  next_route: string;
  noButtons?: boolean;
}

function ContentLayout({
  step,
  pageTitle,
  children,
  next_route,
  noButtons,
}: ContentLayoutProps) {
  return (
    <div className="mb:px-4 p-0 py-3">
      <ProgressBar progress={step} />
      <div className="max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold">{pageTitle}</h2>
        {children}
        {!noButtons && <NextBackButtons next_route={next_route} />}
      </div>
    </div>
  );
}

export default ContentLayout;
