import { DashboardAsideLinksProps } from "@/definition";
import Image from "next/image";
import Navlink from "./navlink";
import Button from "../button";
import { LogoutSvg } from "../svgs";

export default function DashboardSidebar({
  dashboardAsideLinks,
}: {
  dashboardAsideLinks: DashboardAsideLinksProps[];
}) {
  return (
    <aside className="no-scrollbar max-h-screen min-h-screen w-[328px] shrink-0 overflow-y-auto bg-primary-500">
      <div className="flex h-[74px] items-center justify-center bg-white">
        <Image src="/logo.svg" alt="" width={102} height={46.17} />
      </div>
      <ul className="py-4">
        {dashboardAsideLinks.map(({ SVGComponent, link, name }, i) => (
          <li key={i}>
            <Navlink
              href={link}
              className="transition-color flex w-full items-center gap-x-2.5 px-14 py-5 text-sm font-semibold text-white duration-150 hover:bg-white hover:text-primary-500"
              // active="bg-white text-primary-500"
            >
              <SVGComponent />
              {name}
            </Navlink>
          </li>
        ))}

        <li className="border-t border-t-white">
          <Button className="flex items-center gap-x-2.5 px-14 py-5 text-base font-semibold">
            <LogoutSvg /> Logout
          </Button>
        </li>
      </ul>
    </aside>
  );
}
