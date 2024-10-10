"use client";
import Button from "@/components/button";
import { LogoutSvg } from "@/components/svgs";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import DashboardToolbar from "../dashboard-toolbar";
import { MdCancel } from "react-icons/md";
import { usePathname } from "next/navigation";
import { routes } from "@/constants/routes";

function DashboardLayoutClient({
  children,
  slot,
  fromRecruitment,
}: {
  children: ReactNode;
  slot: ReactNode;
  fromRecruitment?: boolean;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    return isSidebarOpen;
  };

  return (
    <section className="flex h-screen overflow-y-hidden">
      {/* if from recruitment */}
      {fromRecruitment && (
        <aside
          className={`no-scrollbar ease absolute z-[55] max-h-screen min-h-screen w-[328px] shrink-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transform bg-[#27272a] transition-all duration-300 md:relative md:translate-x-0`}
        >
          <div className="absolute left-0 top-0 z-10 w-[85%]">
            <Image
              src="/images/dashboard/recruit-side-pattern-u.png"
              alt=""
              width={102}
              height={100}
              className="w-full object-contain"
            />
          </div>
          <div className="absolute bottom-0 right-0 z-10 w-full">
            <Image
              src="/images/dashboard/recruit-side-pattern-d.png"
              alt=""
              width={102}
              height={100}
              className="w-full object-contain"
            />
          </div>

          {isSidebarOpen && (
            <div className="circle absolute right-[-35px] top-2 z-[100] rounded-full bg-white text-4xl text-red-500 md:hidden">
              <MdCancel
                onClick={toggleSidebar}
                className="cursor-pointer hover:scale-[110%]"
              />
            </div>
          )}
          <div className="flex h-screen flex-col justify-center p-4 text-white">
            {pathname === routes.RECRUITMENTDASHBOARD ? (
              <h1 className="py-2 text-lg font-bold">
                Post or find jobs, and build your resume.
              </h1>
            ) : pathname.includes(routes.RECRUITMENT_EMPLOYER) ? (
              <h1 className="py-2 text-lg font-bold">
                Get value from the Candidates You Want
              </h1>
            ) : (
              <h1 className="py-2 text-lg font-bold">Build your resume</h1>
            )}
            {pathname === routes.RECRUITMENTDASHBOARD ? (
              <p>
                Complete Your Resume or sign up as an Employer and Unlock your
                Moricol Job portal Account
              </p>
            ) : pathname.includes(routes.RECRUITMENT_EMPLOYER) ? (
              <p>
                Get access to countless potential candidates with proven skills
                for your company
              </p>
            ) : (
              <p>
                Complete Your Resume and Unlock your Moricol Job portal Account
              </p>
            )}
          </div>
        </aside>
      )}

      {/* if not from recruitment */}

      {!fromRecruitment && (
        <aside
          className={`no-scrollbar ease absolute z-[55] max-h-screen min-h-screen w-[328px] shrink-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transform bg-primary-500 transition-all duration-300 md:relative md:translate-x-0`}
        >
          {isSidebarOpen && (
            <div className="circle absolute right-[-35px] top-2 z-[100] rounded-full bg-white text-4xl text-red-500 md:hidden">
              <MdCancel
                onClick={toggleSidebar}
                className="cursor-pointer hover:scale-[110%]"
              />
            </div>
          )}
          <Link
            href="/"
            className="flex h-[74px] items-center justify-center bg-white"
          >
            <Image src="/logo.svg" alt="" width={102} height={46.17} />
          </Link>
          <ul className="py-4">
            {slot}
            <li className="mt-4 border-t border-t-white">
              <Button className="flex items-center gap-x-2.5 px-14 py-5 text-base font-semibold">
                <LogoutSvg /> Logout
              </Button>
            </li>
          </ul>
        </aside>
      )}
      <div className="no-scrollbar relative grow overflow-y-auto">
        <DashboardToolbar
          fromRecruitment={fromRecruitment}
          toggleSidebar={toggleSidebar}
        />
        {children}
      </div>
    </section>
  );
}

export default DashboardLayoutClient;
