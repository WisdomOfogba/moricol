import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardToolbar from "@/components/dashboard/dashboard-toolbar";
import { DashboardAsideLinksProps } from "@/definition";

export default function DashboardLayout({
  asideLinks,
  children,
}: {
  children: React.ReactNode;
  asideLinks: DashboardAsideLinksProps[];
}) {
  return (
    <section className="flex h-screen overflow-hidden">
      <DashboardSidebar dashboardAsideLinks={asideLinks} />
      <div className="no-scrollbar relative grow overflow-y-auto">
        <DashboardToolbar />
        {children}
      </div>
    </section>
  );
}
