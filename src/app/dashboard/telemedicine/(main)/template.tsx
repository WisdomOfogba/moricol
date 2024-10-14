import NavigationBackBtn from "@/components/nav-back-btn";
import React, { ReactNode } from "react";

interface TelemedicineLayoutTemplateProps {
  children: ReactNode;
}

function TelemedicineLayoutTemplate({
  children,
}: TelemedicineLayoutTemplateProps) {
  return (
    <>
      <div className="border-b border-gray-300 px-4 py-2">
        <NavigationBackBtn />
      </div>
      <div className="min-h-[85vh] bg-gray-50 p-5 md:p-8 lg:p-8">
        {children}
      </div>
    </>
  );
}

export default TelemedicineLayoutTemplate;
