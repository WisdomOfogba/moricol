import { DashboardAsideLinksProps } from "@/definition";
import DashboardLayoutClient from "./_dashboard-sidebar-components/dashboard-layout-client";
import Navlink from "./navlink";

function SidebarLinks({
  asideLinks,
}: {
  asideLinks: DashboardAsideLinksProps[];
}) {
  return (
    <>
      {asideLinks.map(({ SVGComponent, link, name }, i) => (
        <li key={i}>
          <Navlink
            href={link}
            className="transition-color flex w-full items-center gap-x-2.5 px-14 py-5 text-sm font-semibold text-white duration-150 hover:bg-white hover:text-primary-500"
            // active="bg-white text-primary-500"
          >
            <SVGComponent fill="white" />
            {name}
          </Navlink>
        </li>
      ))}
    </>
  );
}

export default function DashboardLayout({
  asideLinks,
  children,
  fromRecruitment,
}: {
  children: React.ReactNode;
  asideLinks: DashboardAsideLinksProps[];
  fromRecruitment?: boolean;
}) {
  return (
    <DashboardLayoutClient
      fromRecruitment={fromRecruitment}
      slot={<SidebarLinks asideLinks={asideLinks} />}
    >
      {children}
    </DashboardLayoutClient>
  );
}
