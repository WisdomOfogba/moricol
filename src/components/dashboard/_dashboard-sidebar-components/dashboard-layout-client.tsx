"use client";
import Button from "@/components/button";
import { LogoutSvg } from "@/components/svgs";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import DashboardToolbar from "../dashboard-toolbar";
import { MdCancel } from "react-icons/md";

function DashboardLayoutClient({
  children,
  slot,
}: {
  children: ReactNode;
  slot: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    return isSidebarOpen;
  };

  return (
    <section className="flex h-screen overflow-y-hidden">
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
      <div className="no-scrollbar relative grow overflow-y-auto">
        <DashboardToolbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </section>
  );
}

export default DashboardLayoutClient;
